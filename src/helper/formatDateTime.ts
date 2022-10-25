export function formatDateTime(dateTime: string): string {
    return dateTime.split(' ').join(" / ");
}