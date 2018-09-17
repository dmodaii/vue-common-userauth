'use strict';

// window.userAuth
/**
 * {
 *  
    collectask: {
         id: "22", 
         code: "collectask", 
         actions: "index,detail,add,edit,save,del", 
         actionsList: (6) ["index", "detail", "add", "edit", "save", "del"]
        code: "collectask"
        id: "22"
}
 */

function hasAuth(module, action, userAuthAll) {
  if(!module) {
    return false;
  }
  action = action || '';
  userAuthAll = userAuthAll  || {};
  let userModule = {}
  debugger
  if(!(userModule = userAuthAll[module.toLocaleLowerCase()])) {
    return false;
  } 
  if(action) {
    return userModule.actionsList.indexOf(action.toLocaleLowerCase()) !== -1
  }

  return true;

}

function setAuth() {

}

module.exports = {
  hasAuth,
  setAuth
};