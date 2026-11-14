// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked
let isFinalState = false;

yesBtn.addEventListener("click", () => {
    isFinalState = true;
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    const letterWin = document.querySelector(".letter-window");
    letterWin.classList.add("final");
    letter.classList.add("final-clickable");

    buttons.style.display = "none";

    finalText.style.display = "block";

    // Reveal prominent Next Button container
    const nextContainer = document.getElementById("next-action-container");
    if (nextContainer) {
        nextContainer.style.display = "flex";
    }

    // Reveal floating skip button in bottom corner
    const floatingSkip = document.getElementById("floating-skip-btn");
    if (floatingSkip) {
        floatingSkip.style.display = "inline-flex";
    }

    triggerFloatingHearts();
});

// Skip to Birthday Slide when clicking background, floating button, or window in final state
letter.addEventListener("click", (e) => {
    // If already in final state (after Yes is clicked)
    if (isFinalState) {
        showBirthdaySlide();
        return;
    }
    // If clicked on the background backdrop outside the letter window
    if (e.target === letter) {
        showBirthdaySlide();
    }
});

// Keyboard skip (space, enter, arrow)
document.addEventListener("keydown", (e) => {
    if (isFinalState && (e.key === " " || e.key === "Enter" || e.key === "ArrowRight")) {
        showBirthdaySlide();
    }
});

// ==========================================================================
// SLIDE NAVIGATION: Valentine Letter -> Birthday Slide -> For Samriddhi
// ==========================================================================

const birthdaySlide = document.getElementById("birthday-slide");
const btnNextSlide = document.getElementById("btn-next-slide");
const floatingSkipBtn = document.getElementById("floating-skip-btn");
const btnBackToLetter = document.getElementById("btn-back-to-letter");
const videoPlayer = document.getElementById("birthday-video-player");
const playOverlay = document.getElementById("video-play-overlay");
const customPlayBtn = document.getElementById("btn-custom-play");
const btnContinueLetter = document.getElementById("btn-continue-letter");

function showBirthdaySlide() {
    envelope.style.display = "none";
    letter.style.display = "none";
    const floatingSkip = document.getElementById("floating-skip-btn");
    if (floatingSkip) floatingSkip.style.display = "none";

    birthdaySlide.style.display = "flex";
    window.scrollTo({ top: 0, behavior: "smooth" });
    startBirthdayCanvasParticles();
    triggerFloatingHearts();
}

function showLetterSlide() {
    birthdaySlide.style.display = "none";
    letter.style.display = "flex";
    if (isFinalState) {
        const floatingSkip = document.getElementById("floating-skip-btn");
        if (floatingSkip) floatingSkip.style.display = "inline-flex";
    }
    if (videoPlayer && !videoPlayer.paused) {
        videoPlayer.pause();
    }
}

if (btnNextSlide) {
    btnNextSlide.addEventListener("click", (e) => {
        e.stopPropagation();
        showBirthdaySlide();
    });
}

if (floatingSkipBtn) {
    floatingSkipBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showBirthdaySlide();
    });
}

if (btnBackToLetter) {
    btnBackToLetter.addEventListener("click", (e) => {
        e.preventDefault();
        showLetterSlide();
    });
}

// Support direct hash navigation (#birthday)
if (window.location.hash === "#birthday") {
    showBirthdaySlide();
}

// ==========================================================================
// VIDEO EXPERIENCE: Custom Glowing Play Button
// ==========================================================================

function playBirthdayVideo() {
    if (videoPlayer) {
        videoPlayer.play().then(() => {
            if (playOverlay) playOverlay.classList.add("hidden");
        }).catch((err) => {
            console.log("Video play request handled:", err);
            if (playOverlay) playOverlay.classList.add("hidden");
            videoPlayer.play();
        });
    }
}

if (playOverlay) {
    playOverlay.addEventListener("click", playBirthdayVideo);
}
if (customPlayBtn) {
    customPlayBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        playBirthdayVideo();
    });
}

if (videoPlayer) {
    videoPlayer.addEventListener("play", () => {
        if (playOverlay) playOverlay.classList.add("hidden");
    });
    videoPlayer.addEventListener("pause", () => {
        // Keep controls active; overlay only shows if video ends
    });
    videoPlayer.addEventListener("ended", () => {
        if (playOverlay) playOverlay.classList.remove("hidden");
    });
}

// Continue Button: smooth transition
if (btnContinueLetter) {
    btnContinueLetter.addEventListener("click", () => {
        triggerFloatingHearts();
    });
}

// Floating romantic hearts generator
function triggerFloatingHearts() {
    const emojis = ["💖", "💕", "🌸", "✨", "❤️", "🌹", "🎀"];
    for (let i = 0; i < 24; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "floating-heart";
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.left = (Math.random() * 85 + 5) + "vw";
            heart.style.bottom = "20px";
            heart.style.fontSize = (Math.random() * 14 + 18) + "px";
            heart.style.animationDuration = (Math.random() * 1.5 + 2.5) + "s";
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, i * 120);
    }
}

// ==========================================================================
// AMBIENT CANVAS PARTICLES (Floating hearts & sparkles for Birthday Slide)
// ==========================================================================

let canvasAnimationStarted = false;
function startBirthdayCanvasParticles() {
    if (canvasAnimationStarted) return;
    const canvas = document.getElementById("birthday-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvasAnimationStarted = true;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const particles = [];
    const particleCount = 35;
    const symbols = ["❤️", "💖", "💕", "✨", "🌸", "⭐"];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            size: Math.random() * 14 + 12,
            speedY: Math.random() * 0.8 + 0.4,
            speedX: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.6 + 0.2,
            waveOffset: Math.random() * Math.PI * 2,
            waveSpeed: Math.random() * 0.02 + 0.01
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            p.y -= p.speedY;
            p.waveOffset += p.waveSpeed;
            p.x += Math.sin(p.waveOffset) * 0.6 + p.speedX;

            if (p.y < -30) {
                p.y = canvas.height + 20;
                p.x = Math.random() * canvas.width;
            }
            if (p.x < -20) p.x = canvas.width + 20;
            if (p.x > canvas.width + 20) p.x = -20;

            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.font = `${p.size}px sans-serif`;
            ctx.fillText(p.symbol, p.x, p.y);
            ctx.restore();
        }
        requestAnimationFrame(render);
    }
    render();
}
