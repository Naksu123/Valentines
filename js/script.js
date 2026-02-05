document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const backBtn = document.getElementById('backBtn');
    const responseText = document.getElementById('responseText');
    const mainContent = document.querySelector('.main-content');
    const successMessage = document.getElementById('successMessage');
    const bottleContainer = document.getElementById('bottleContainer');
    const letterOverlay = document.getElementById('letterOverlay');
    const closeLetterBtn = document.getElementById('closeLetter');
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    const tiltCard = document.getElementById('tiltCard');

    let isAnimating = false;
    let isMusicPlaying = false;
    let clickCount = 0;
    let yesScale = 1;

    const noPhrases = [
        "No? 🥀", "Really? 🥺", "Think again!", "Pretty please? 🍭",
        "My heart... 💔", "Be mine? 🎀", "Try again! ✨", "Wrong choice! 🚫",
        "Heart breaker! 🏹", "Just Yes! 💖", "Stop that! 🐱", "Cupid's watching! 👼",
        "Final answer? 🧐", "Say it! 🍬", "Yes please! 🌸"
    ];

    function handleTilt(xAxis, yAxis) {
        xAxis = Math.min(Math.max(xAxis, -20), 20);
        yAxis = Math.min(Math.max(yAxis, -20), 20);
        tiltCard.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }

    function resetTilt() {
        tiltCard.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    }

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 600) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            requestAnimationFrame(() => handleTilt(xAxis, yAxis));
        }
    });

    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const xAxis = (window.innerWidth / 2 - touch.pageX) / 20;
        const yAxis = (window.innerHeight / 2 - touch.pageY) / 20;
        requestAnimationFrame(() => handleTilt(xAxis, yAxis));
    });

    document.addEventListener('mouseleave', resetTilt);
    document.addEventListener('touchend', resetTilt);

    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", (event) => {
            if (!event.gamma || !event.beta) return;
            const xAxis = event.gamma / 2;
            const yAxis = (event.beta - 45) / 2;
            requestAnimationFrame(() => handleTilt(xAxis, -yAxis));
        });
    }

    function startMusic() {
        if (!isMusicPlaying) {
            bgMusic.volume = 0.5;
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                musicControl.textContent = '🎵';
            }).catch(() => {});
        }
    }

    document.body.addEventListener('click', startMusic, { once: true });

    musicControl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isMusicPlaying) {
            bgMusic.pause();
            musicControl.textContent = '🔇';
            isMusicPlaying = false;
        } else {
            startMusic();
        }
    });

    function moveNoButton() {
        if (noBtn.parentNode !== document.body) {
            noBtn.style.width = noBtn.getBoundingClientRect().width + 'px';
            document.body.appendChild(noBtn);
            noBtn.style.position = 'fixed';
        }

        noBtn.innerText = noPhrases[clickCount % noPhrases.length];
        clickCount++;
        noBtn.style.width = 'auto';

        const padding = 20;
        const maxLeft = window.innerWidth - noBtn.offsetWidth - padding;
        const maxTop = window.innerHeight - noBtn.offsetHeight - padding;

        let newLeft = Math.max(padding, Math.min(Math.random() * maxLeft, maxLeft));
        let newTop = Math.max(padding, Math.min(Math.random() * maxTop, maxTop));

        noBtn.style.left = newLeft + 'px';
        noBtn.style.top = newTop + 'px';

        if (yesScale < 3) {
            yesScale += 0.2;
            document.querySelector('.heart-shape').style.transform = `rotate(-45deg) scale(${yesScale})`;
        }
        responseText.innerText = "Nice try! 👻";
    }

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    yesBtn.addEventListener('click', () => {
        mainContent.style.display = 'none';
        successMessage.style.display = 'block';
        noBtn.style.display = 'none';
        createSparkles();
    });

    bottleContainer.addEventListener('click', () => {
        letterOverlay.classList.add('open');
    });

    closeLetterBtn.addEventListener('click', () => {
        letterOverlay.classList.remove('open');
    });

    backBtn.addEventListener('click', () => {
        successMessage.style.display = 'none';
        mainContent.style.display = 'block';
        letterOverlay.classList.remove('open');
        document.getElementById('buttonContainer').appendChild(noBtn);
        noBtn.style.position = 'static';
        noBtn.style.display = 'inline-block';
        noBtn.innerText = "No";
        yesScale = 1;
        document.querySelector('.heart-shape').style.transform = `rotate(-45deg) scale(1)`;
        responseText.innerText = "";
        clickCount = 0;
    });

    function createSparkles() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
            sparkle.style.color = '#ffd700';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = `fadeSparkle 2s linear forwards`;
            fragment.appendChild(sparkle);
            setTimeout(() => { if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle); }, 2000);
        }
        document.body.appendChild(fragment);
    }

    if (!document.getElementById('sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-style';
        style.innerHTML = `@keyframes fadeSparkle { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1.5) translateY(-50px); } }`;
        document.head.appendChild(style);
    }
});
