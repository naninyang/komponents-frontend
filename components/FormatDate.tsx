import { format, utcToZonedTime } from 'date-fns-tz';

const FormatDate = (dateString: string) => {
  const seoulTimeZone = 'Asia/Seoul';
  const pattern = 'yyyy/MM/dd HH:mm:ss';
  const zonedDate = utcToZonedTime(new Date(dateString), seoulTimeZone);

  return format(zonedDate, pattern, { timeZone: seoulTimeZone });
};

export default FormatDate;
