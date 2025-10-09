import Header from './Header';
import Content from './Content';

const Course = ({course}) => {    
    console.log('course from course component ', course);
    
    return (
        <article>
            <Header course={course} />
            <Content course={course} />
        </article>
    )
}

export default Course;