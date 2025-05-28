import {formatExerciseName} from "../utils";
import styles from "../styles/Exercise.module.css"

function Exercise({name, type = null, sets}) {
    if (typeof(sets) === "string") {
        return (

            <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.name}>{formatExerciseName(name)}</h3>

                    <h3 className={styles.name}>{sets} sets</h3>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.name}>{formatExerciseName(name)}</h3>
            <p>{type}</p>
            <ol>
                {sets.map((set, index) => (
                    <li key={index}>{set}</li>
                ))}
            </ol>
        </div>
    );

}

export default Exercise;