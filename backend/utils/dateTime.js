function parseDateTime(dateTimeString) {
    try {
        const [datePart, timePart] = dateTimeString.split(' ');

        // Ensure both date and time parts are provided
        if (!datePart || !timePart) {
            throw new Error('Invalid date-time format. Expected format: DD/MM/YYYY HH:MM');
        }

        const [day, month, year] = datePart.split('/').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);

        // Validate extracted values
        if (
            isNaN(day) || isNaN(month) || isNaN(year) ||
            isNaN(hours) || isNaN(minutes)
        ) {
            throw new Error('Invalid numeric values in date-time string');
        }

        return new Date(year, month - 1, day, hours, minutes);
    } catch (error) {
        console.error('Error parsing date-time:', error.message);
        throw error;
    }
}

module.exports = parseDateTime
