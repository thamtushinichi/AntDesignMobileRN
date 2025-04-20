import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';

// Load plugins
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(calendar);
dayjs.extend(updateLocale);

// Update locale settings if needed
dayjs.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[Last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L',
  },
});

/**
 * Date utilities using dayjs for consistent date formatting
 */
const dateUtils = {
  /**
   * Format date with specified format string
   * @param date Date to format
   * @param format Format string (default: 'YYYY-MM-DD')
   * @returns Formatted date string
   */
  format: (
    date: string | number | Date | dayjs.Dayjs | null | undefined,
    format = 'YYYY-MM-DD'
  ): string => {
    if (!date) return '';
    return dayjs(date).format(format);
  },

  /**
   * Format date to localized format
   * @param date Date to format
   * @param format Format string (L: date, LL: date with month name, LLL: date with month name and time, LLLL: full date)
   * @returns Formatted date string
   */
  formatLocalized: (
    date: string | number | Date | dayjs.Dayjs | null | undefined,
    format: 'L' | 'LL' | 'LLL' | 'LLLL' = 'L'
  ): string => {
    if (!date) return '';
    return dayjs(date).format(format);
  },

  /**
   * Format date as relative time (e.g., "2 hours ago")
   * @param date Date to format
   * @returns Relative time string
   */
  fromNow: (date: string | number | Date | dayjs.Dayjs | null | undefined): string => {
    if (!date) return '';
    return dayjs(date).fromNow();
  },

  /**
   * Format date as calendar time (e.g., "Today at 2:30 PM")
   * @param date Date to format
   * @returns Calendar time string
   */
  calendar: (date: string | number | Date | dayjs.Dayjs | null | undefined): string => {
    if (!date) return '';
    return dayjs(date).calendar();
  },

  /**
   * Format time only (e.g., "2:30 PM")
   * @param date Date to format
   * @param format Format string (default: 'h:mm A')
   * @returns Formatted time string
   */
  formatTime: (
    date: string | number | Date | dayjs.Dayjs | null | undefined,
    format = 'h:mm A'
  ): string => {
    if (!date) return '';
    return dayjs(date).format(format);
  },

  /**
   * Check if date is today
   * @param date Date to check
   * @returns Boolean indicating if date is today
   */
  isToday: (date: string | number | Date | dayjs.Dayjs | null | undefined): boolean => {
    if (!date) return false;
    return dayjs(date).isSame(dayjs(), 'day');
  },

  /**
   * Check if date is in the past
   * @param date Date to check
   * @returns Boolean indicating if date is in the past
   */
  isPast: (date: string | number | Date | dayjs.Dayjs | null | undefined): boolean => {
    if (!date) return false;
    return dayjs(date).isBefore(dayjs());
  },

  /**
   * Check if date is in the future
   * @param date Date to check
   * @returns Boolean indicating if date is in the future
   */
  isFuture: (date: string | number | Date | dayjs.Dayjs | null | undefined): boolean => {
    if (!date) return false;
    return dayjs(date).isAfter(dayjs());
  },

  /**
   * Get the difference between two dates in specified unit
   * @param date1 First date
   * @param date2 Second date (default: now)
   * @param unit Unit of measurement (default: 'day')
   * @returns Difference in specified unit
   */
  diff: (
    date1: string | number | Date | dayjs.Dayjs | null | undefined,
    date2?: string | number | Date | dayjs.Dayjs | null,
    unit: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year' = 'day'
  ): number => {
    if (!date1) return 0;
    return dayjs(date1).diff(date2 || dayjs(), unit);
  },

  /**
   * Create a dayjs instance for the current date/time
   * @returns Dayjs instance
   */
  now: (): dayjs.Dayjs => dayjs(),

  /**
   * Create a dayjs instance
   * @param date Date to parse
   * @returns Dayjs instance
   */
  parse: (date: string | number | Date | dayjs.Dayjs | null | undefined): dayjs.Dayjs | null => {
    if (!date) return null;
    return dayjs(date);
  },
};

export default dateUtils;
