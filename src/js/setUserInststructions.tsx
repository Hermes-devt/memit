
import {iUserData} from '../templatesTypes';

let questions = "" +
"1. what is a a spaced interval learning platform used for\n" + 
"2. Why is this useful?\n" +
"3. What is the advantage of repeat Learnings\n" +
"4. How can execute a command\n" +
"5. String question that is gonna be deleted\n" +
"8. When is a new card created?\n" +
"\n" +
"\n" +
"\n" +
"\n" +
"\n" +
"\n";

let answers = "" +
"1. It gradually expands the intervals when the data is presented\n\n" +
"2. it allows you to retain upwards 80% more knowledge, while minimizing the time you need to study\n\n" +
"3. It allows you to keep retain the contextual clues for the knowledge, builds weak connections between the knowledge bits and allows you to play around with the knowledge\n\n" +
"4. on a new line in the userInput (center field) type 'e' or 'exe' and press Enter or click on the button\n\n" +
"5. answer part of the question that is gonna be deleted\n" +
"\n" +
"\n" +
"\n" +
"\n" +
"\n" +
"\n";

let userInput = "" +
"5x\n" +
"'5x' on a single line deletes question 5 from the list\n" +
"if you want to delete several questions at once you can type '1-5x'\n" +
"\n" +
"\n" +
"\n" +
"\n" +
"\n" +
"\n" +
"\n";



export const insertUserInstructions = (data: iUserData): iUserData =>{
  data.list[data.list.length-1].questions = questions;
  data.list[data.list.length-1].answers = answers;
  data.list[data.list.length-1].userInput = userInput;

  console.log( data.list[data.list.length-1]);
  return data;
}

export default insertUserInstructions;