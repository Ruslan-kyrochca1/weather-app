import "../scss/main.scss";
import sun from "../../public/assets/summer-bg.jpg";
import rain from "../../public/assets/rainy-bg.jpg";
import snow from "../../public/assets/winter-bg.jpg";

document.querySelectorAll('.audio-container').forEach(container => {
    const player = container.querySelector('.img-container');
    const audio = container.querySelector('audio');
    const progressBar = container.querySelector('.progress-bar');
    const progressHandle = container.querySelector('.progress-handle');
    const progressContainer = container.querySelector('.progress-container');
    
    player.addEventListener('click', () => {
        
        if (audio.paused) {
            document.querySelectorAll('audio').forEach(a => {
                const images = document.querySelectorAll('.weather-img');
                [...images].map((img)=>{
                    img.src = img.dataset.playIcon;
                });
                a.pause();
            });
            audio.play();
            if(audio.className.includes("sun")){
                const img = document.querySelector(".sun-img");
                document.body.style.background = `url(${sun})`;
                document.body.style.backdropFilter = `blur(8px)`;
                img.src = img.dataset.pauseIcon;
            }
            else if(audio.className.includes("rain")){
                const img = document.querySelector(".rain-img");
                document.body.style.background = `url(${rain})`;
                img.src = img.dataset.pauseIcon;
            }
            else if(audio.className.includes("snow")){
                const img = document.querySelector(".snow-img");
                document.body.style.background = `url(${snow})`;
                img.src = img.dataset.pauseIcon;
            }
            
        } else {
            audio.pause();
            if(audio.className.includes("sun")){
                const img = document.querySelector(".sun-img");
                img.src = img.dataset.playIcon;
            }
            if(audio.className.includes("rain")){
                const img = document.querySelector(".rain-img");
                img.src = img.dataset.playIcon;
            }
            if(audio.className.includes("snow")){
                const img = document.querySelector(".snow-img");
                img.src = img.dataset.playIcon;
            }
        }
    });
    
    audio.addEventListener('timeupdate', () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressHandle.style.left = `${progressPercent}%`;
    });
    
    progressContainer.addEventListener('click', (e) => {
        const clickX = e.clientX - progressContainer.getBoundingClientRect().left;
        const containerWidth = progressContainer.clientWidth;
        const seekTime = (clickX / containerWidth) * audio.duration;
        audio.currentTime = seekTime;
    });
});