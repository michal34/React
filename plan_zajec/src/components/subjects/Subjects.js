import './Subjects.scss';

const Subjects = (props) => {
    const subjects = props.subjects ? props.subjects : {};
    const day = new Date().getDay()-1;
    const plan = props.plan ? props.plan[day] : [];
    const planWithSubjects = plan.map((subjectId) => subjects[subjectId]);
    return (
        <div className="App-subjects column">
            <h1>Subjects</h1>
            {planWithSubjects.map((subject, index) => {
                return <p key={index} className={props.currentLessonIndex-1 === index ? 'bold' : ''}>
                    {subject}</p>
            })}
        </div>
    );
};

export default Subjects;