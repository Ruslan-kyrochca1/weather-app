import "../scss/main.scss";
import sun from "../../public/assets/icons/sun.svg";
import rain from "../../public/assets/icons/cloud-rain.svg";
import snow from "../../public/assets/icons/cloud-snow.svg";
import pause from "../../public/assets/icons/pause.svg";

import summerAudio from "../../public/assets/sounds/summer.mp3";
import rainAudio from "../..//public/assets/sounds/rain.mp3";
import winterAudio from "../..//public/assets/sounds/winter.mp3";

interface soundType {
    name: string,
    audio: string,
    bg: string,
    icon: string
}

const sounds: soundType[] = [
    {name: "sun", audio: summerAudio, bg: "summer-bg.jpg", icon: sun},
    {name: "rain", audio: rainAudio, bg: "rainy-bg.jpg", icon: rain},
    {name: "snow", audio: winterAudio, bg: "winter-bg.jpg", icon: snow}
]

const container = document.querySelector('.weather-container')!;
const audioArr: HTMLAudioElement[]= [];

const createButtons = () => {
    sounds.forEach(sound => {

        const audioContainer = document.createElement('div')
        audioContainer.className = 'audio-container';

        const button = document.createElement('button');
        button.className = `player-button ${sound.name}`;

        const iconContainer = document.createElement('div')
        iconContainer.className = 'icon-container'
        button.appendChild(iconContainer);

        const icon = document.createElement('img');
        icon.src = sound.icon;
        icon.alt = sound.name;
        iconContainer.appendChild(icon);

        const audioPlayer = document.createElement('div');
        audioPlayer.className = 'custom-audio-player';

        const audio = document.createElement('audio');
        audio.className = 'audio-element';
        audio.src = sound.audio;
        audioArr.push(audio);

        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

        const progressHandle = document.createElement('div');
        progressHandle.className = 'progress-handle'

        progressContainer.appendChild(progressBar);
        progressContainer.appendChild(progressHandle);

        audioPlayer.appendChild(audio);
        audioPlayer.appendChild(progressContainer);

        audioContainer.appendChild(button);

        audioContainer.appendChild(audioPlayer);

        container.appendChild(audioContainer);

        iconContainer.addEventListener('click', () => {
            if(audio.paused){
                audioArr.map(audioElem => audioElem.pause())
                audio.play();
                icon.src = pause;
            }
            else{
                audio.pause();
                // icon.src = sounds
            }
        })
    })
}

createButtons();