import './Timer.scss';

const Timer = (props) => {
    return (
        <div className="App-timer column">
            <h1>Timer</h1>
            <p className="timer">{props.day}</p>
            <p className="timer">{props.time}</p>
            <p className="timer">{props.przerwa}</p>
            <p className="timer">{props.timeToLeft}</p>
            <p className="timer">{props.afterLessons}</p>
        </div>
    );
};

export default Timer;