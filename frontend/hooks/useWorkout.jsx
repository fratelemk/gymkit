import {useEffect, useState} from "react";

const WORKOUT_URL = 'http://localhost:8080/api/workout'

function useWorkout() {
    const [workout, setWorkout] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkout = () => {
            fetch(WORKOUT_URL)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
                    return response.json(); // Return the Promise here
                })
                .then((data) => {
                    setWorkout(data); // Now we have the actual JSON data
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchWorkout();
    }, []);

    return {workout, error, loading}

}

export default useWorkout;