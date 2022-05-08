function createEmployeeRecord(array){
    let recordObject = {}
    recordObject.firstName = array[0]
    recordObject.familyName = array[1]
    recordObject.title = array[2]
    recordObject.payPerHour = array[3]
    recordObject.timeInEvents = []
    recordObject.timeOutEvents = [];
    return recordObject
}

function createEmployeeRecords(arrays){
    return arrays.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, timeString){
    let timeArray = timeString.split(' ')
    let timeObject = {}
    timeObject.type = 'TimeIn'
    timeObject.date = timeArray[0]
    timeObject.hour = parseInt(timeArray[1], 10)
    employeeRecord.timeInEvents.push(timeObject)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeString){
    let timeArray = timeString.split(' ')
    let timeObject = {}
    timeObject.type = 'TimeOut'
    timeObject.date = timeArray[0]
    timeObject.hour = parseInt(timeArray[1], 10)
    employeeRecord.timeOutEvents.push(timeObject)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateString){
    let timeinOnDate = employeeRecord.timeInEvents.find(x => x.date === dateString)
    let timeOutOnDate = employeeRecord.timeOutEvents.find(x => x.date === dateString)
    return timeOutOnDate.hour/100 - timeinOnDate.hour/100
}

function wagesEarnedOnDate(employeeRecord, dateString){
    let numOfHours = hoursWorkedOnDate(employeeRecord, dateString)
    return employeeRecord.payPerHour * numOfHours;
}

function allWagesFor(employeeRecord){
    let dateArray = []
    employeeRecord.timeInEvents.forEach(x=> dateArray.push(x.date))
    let wageArray =[]
    dateArray.forEach(x => wageArray.push(wagesEarnedOnDate(employeeRecord, x)))
    return wageArray.reduce((y,z)=>y+z)
}

function calculatePayroll(employees){
    let staffWageArray = employees.map(allWagesFor)
    return staffWageArray.reduce((y,z)=> y+z)
}