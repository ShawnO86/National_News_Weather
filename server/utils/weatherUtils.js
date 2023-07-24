//celsius to fahrenheit
export function cToF(deg) {
    return deg * 1.8 + 32;
};
//changes 24 hour time to 12 hour with suffix
export function get12HourFormat(time) {
    let timeSuffix;
    timeSuffix = (time >= 12) ? 'pm' : 'am';
    time = (time % 12 === 0) ? 12 : time % 12;
    return `${time}:00 ${timeSuffix}`;
};
//changes ISO to (Month Day) format
export function dateFormat(date) {
    const d = new Date(date);
    const monthValues = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthValues[d.getMonth()]} ${d.getDate()}`;
};
//changes ISO to yyyy-mm-dd format
export function removeTime (date) {
    let newDate = date.split("T")
    return newDate[0]
}
//changes ISO to 12 hour time
export function hourFormat(date) {
    const t = new Date(date);
    return get12HourFormat(t.getHours());
};
export function separateByDate(data) {
    const separatedData = {};
  
    for (const entry of data) {
      // Extract the date from the entry
      const date = entry.date;
  
      // If the date is not already present in the separatedData object, initialize it with an empty array
      if (!separatedData[date]) {
        separatedData[date] = [];
      }
  
      // Add the current entry to the corresponding date's array
      separatedData[date].push(entry);
      //dayCounter++;
    }
  
    return separatedData;
  }