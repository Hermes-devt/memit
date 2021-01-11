import { iUserClass } from "../templatesTypes"

// // // Make room for new info and transfer the old new info to old data
export const daily_init = (userObj: iUserClass):void=>{
    let newData = userObj.data.dailyNotes.newData;
    userObj.data.dailyNotes.newData = "";
    newData = newData.trim().length > 0 ? '\n###\n' + newData.trim() : "";
    userObj.data.dailyNotes.oldData = userObj.data.dailyNotes.oldData.trim() + newData;
}

export default daily_init;