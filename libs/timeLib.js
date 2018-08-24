const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = 'Asia/Calcutta'
//gets time in utc format
let now = () => {
  return moment.utc().format() 
}
//gets time in, local format here time is set to asia/kolkata
let getLocalTime = () => {
  return moment().tz(timeZone).format()
}

//here time is converted to the required timezone
let convertToLocalTime = (time) => {
  return momenttz.tz(time, timeZone).format('LLLL')
}
module.exports = {
  now: now,
  getLocalTime: getLocalTime,
  convertToLocalTime: convertToLocalTime
}