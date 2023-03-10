const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
    let intervalId;
    let time = 0;

    const displayTime = () => {
        const hours = Math.floor(time / 60 / 60);
        const min = Math.floor(time / 60) - (hours * 60);
        const sec = time % 60;
        timerEl.innerText = `${hours < 10 ? `0${hours}` : hours}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
        if (time === 0) clearInterval(intervalId)
        time--
    }

    return (seconds) => {
        if (seconds === 0) return
        time = seconds

        if (intervalId) clearInterval(intervalId)
        displayTime()
        intervalId = setInterval(() => {
            displayTime()
        }, 1000)

    };
};

const animateTimer = createTimerAnimator();

const cleanInput = () => {
    let prevInputVal = ''
    return (e) => {
        if (e.data && isNaN(parseInt(e.data))) {
            e.target.value = prevInputVal
        } else {
            prevInputVal = e.target.value
        }
    }
}
inputEl.addEventListener('input', cleanInput());

buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);

    animateTimer(seconds);

    inputEl.value = '';
});
