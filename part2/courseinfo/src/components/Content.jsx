import Part from './Part';
import Total from './Total';

const Content = ({course}) => {
    const parts = course.parts;
    let total = parts.map(part => part.exercises).reduce((prev, curr) => prev + curr);
    
    return (
        <>
            <ul>
                {
                    parts.map(part => <li key={part.id}><Part name={part.name} exercises={part.exercises} /></li>)
                }
            </ul>
            <Total total={total} />
        </>
    )
}

export default Content;