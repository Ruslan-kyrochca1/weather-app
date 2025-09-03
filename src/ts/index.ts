import "../scss/main.scss";
import sun from "../../public/assets/icons/sun.svg";
import rain from "../../public/assets/icons/cloud-rain.svg";
import snow from "../../public/assets/icons/cloud-snow.svg";
import pause from "../../public/assets/icons/pause.svg";

import sunBg from "../../public/assets/summer-bg.jpg";
import rainBg from "../../public/assets/rainy-bg.jpg";
import snowBg from "../../public/assets/winter-bg.jpg";

import summerAudio from "../../public/assets/sounds/summer.mp3";
import rainAudio from "../..//public/assets/sounds/rain.mp3";
import winterAudio from "../..//public/assets/sounds/winter.mp3";

const sounds: soundType[] = [
    {name: "sun", audio: summerAudio, bg: sunBg, icon: sun},
    {name: "rain", audio: rainAudio, bg: rainBg, icon: rain},
    {name: "snow", audio: winterAudio, bg: snowBg, icon: snow}
]

const container = document.querySelector('.weather-container')!;
const audioArr: HTMLAudioElement[] = [];
let correct: audioType = {
    audio: null,
    icon: {
        element: null,
        src: null
    },
};

//Задний фон
const background = document.createElement('div');
background.className = 'background',
document.body.appendChild(background);

//Громкость
let currentVolume = 0.5; 



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
        icon.className = 'icon',
        icon.src = sound.icon;
        icon.alt = sound.name;
        iconContainer.appendChild(icon);

        const audioPlayer = document.createElement('div');
        audioPlayer.className = 'custom-audio-player';

        const audio = document.createElement('audio');
        audio.className = 'audio-element';
        audio.src = sound.audio;
        audioArr.push(audio);

        const volumeControl = document.createElement('div');
        volumeControl.className = 'volume-control';

        const volumeBar = document.createElement('div');
        volumeBar.className = 'volume-bar';

        const volumeHandle = document.createElement('div');
        volumeHandle.className = 'volume-handle';

        volumeControl.appendChild(volumeBar);
        volumeControl.appendChild(volumeHandle);
        audioPlayer.appendChild(volumeControl);

        audioPlayer.appendChild(audio);
        audioContainer.appendChild(button);

        audioContainer.appendChild(audioPlayer);

        container.appendChild(audioContainer);

        iconContainer.addEventListener('click', () => {
            if(audio.paused){
                if(correct.icon.element && correct.icon.src) correct.icon.element.src = correct.icon.src;
                correct.icon.element = icon;
                correct.icon.src = icon.src;
                icon.src = pause;
                if (correct.audio) correct.audio.pause();
                
                audio.play();
                correct.audio = audio;
                background.style.backgroundImage = `url(${sound.bg})`;
                background.style.backgroundSize = 'cover';
                background.style.filter = 'blur(5px)';
                }

            else{
                audio.pause();
                icon.src = sound.icon;
            }
            
        })


        //Громкость
        const updateVolume = (percentage: number) => {
        // Ограничиваем значения от 0 до 1
        const clamped = Math.max(0, Math.min(1, percentage));
        
        // Обновляем громкость аудио
        audio.volume = clamped;
        currentVolume = clamped;
        
        const barWidth = `${clamped * 100}%`;
        const handleLeft = `${clamped * 100}%`;
        
        volumeBar.style.width = barWidth;
        volumeHandle.style.left = handleLeft;
        };
        updateVolume(currentVolume);
        volumeControl.addEventListener('click', (e) => {
            const rect = volumeControl.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            updateVolume(percentage);
        });
        
        // Обработка перетаскивания
        let isDragging = false;
        volumeHandle.addEventListener('mousedown', () => {
            isDragging = true;
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const rect = volumeControl.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            updateVolume(percentage);
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    })
}

createButtons();