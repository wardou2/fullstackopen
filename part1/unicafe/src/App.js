import { useState } from "react";

const Button = ({ title, onClick }) => {
    return (
        <button type="button" onClick={onClick}>
            {title}
        </button>
    );
};

const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);

const Statistics = ({ good, neutral, bad }) => {
    if (!good && !neutral && !bad)
        return (
            <>
                <h1>Statistics</h1>
                <div>No feedback given</div>
            </>
        );
    return (
        <>
            <h1>Statistics</h1>
            <table border={0}>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine
                    text="average"
                    value={
                        Math.round(
                            ((good - bad) / (good + neutral + bad)) * 100
                        ) / 100
                    }
                />
                <StatisticLine
                    text="positive"
                    value={`${
                        Math.round(
                            (good / (good + neutral + bad)) * 100 * 100
                        ) / 100
                    } %`}
                />
            </table>
        </>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <>
            <h1>Give feedback</h1>
            <Button title="good" onClick={() => setGood(good + 1)} />
            <Button title="neutral" onClick={() => setNeutral(neutral + 1)} />
            <Button title="bad" onClick={() => setBad(bad + 1)} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    );
};

export default App;
