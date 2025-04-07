import {currentDate, parseExercise} from "./utils";
import useWorkout from "./hooks/useWorkout";
import './App.css'
import Exercise from "./components/Exercise";


export function App() {
    const {workout, error, loading} = useWorkout()

    if (loading) return  <p>Loading workout...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>

            <h1>Workout for Today</h1>
            <h3>{currentDate()}</h3>
            <p>
                <strong>Duration:</strong> {workout.duration} minutes
            </p>
            <h3>Exercises</h3>
            <ol>
                {workout.exercises.map((exercise, index) => (
                    <li key={index}>{<Exercise {...parseExercise(exercise)} />}</li>
                ))}
            </ol>
        </div>
    )
}
