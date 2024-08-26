// const songTimestamp = 1724473070759; // The provided timestamp
// const currentTimestamp = Date.now(); // Current time in milliseconds

// // Calculate the time elapsed since the song's timestamp
// const timeElapsed = currentTimestamp - songTimestamp;

// const elapsedSeconds = Math.floor(timeElapsed / 1000);
// const elapsedMinutes = Math.floor(elapsedSeconds / 60);
// const remainingSeconds = elapsedSeconds % 60;

// console.log(`Time elapsed: ${elapsedMinutes} minutes and ${remainingSeconds} seconds`);

// const songProgress = 5252; // Progress in milliseconds (from your data)
// const songStartTime = songTimestamp - songProgress; // Subtract the progress from the timestamp
// const songStartDate = new Date(songStartTime);

// console.log(`Song started at: ${songStartDate.toString()}`);

const progressMs = 12428; // Progress in milliseconds

// Convert milliseconds to total seconds
const totalSeconds = Math.floor(progressMs / 1000);

// Calculate minutes and remaining seconds
const minutes = Math.floor(totalSeconds / 60);
const seconds = totalSeconds % 60;

// Format the time to always show two digits for seconds
const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

console.log(`Progress: ${formattedTime}`); // Output: Progress: 0:12
