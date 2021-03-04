import PopUp from './popUp.js';
import Field from './field.js';
import * as sound from './sound.js'; // 'sound'라는 이름을 가지고 전부 다 불러오겠다는 말


export default class Game{
    constructor(gameDuration, carrotCount, bugCount){ // 변하기 쉽고, 보통 자주 쓴 수치 숫자 같은걸 넣는다.
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.gameBtn = document.querySelector('.game__button');
        this.timerIndicator = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
              this.stopGame();
            } else {
              this.startGame();
            }
          });


        this.gameBanner = new PopUp();
        this.gameBanner.setEventListener(()=>{ // 밑 이벤트들을 들고와서, popUpRefresh에다가 세팅해줄거야!! 그래서 'SET'을 쓴것!
        this.startGame();
        })

        this.gameField = new Field();
        this.gameField.setEventListener((item)=>{
        this.onItemClick(item)
        })

        this.started = false;
        this.score = 0; 
        this.timer = undefined; //let이든 뭐든 this.으로 선언하면댐.
    }

    onItemClick(item) {
        if (!this.started) {
          return;
        }
        if (item === 'carrot') {
          this.score++;
          this.updateScoreBoard();
          if (this.score === this.gameField.CARROT_COUNT) {
            this.finishGame(true);
          }
        } else if (item === 'bug'){
          this.finishGame(false);
        }
      }
      
      startGame() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
      }
      
      stopGame() {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        this.gameBanner.showText('REPLAY❓');
        sound.playAlert()
        sound.stopBackground();
      }
      
      finishGame(win) {
        this.started = false;
        this.hideGameButton();
        if (win) {
          sound.playWin();
        } else {
          sound.playBug();
        }
        this.stopGameTimer();
        sound.stopBackground();
        this.gameBanner.showText(win ? 'YOU WON 🎉' : 'YOU LOST 💩');
      }
      
      showStopButton() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
      }
      
      hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
      }
      
      showTimerAndScore() {
        this.timerIndicator.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
      }
      
      startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
          if (remainingTimeSec <= 0) {
            clearInterval(this.timer);
            this.finishGame(this.score === this.gameField.CARROT_COUNT);
            return;
          }
         this.updateTimerText(--remainingTimeSec);
        }, 1000);
      }
      
      stopGameTimer() {
        clearInterval(this.timer);
      }
      
      updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.timerIndicator.innerHTML = `${minutes}:${seconds}`;
      }
      
      initGame() {
        this.score = 0;
        this.gameScore.innerText = this.gameField.CARROT_COUNT;
        this.gameField.init();
      }
      
      
      updateScoreBoard() {
        this.gameScore.innerText = this.gameField.CARROT_COUNT - this.score;
      }
      

}
