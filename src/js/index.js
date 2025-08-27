"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../scss/main.scss");
const sun_svg_1 = __importDefault(require("../../public/assets/icons/sun.svg"));
const cloud_rain_svg_1 = __importDefault(require("../../public/assets/icons/cloud-rain.svg"));
const cloud_snow_svg_1 = __importDefault(require("../../public/assets/icons/cloud-snow.svg"));
const pause_svg_1 = __importDefault(require("../../public/assets/icons/pause.svg"));
const summer_mp3_1 = __importDefault(require("../../public/assets/sounds/summer.mp3"));
const rain_mp3_1 = __importDefault(require("../..//public/assets/sounds/rain.mp3"));
const winter_mp3_1 = __importDefault(require("../..//public/assets/sounds/winter.mp3"));
const sounds = [
    { name: "sun", audio: summer_mp3_1.default, bg: "summer-bg.jpg", icon: sun_svg_1.default },
    { name: "rain", audio: rain_mp3_1.default, bg: "rainy-bg.jpg", icon: cloud_rain_svg_1.default },
    { name: "snow", audio: winter_mp3_1.default, bg: "winter-bg.jpg", icon: cloud_snow_svg_1.default }
];
const container = document.querySelector('.weather-container');
const audioArr = [];
const createButtons = () => {
    sounds.forEach(sound => {
        const audioContainer = document.createElement('div');
        audioContainer.className = 'audio-container';
        const button = document.createElement('button');
        button.className = `player-button ${sound.name}`;
        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';
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
        progressHandle.className = 'progress-handle';
        progressContainer.appendChild(progressBar);
        progressContainer.appendChild(progressHandle);
        audioPlayer.appendChild(audio);
        audioPlayer.appendChild(progressContainer);
        audioContainer.appendChild(button);
        audioContainer.appendChild(audioPlayer);
        container.appendChild(audioContainer);
        iconContainer.addEventListener('click', () => {
            if (audio.paused) {
                audioArr.map(audioElem => audioElem.pause());
                audio.play();
                icon.src = pause_svg_1.default;
            }
            else {
                audio.pause();
                // icon.src = sounds
            }
        });
    });
};
createButtons();
