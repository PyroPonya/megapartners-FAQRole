export const useStore = () => {
  const state = {
    developer: {
      dev_question1: 'dev_answer1',
      dev_question2: 'dev_answer2',
      dev_question3: 'dev_answer3',
      dev_question4: 'dev_answer4',
    },
    designer: {
      des_question1: 'des_answer1',
      des_question2: 'des_answer2',
      des_question3: 'des_answer3',
      des_question4: 'des_answer4',
    },
    maiLord: {
      mai_question1: 'mai_answer1',
      mai_question2: 'mai_answer2',
      mai_question3: 'mai_answer3',
      mai_question4: 'mai_answer4',
    },
  };
  return useState('State', () => state);
};
