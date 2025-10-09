import Part from './Part';

const Content = ({course}) => {
    const parts = course.parts;
    
    return (
        <div>
            {
                parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id} />)
            }
        </div>
    )
}

export default Content;