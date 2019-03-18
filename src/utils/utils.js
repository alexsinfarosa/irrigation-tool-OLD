export const numberOfHoursLapsed = date => {
  const now = Date.now();
  const seconds = Math.floor(now - date) / 1000;
  return Math.floor(seconds / 3600) % 24;
};
