import Header from './Header';
import Content from './Content';
import Part from './Part';

const Course = (props) => {
    const course = props.course;

    const parts = course.parts
    const totalExercises = course.parts.map(course => course.exercises).reduce((acc, cur) => acc + cur);

    return (
        <div className="course">
            <Header title={course.name} />
            <Content>
                {parts.map(content => (<Part key={content.id} name={content.name} exercise={content.exercises} />))}
            </Content>
            <b>Total of {totalExercises} exercises</b>
        </div>
    )
}

export default Course;