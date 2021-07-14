// Your code here
let createEmployeeRecord = function(arr){
    return { 
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

let  createEmployeeRecords = function(arr){
    const result = arr.map(row => createEmployeeRecord(row))
    return result
}

let createTimeInEvent = function(record, timeDate){
    let [date, hour] = timeDate.split(' ')
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return record
}
let createTimeOutEvent = function(record, timeDate){
    let [date, hour] = timeDate.split(' ')
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return record
}
let hoursWorkedOnDate = function(record, dateSought){
    const timeIn = record.timeInEvents.find(e => e.date === dateSought)
    const timeOut = record.timeOutEvents.find(e => e.date === dateSought)
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(record, dateSought){
    const basicWage = hoursWorkedOnDate(record, dateSought) * record.payPerHour
    return basicWage
}
let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}


function calculatePayroll(arrayOfEmployees){
    return arrayOfEmployees.reduce(function(bank, employee){
        return bank + allWagesFor(employee)
    }, 0)
}


function findEmployeeByFirstName(records, name){
    return records.find(record => record.firstName === name)
}