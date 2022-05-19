import './App.scss';
import Header from './components/header';
import Hours from './components/hours';
import Subjects from './components/subjects';
import Timer from './components/timer';
import Footer from './components/footer';
import data from './db/db.json';
import Moment from 'moment';
import { useState } from 'react';

function App() {
    const hours = data[0].data.hours;
    const subjects = data[0].data.subjects;
    const plan = data[0].data.plan;
    const [time, setTime] = useState('...'); 
    const [currentLessonIndex, setCurrentLessonIndex] = useState(null);
    const [timeToLeft, setTimeToLeft] = useState(null);
    const [przerwa, setPrzerwa] = useState(null);
    const [day, setDay] = useState(null);
    const [afterLessons, setAfterLessons] = useState(null);
    const format = 'HH:mm:ss'
    const day1 = Moment().isoWeekday();
    const nameOfDay = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
    const time1 = Moment('23:59:59', format);
    const time2 = Moment('00:00:01', format);
    const lastLesson = Moment(`${hours[8].stop}:00`, format)
    const firstLesson = Moment(`${hours[1].start}:00`, format);
    const timer = () => {
        const currentTime = Moment().format(format);
        let currentLessonIndexHelper = null;
        
        for (let key in hours) {
            const lessonTimes = hours[key];
            const timeToCheck = Moment(currentTime, format);
            const start = Moment(`${lessonTimes.start}:00`, format);
            const stop = Moment(`${lessonTimes.stop}:00`, format);
            const przerwa1 = Moment(stop).add(lessonTimes.break, 'minutes').format(format);
            const przerwa2 = Moment(`${przerwa1}:00`, format);

            if (timeToCheck.isBetween(start, stop)) {
                const duration = Moment.duration(stop.diff(timeToCheck));
                const timeToEnd = `${duration._data.minutes}:${duration._data.seconds.length < 10 ? duration._data.seconds : '0' + duration._data.seconds}`;
                setTimeToLeft(timeToEnd);
                setPrzerwa(null)
                currentLessonIndexHelper = key;
            }

            else if(timeToCheck.isBetween(start, przerwa2)) {
                const duration1 = Moment.duration(przerwa2.diff(timeToCheck));
                const timeToEnd1 = `${duration1._data.minutes}:${duration1._data.seconds}`;
                const przerwa3 = 'Teraz jest przerwa do końca zostało:';
                setPrzerwa(przerwa3);
                setTimeToLeft(timeToEnd1);
            }
            if (day1 === 7) {
                setTimeToLeft('Mamy weekend');
            }
            else if (day1 === 6) {
                setTimeToLeft('Mamy weekend');
            }
            else if (timeToCheck.isBetween(lastLesson, time1)) {
                setAfterLessons('Koniec lekcji na dziś')
            }
            else if (timeToCheck.isBetween(time2, firstLesson)) {
                setAfterLessons('Lekje zaczynają się o 08:55')
            }
        }
        setDay(nameOfDay[day1 - 1])
        setTime(currentTime);
        setCurrentLessonIndex(currentLessonIndexHelper);
        if (currentLessonIndex == null) {
            return
        } 
    }
    window.setInterval(timer, 1000);

    return (
        <div className="App">
        <div>
            <Header></Header>
        </div>
        <div className="columns">
            <Hours  hours={hours}   
                    currentLessonIndex={currentLessonIndex}></Hours>
            <Timer  time={time}
                    timeToLeft={timeToLeft}
                    przerwa={przerwa}
                    day={day}
                    afterLessons={afterLessons}></Timer>
            <Subjects subjects={subjects} 
                      plan={plan}
                      currentLessonIndex={currentLessonIndex}></Subjects>
        </div>
        <div className="footer">
            <Footer></Footer>
        </div>
        </div>
    );
}

export default App;