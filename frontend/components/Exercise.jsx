import {formatExerciseName} from "../utils";

function Exercise({name, type = null, sets}) {
    return (
        <div>
            <h3>{formatExerciseName(name)}</h3>
            {type && <p>{type}</p>}
            <ol>
                {typeof(sets) !== "string" && sets.map((set, index) => (
                    <li key={index}>{set}</li>
                ))}
            </ol>
        </div>
    )
}

export default Exercise;