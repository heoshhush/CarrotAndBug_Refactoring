'use strict';

import * as sound from './sound.js';
const BUG_COUNT = 20;

export default class Field{
    constructor(){
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.CARROT_SIZE = 80;
        this.CARROT_COUNT = 20;
        this.field.addEventListener('click',
        // 여기서처럼, this라는 것은 클래스안에 있는 함수를 다른 콜백으로 전달할때, 예를들어 그냥 this.onclick으로 쓰면 자바스크립트에서는 함수를 전달할때 'class 정보'를 전달하지 않는다.
        // 따라서 자세한 함수의 내용을 규정할때, class의 정보, this로 규정한 변수들을 쓸 수 없는 상황이 생길 수 있다.
        // 이를 방지하고, class의정보를 함께 넘겨주는 것을 this binding이라고 한다. 
        // 바인딩을 할 수 있는 방법으로는 총 세가지가 있다.
        // 1) this.onClick = this.onClick.bind(this)으로  직접 바인딩 해주는 것. 그러나 보통은 이렇게 귀찮게 일일이 하지 않는다.
        // 2) 보통은 arrow함수를 쓴다! 아래의 (event) -> {this.onClick && this.onClick(event)}; 처럼!!! 애로우함수로하면 바인딩되어져서 건네진다.
        // 3) 혹은, onClick = event => { ~~~} 처럼, 애로우함수로 만들고 이를 변수에 할당 해주기.
        (event) => {
            this.onClick && this.onClick(event);
        })
    }

    setEventListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    init(){
        
        this.field.innerHTML = '';
        this._addItem('carrot', this.CARROT_COUNT, 'img/carrot.png');
        this._addItem('bug', BUG_COUNT, 'img/bug.png');
      }

      // class 안에서만 쓰이는 함수의 경우, private한 함수로 만들어주는 것이 좋다. 그래서 _를 앞에 붙였다.
    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - this.CARROT_SIZE;
        const y2 = this.fieldRect.height - this.CARROT_SIZE;
        for (let i = 0; i < count; i++) {
          const item = document.createElement('img');
          item.setAttribute('class', className);
          item.setAttribute('src', imgPath);
          item.style.position = 'absolute';
          const x = randomNumber(x1, x2);
          const y = randomNumber(y1, y2);
          item.style.left = `${x}px`;
          item.style.top = `${y}px`;
          this.field.appendChild(item);
        }
      }

      onClick(event){
        const target = event.target;
        if (target.matches('.carrot')) {
          target.remove();
          sound.playCarrot();
          this.onItemClick && this.onItemClick('carrot');
        } else if (target.matches('.bug')) {
          this.onItemClick && this.onItemClick('bug');
        }
      }  
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

