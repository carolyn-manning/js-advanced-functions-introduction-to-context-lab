
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrs) {
   return arrs.map(arr => {
       return createEmployeeRecord(arr)
    })  
}

function createTimeInEvent(employee, dateTime) {
    let [date, time] = dateTime.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    })
    return employee
}

function createTimeOutEvent(employee, dateTime) {
    let [date, time] = dateTime.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(function(event){
        return event.date === date
    })
    let timeOut = employee.timeOutEvents.find(function(event){
        return event.date === date
    })

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

function wagesEarnedOnDate(employee, date){
    let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return wage
}

function allWagesFor(employee){
    let datesWorked = employee.timeInEvents.map(function(event){
        return event.date
    })
    return datesWorked.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
}

function findEmployeeByFirstName(array, firstName) {
    return array.find(function(record){
      return record.firstName === firstName
    })
  }

  function calculatePayroll(arr){
    return arr.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}