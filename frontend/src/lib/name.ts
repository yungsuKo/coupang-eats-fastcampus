export const hideName = (name: string) => {
  return name.charAt(0) + Array(name.length).fill('*').join('');
};
