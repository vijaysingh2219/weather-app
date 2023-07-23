import { addMilliseconds, format } from 'date-fns';

/**
 * Function to convert degrees to direction.
 * @param {number} degree - The degree value.
 * @returns {string} - The direction corresponding to the degree.
 */
export const convertDegreeToDirection = (degree) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
    const index = Math.round(degree / 22.5) % 16;
    return directions[index];
}

/**
 * Function to get the current time adjusted for timezone.
 * @param {number} timezoneOffsetSeconds - The timezone offset in seconds.
 * @returns {string} - The formatted adjusted local time.
 */
export const getCurrentTimeAdjusted = (timezoneOffsetSeconds) => {
    // Get the current local time
    const currentLocalTime = new Date();

    // Get the current timezone offset from UTC in minutes
    const currentOffsetMinutes = currentLocalTime.getTimezoneOffset();

    // Calculate the total time to add in milliseconds, considering both the current timezone offset and the time to add
    const totalMillisecondsToAdd = ((currentOffsetMinutes * 60) + timezoneOffsetSeconds) * 1000;

    // Add the specified time (in milliseconds) to the current local time
    const adjustedLocalTime = addMilliseconds(currentLocalTime, totalMillisecondsToAdd);

    // Format the adjusted local time as desired
    return format(adjustedLocalTime, 'yyyy-MM-dd HH:mm:ss');
}

/**
 * Function to convert a date to a specific timezone.
 * @param {Date} date - The date to convert.
 * @param {number} timezoneOffsetSeconds - The timezone offset in seconds.
 * @returns {string} - The formatted adjusted local time.
 */
export const convertDateToTimeZone = (date, timezoneOffsetSeconds) => {
    const formatDate = new Date(date);

    // Get the current timezone offset from UTC in minutes
    const currentOffsetMinutes = formatDate.getTimezoneOffset();

    // Calculate the total time to add in milliseconds, considering both the current timezone offset and the time to add
    const totalMillisecondsToAdd = ((currentOffsetMinutes * 60) + timezoneOffsetSeconds) * 1000;

    // Add the specified time (in milliseconds) to the current local time
    const adjustedLocalTime = addMilliseconds(formatDate, totalMillisecondsToAdd);

    // Format the adjusted local time as desired
    return format(adjustedLocalTime, 'yyyy-MM-dd HH:mm:ss');
}

/**
 * Function to format time in a specific timezone.
 * @param {Date} date - The date object.
 * @returns {string} - The formatted time string.
 */
export const formatTimeInTimezone = (date) => {
    return format(date, 'hh:mm:ss a');
}

/**
 * Function to convert UTC time to a specific timezone.
 * @param {Date} date - The date object.
 * @param {number} timezone - The timezone offset in seconds.
 * @returns {string} - The formatted adjusted UTC time.
 */
export const convertUTCtoTimezone = (date, timezone) => {
    const dateUTC = new Date(date);

    // Add the specified time (in milliseconds) to the current local time
    const adjustedUTCTime = addMilliseconds(dateUTC, timezone * 1000);

    // Format the adjusted local time as desired
    return format(adjustedUTCTime, 'yyyy-MM-dd HH:mm:ss');
}
