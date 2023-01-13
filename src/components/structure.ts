export interface IQuestions {
  answerSha1: string;
  question: string;
}
export interface IQuestionCard {
  questions: IQuestions;
  fetchNextQuestion: () => void;
  handleWrongAnswer: () => void;
}

export interface IHeader {
  chance: number;
  score: number;
}

export interface IResultScreen {
  score: number;
  resetState: () => void;
}

export interface IAllQuestions {
  question: string;
  answerSha1: string;
}
