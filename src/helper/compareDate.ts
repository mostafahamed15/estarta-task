export const compareDate = (datetimeStart: string, datetimeEnd: string) => {

    return Date.parse(removeTime(datetimeStart).toString()) <= Date.parse(removeTime(datetimeEnd).toString());
}

export const compareDateTime = (datetimeStart: string, datetimeEnd: string) => {

    return Date.parse(datetimeStart) <= Date.parse(datetimeEnd);
}

const removeTime = (date: string) => {
    var d = new Date(date)
    return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate()
    );
}