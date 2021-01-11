
import {iUserClass} from '../templatesTypes';

let questions = [
  "what is a a spaced interval learning platform used for",
  "Why is this useful?",
  "What is the advantage of repeat Learnings",
  "How can execute a command",
  "String question that is gonna be deleted",
]

let answers = [
  "It gradually expands the intervals when the data is presented",
  "it allows you to retain upwards 80% more knowledge, while minimizing the time you need to study",
  "It allows you to keep retain the contextual clues for the knowledge, builds weak connections between the knowledge bits and allows you to play around with the knowledge",
  "on a new line in the userInput (center field) type 'e' or 'exe' and press Enter or click on the button",
  "answer part of the question that is gonna be deleted" 
]

let userInput = "" +
"5x\n" +
"'5x' on a single line deletes question 5 from the list\n" +
"if you want to delete several questions at once you can type '1-5x'\n" +
"\n" +
"\n";



export const insertUserInstructions = (data: iUserClass): iUserClass =>{
  let firstDay = data.get.list()[0];
  firstDay.tags = "Repeat learnings, SRS";
  firstDay.questionAnswerPair.push( )
  let instructions = [];
  for( let i = 0; i < questions.length;i++){
    instructions.push({ 
      questionId: i+1,
      question: {text: questions[i]},
      answer: {text: answers[i]}, 
    })
  }
  firstDay.userInput = userInput;
  firstDay.questionAnswerPair = instructions;
  return data;
}

export default insertUserInstructions;