'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;


// import * as sound from './sound.js'; // 'sound'라는 이름을 가지고 전부 다 불러오겠다는 말
import Game from './game.js';


// const gameBanner = new PopUp();
// gameBanner.setEventListener(()=>{ // 밑 이벤트들을 들고와서, popUpRefresh에다가 세팅해줄거야!! 그래서 'SET'을 쓴것!
//   startGame();
// })

// const gameField = new Field();
// gameField.setEventListener((item)=>{
//   onItemClick(item)
// })

const game = new Game(GAME_DURATION_SEC, CARROT_COUNT, BUG_COUNT);

//class를 이용해 모듈화 하면 이렇게 다 없애고, 파일로 따로 기능별 담아 둘 수 있다.
// class내, 주의할점은, event마다 잘 정의해줘야한다는것. addEventListener와 onClick, 콜백함수, setClickEvent 등등(popUp.js와 field.js를 참조하자)