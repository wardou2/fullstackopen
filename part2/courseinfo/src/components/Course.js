const Header = (props) => <h1>{props.course}</h1>;

const Content = ({ parts }) => (
    <>
        {parts.map((part) => (
            <Part part={part} key={part.id} />
        ))}
    </>
);

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
);

const Total = ({ parts }) => {
    const sum = parts.reduce((prev, curr) => prev + curr.exercises, 0);
    return <p>Number of exercises {sum}</p>;
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;
