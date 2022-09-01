export function resultFormatter(time, mode) {
  const { timeFormat } = uni.$u;
  switch (mode) {
    case 'datetime':
      return timeFormat(time, 'yyyy-mm-dd hh:MM');
    case 'date':
      return timeFormat(time, 'yyyy-mm-dd');
    case 'year-month':
      return timeFormat(time, 'yyyy-mm');
    case 'time':
      return time;
    default:
      return '';
  }
}
