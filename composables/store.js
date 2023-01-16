export const useStore = () => {
  const state = {
    ru: {},
    en: {},
  };
  return useState('State', () => state);
};
