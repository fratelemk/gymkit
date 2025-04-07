export const parseExercise = (encodedExercise) => {
    const parts = encodedExercise.split(":");

    if (parts[1] === "_") {
        return {
            "name": parts[0],
            "sets": parts[2]
        }
    }

    return {
        "name": parts[0],
        "type": parts[1],
        "sets": parts[2].split(";")
    }
};

export const currentDate = () => {
    const today = new Date();
    const formatDate = (date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const day = days[date.getDay()];
        const dateNum = date.getDate();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day} ${dateNum} ${hours}:${minutes}`;
    };

    return formatDate(today)
};

export const formatExerciseName = (slug) => {
    return slug
        .split('-')                     // Split on dash
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )                               // Capitalize each word
        .join(' ');                     // Join with spaces
};
