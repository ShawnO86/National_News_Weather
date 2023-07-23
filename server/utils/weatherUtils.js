//celsius to fahrenheit
export const cToF = (deg) => {
    return deg * 1.8 + 32;
};
//changes 24 hour time to 12 hour with suffix
export const get12HourFormat = (time) => {
    let timeSuffix;
    timeSuffix = (time >= 12) ? 'pm' : 'am';
    time = (time % 12 === 0) ? 12 : time % 12;
    return `${time}:00 ${timeSuffix}`;
};
//changes ISO to (Month Day) format
export const dateFormat = (date) => {
    const d = new Date(date);
    const monthValues = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthValues[d.getMonth()]} ${d.getDate()}`;
};
//changes ISO to yyyy-mm-dd format
export const removeTime = (date) => {
    let newDate = date.split("T")
    return newDate[0]
}
//changes ISO to 12 hour time
export const hourFormat = (date) => {
    const t = new Date(date);
    return get12HourFormat(t.getHours());
};