const music = document.getElementById("music");
const playBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");
const muteBtn = document.getElementById("muteBtn");

const progressArea =
    document.querySelector(".progress-area");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

playBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        playBtn.textContent = "Ⅱ";

    } else {

        music.pause();

        playBtn.textContent = "▶";

    }

});


restartBtn.addEventListener("click", () => {

    music.currentTime = 0;

    music.play();

    playBtn.textContent = "Ⅱ";

});


muteBtn.addEventListener("click", () => {

    music.muted = !music.muted;

    if (music.muted) {
        muteBtn.textContent = "×";
    } else {
        muteBtn.textContent = "♫";
    }

});


music.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(music.duration);

});

music.addEventListener("timeupdate", () => {

    if (!music.duration) return;

    const percent =
        (music.currentTime / music.duration) * 100;

    progress.style.width =
        percent + "%";

    currentTime.textContent =
        formatTime(music.currentTime);

});

progressArea.addEventListener("click", (event) => {

    const width =
        progressArea.clientWidth;

    const clickX =
        event.offsetX;

    music.currentTime =
        (clickX / width) * music.duration;

});

music.addEventListener("ended", () => {

    playBtn.textContent = "▶";

    progress.style.width = "0%";

    currentTime.textContent = "0:00";

});

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

    return `${minutes}:${secs}`;
}


const clickBtn =
    document.getElementById("clickBtn");

const funnyText =
    document.getElementById("funnyText");


const messages = [

    "okay... you clicked it 😭",

    "I knew you would click it.",

    "again?? seriously? ♡",

    "you really like this button huh",

    "fine, one more time. ♡",

    "okay stop HAHAHA",

    "the button misses you already",

    "alright, you win. ♡"

];


let messageIndex = 0;


clickBtn.addEventListener("click", () => {

    funnyText.textContent =
        messages[messageIndex];

    messageIndex++;

    if (messageIndex >= messages.length) {
        messageIndex = 0;
    }

    createHeartBurst();

});

function createHeartBurst() {

    const hearts =
        ["♡", "♥", "✦"];

    for (let i = 0; i < 8; i++) {

        const heart =
            document.createElement("span");

        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() * hearts.length
                )
            ];

        heart.style.position = "fixed";
        heart.style.left = "50%";
        heart.style.top = "70%";
        heart.style.color = "#b36f80";
        heart.style.fontSize = "18px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "1000";

        document.body.appendChild(heart);


        const x =
            (Math.random() - 0.5) * 300;

        const y =
            (Math.random() - 0.5) * 250;


        heart.animate(

            [
                {
                    transform: "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(calc(-50% + ${x}px),
                        calc(-50% + ${y}px))
                        scale(1.3)`,

                    opacity: 0
                }
            ],

            {
                duration: 900,
                easing: "ease-out"
            }

        );


        setTimeout(() => {
            heart.remove();
        }, 900);

    }

}


const lyricPrevious = document.getElementById("lyricPrevious");
const lyricCurrent = document.getElementById("lyricCurrent");
const lyricNext = document.getElementById("lyricNext");

const lyricsBox = document.querySelector(".lyrics-box");

const lyrics = [
    { time: 0, text: "And there's nothing I, nothing I'd rather do" },
    { time: 4, text: "I'm stuck with you, stuck with you, stuck with you" },
    { time: 8, text: "So go ahead and drive me insane" },
    { time: 12, text: "Baby, run your mouth" },
    { time: 14, text: "I still wouldn't change all this" },
    { time: 16, text: "Loving you, hating you, wanting you" },
    { time: 20, text: "I'm stuck with you, stuck with you, stuck with" },
    { time: 25, text: "You, oh, oh" },
];

music.addEventListener("timeupdate", () => {
    const current = music.currentTime;

    let index = -1;

    for (let i = 0; i < lyrics.length; i++) {
        if (current >= lyrics[i].time) {
            index = i;
        }
    }

    if (index === -1) {
        lyricPrevious.textContent = "";
        lyricCurrent.textContent = "press play ♡";
        lyricNext.textContent = lyrics[0]?.text || "";
        return;
    }

    lyricPrevious.textContent = lyrics[index - 1]?.text || "";
    lyricCurrent.textContent = lyrics[index]?.text || "";
    lyricNext.textContent = lyrics[index + 1]?.text || "";
});

music.addEventListener("play", () => {
    lyricsBox.classList.add("playing");
});

music.addEventListener("pause", () => {
    lyricsBox.classList.remove("playing");
});