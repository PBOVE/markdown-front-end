
export const onlyId = (): string => {
  const word = 'ABCDEFGHIJKLMNOPQRSTUVWXY';
  let id = '';
  const date = new Date();
  id = `${date.getFullYear() % 100}${date.getHours()}${date.getMinutes()}${date.getMilliseconds()}-`;
  id += word.charAt(Math.random() * word.length);
  id += word.charAt(Math.random() * word.length);
  return id;
};
