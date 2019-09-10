export function GetFormattedTime(militaryTime) {
  if (!militaryTime) {
    return;
  }

  const hours24 = parseInt(militaryTime.substring(0, 2));
  const hours = ((hours24 + 11) % 12) + 1;
  const amPm = hours24 > 11 ? 'pm' : 'am';
  const minutes = militaryTime.substring(2);

  return hours + minutes + amPm;
};

export function GetFormattedDate(unformattedDate) {
  const date = new Date(unformattedDate);
  return date.toLocaleString('default', { month: 'long' });
};
