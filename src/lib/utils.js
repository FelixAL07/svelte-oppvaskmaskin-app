function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return [weekNo];
}

function parseCSV(csv) {
    const rows = csv.trim().split("\n");
    return rows.slice(1).map((row) => {
        const values = row.split(",").map(val => val.trim());
        return { name: values[0], nameTo: values[1] };
    });
}

// Function to create display rows based on weeksToShow from currentWeek
function createDisplayrows(weeksToShow, currentWeek, startWeek, step, pairs) {
    const currentWeekNum = currentWeek[0];

    let fullSchedule = [];
    for (let i = 0; i < 52; i++) {
        let week = startWeek + i * step;
        if (week > 52) week = week - 52; // wrap around into next year
        fullSchedule.push(week);
    }
    
    const adjustedSchedule = fullSchedule.map(w => w < startWeek ? w + 52 : w);
    const adjustedCurrent = currentWeekNum < startWeek ? currentWeekNum + 52 : currentWeekNum;

    let filteredSchedule = [];
    adjustedSchedule.forEach((adjWeek, index) => {
        if (adjWeek > adjustedCurrent) {
            filteredSchedule.push(fullSchedule[index]);
        }
    });
    
    // Get only the desired number of weeks from current week
    filteredSchedule = filteredSchedule.slice(0, weeksToShow);
    
    const displayRows = filteredSchedule.map((w, idx) => {
        return { week: `Uke ${w}`, pair: pairs[idx % pairs.length] };
    });
    return displayRows;
}

export { getWeekNumber, parseCSV, createDisplayrows };