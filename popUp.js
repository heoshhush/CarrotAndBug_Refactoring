'use strict';


export default class PopUp{
    constructor(){
this.popUp = document.querySelector('.pop-up');
this.popUpText = document.querySelector('.pop-up__message');
this.popUpRefresh = document.querySelector('.pop-up__refresh');
this.popUpRefresh.addEventListener('click',()=>{ // 콜백함수 실행되도록
    this.onClick && this.onClick();
    this.hide();
})
    
}
    setEventListener(onClick){ //콜백함수를 직접 사용자가 지정 등록할 수 있도록.
        this.onClick = onClick
    }
    hide() {
        this.popUp.classList.add('pop-up--hide');
      }
    showText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
      }
}

//객체지향. 즉 어디다가 저장해둔다는 개념 유의.
// 이걸 gameBanner 속에 저장해두고, main에서 gameBanner.붙여서 꺼내쓰겠다는 말!