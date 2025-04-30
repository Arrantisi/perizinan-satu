export const countWorkingDays = (statDay: Date, endDate: Date): number => {
  let count = 0;
  const currentDate = new Date(statDay);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 6 && dayOfWeek !== 0) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
};
