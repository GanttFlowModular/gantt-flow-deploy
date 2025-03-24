export function formatDate(date: Date = new Date()): string {
    const dayName = date.toLocaleDateString('es-MX', { weekday: 'long' });
    const month = date.toLocaleDateString('es-MX', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    return `${capitalizedDayName}, ${day} de ${capitalizedMonth} de ${year}`;
}