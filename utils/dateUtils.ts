// Formats a Date object to a string in MM/DD/YYYY format.
function formatDateToMMDDYYYY(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Generates a date string for a date before today.
export function getDateBeforeToday(daysBefore: number = 1): string {
    const date = new Date();
    date.setDate(date.getDate() - daysBefore);
    return formatDateToMMDDYYYY(date);
}

// Generates a date string for tomorrow's date.
export function getDateTomorrow(): string {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return formatDateToMMDDYYYY(date);
}