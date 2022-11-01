import moment from 'moment'

export const getDate = () => {
  return new Date()
}

export const getArrayOfDays = (startDate, numberOfDays, distanceBwtTwoDays = 1) => {
  const arr = new Array()
  let dt = new Date(startDate)
  let i = 0
  while (i < numberOfDays) {
    arr.push(moment(new Date(dt)))
    dt.setDate(dt.getDate() + distanceBwtTwoDays)
    i++
  }
  return arr
}

// Monday
export const getFirstDayOfWeek = (value) => {
  let d = new Date(value);
  let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return moment(new Date(d)).toDate();
}

// Sunday
export const getLastDayOfWeek = (value) => {
  let d = new Date(value);
  let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1);
  diff = diff + 6;
  d.setDate(diff);
  d.setHours(24, 0, 0, 0);
  return moment(new Date(d)).toDate();
}

export const getFirstLastDayOfMonth = (value) => {
  let d = new Date(value),
      y = d.getFullYear(),
      m = d.getMonth();
  let firstDay = moment(new Date(y, m, 1)).toDate();
  let lastDay = moment(new Date(y, m + 1, 0)).toDate();
  return {
    firstDay,
    lastDay,
  }
}