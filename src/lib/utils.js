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
    const adjustedCurrent = currentWeekNum < startWeek ? currentWeekNum + 52 : currentWeekNum;
    
    // Build the full schedule in one go
    const fullSchedule = Array.from({ length: 52 }, (_, i) => {
        let week = startWeek + i * step;
        if (week > 52) week -= 52;
        return week;
    });
    
    // Filter weeks that are after the current week using their adjusted value
    const eligibleWeeks = fullSchedule.filter(w => (w < startWeek ? w + 52 : w) > adjustedCurrent);
    
    // Get only the desired number of weeks and assign pairs
    return eligibleWeeks.slice(0, weeksToShow)
        .map((w, idx) => ({ week: `Uke ${w}`, pair: pairs[idx % pairs.length] }));
}

export { getWeekNumber, parseCSV, createDisplayrows };