// set timestamp in YYYYMMDDHHmmss

export const getTimeStamp = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let monthFormatted = month < 10 ? (`0${month}`) : `${month}`;
    let dateNumber = date.getDate();
    let dateNumberFormatted = dateNumber < 10 ? (`0${dateNumber}`) : `${dateNumber}`;
    let hours = date.getHours();
    let hoursFormatted = hours < 10 ? (`0${hours}`) : `${hours}`;
    let minutes = date.getMinutes();
    let minutesFormatted = minutes < 10 ? (`0${minutes}`) : `${minutes}`;
    let seconds = date.getSeconds();
    let secondsFormatted = seconds < 10 ? (`0${seconds}`) : `${seconds}`;

    // timestamp in string format as required
    let timestamp = `${year}${monthFormatted}${dateNumberFormatted}${hoursFormatted}${minutesFormatted}${secondsFormatted}`;
    return timestamp;

}