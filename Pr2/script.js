const dateTime = document.querySelector('.date-time');

const updateDateTime = () => {
    const date = new Date();

const getDay = () => {
    const dayNo = date.getDay();
    const dayName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    return dayName[dayNo];
}

const getTime = () => date.toLocaleTimeString();


const getDate = () => {
    const curDate = date.getDate();
    const month = date.getMonth();
    const monthName = ["Jan","Feb","Mar","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];

    return `${monthName[month]} ${curDate}`;
}


dateTime.innerHTML = `${getDay()} | ${getDate()} | ${getTime()}`;
}

// initial call to display the time immediately
updateDateTime();

// update the time every second

setInterval(updateDateTime, 1000);