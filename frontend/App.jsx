import {currentDate, parseExercise} from "./utils";
import useWorkout from "./hooks/useWorkout";
import './App.css'
import styles from './styles/Container.module.css';
import Exercise from "./components/Exercise";


export function App() {
    const {workout, error, loading} = useWorkout()

    if (loading) return  <p>Loading workout...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className={styles.container}>
            <h1>Workout for Today</h1>

            <div>
                <strong>Duration:</strong> {workout.duration} minutes
            </div>
            <ol>
                {workout.exercises.map((exercise, index) => (
                    <li key={index}>{<Exercise {...parseExercise(exercise)} />}</li>
                ))}
            </ol>
        </div>
    )
}
