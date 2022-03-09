import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isbetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/es';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isbetween);

export const getFirstDayOfCurrentMonth = (): Date =>
  dayjs(Date.now()).utc().startOf('month').toDate();

export const getLastDayOfCurrentMonth = (): Date =>
  dayjs(Date.now()).utc().endOf('month').toDate();

export const getCurrentMonth = (): number =>
  dayjs().month();

export const toUTC = (date): Date =>
  dayjs(date).utc().toDate();

export const toDate = (value: string | Date, format?: string): Date => {
  const result = dayjs(value, format);
  if (!result.isValid()) {
    throw new Error('Invalid date: ' + value + ' format: ' + format);
  }
  return result.toDate();
};

export const getToday = () => dayjs().toDate();
