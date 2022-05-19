import './Hours.scss';

const Hours = (props) => {
    const hours = props.hours;
    const hoursArray = Object.entries(hours);
    return (
        <div className="App-hours column">
            <h1>Hours</h1>
            <div>
                {hoursArray.map((lesson, index) => {
                    const lessonNumber = lesson[0];
                    const lessonHours = lesson[1];
                    // eslint-disable-next-line
                    return <p key={index} className={props.currentLessonIndex == (index + 1) ? 'bold' : ''}>{lessonNumber}. {lessonHours.start} – {lessonHours.stop}</p>
                })}
            </div>
        </div>
    );
};

export default Hours;