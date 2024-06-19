const Question_URL_API = "https://api.quotable.io/random"
const typeDisplay = document.getElementById("typeDisplay");
const typeInput =document.getElementById("typeInput");
const timer =document.getElementById("timer");
const BGM =new Audio("./audio/bgm.mp3");
const SoundA =new Audio("./audio/correct-se.wav");
const SoundB =new Audio("./audio/incorrect-se.wav");



//判定
typeInput.addEventListener("input",()=> {
    const sentenceArray = typeDisplay.querySelectorAll("span");
    const arrayValue = typeInput.value.split("");
    let correct =true;
    sentenceArray.forEach((characterSpan,index) =>{
        if(arrayValue[index] == null){
            characterSpan.classList.remove("incorrect");
            characterSpan.classList.remove("correct");
            correct = false; 
        } else if(characterSpan.innerText == arrayValue[index]){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect"); 
        } else {
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct"); 
            SoundB.volume = 0.5;
            SoundB.play();
            SoundB.currentTime = 0;
            correct = false;
        }
    } );
    if(correct == true){
        SoundA.play();
        SoundA.currentTime = 0;
        typeInput.value ="";
        RenderNextSentence();

    }
});


//文章取得（非同期）
function GetRandomSentence() {
    return fetch(Question_URL_API)
    .then((response) => response.json())
    .then((deta) => deta.content);
}

async function RenderNextSentence(){
    const sentence = await GetRandomSentence();
    console.log(sentence);
    typeDisplay.innerText = "";
    let oneText =sentence.split("");
    oneText.forEach((character) => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText =character;
        typeDisplay.appendChild(characterSpan);
        
    });

    typeInput.value ="";
    StartTimer();
}

let startTime;
let originTime = 50;

function StartTimer(){
    timer.innerText = originTime;
    startTime = new Date();
    setInterval(()=>{
        timer.innerText = originTime - getTimerTime();
        if(timer.innerText <= 0 ) {
            timer.innerText = 0;
            TimeUp()
        };
    },1000);
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000);
}

function TimeUp(){
    
}

RenderNextSentence();