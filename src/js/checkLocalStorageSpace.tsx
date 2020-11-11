

export const checkLocalStorageSpace = ()=>{
  let allStrings = '';
  for(let key in window.localStorage){
      if(window.localStorage.hasOwnProperty(key)){
          allStrings += window.localStorage[key];
      }
  }
  let size = allStrings ? 3 + ((allStrings.length*16)/(8*1024)) : 0;
  let storageSize = size.toFixed(1);
  console.log( 'Size', storageSize + ' KB')
  return storageSize;
};

export default checkLocalStorageSpace;