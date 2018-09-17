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
  if (!module) {
    return false;
  }
  action = action || '';
  userAuthAll = userAuthAll || {};
  var userModule = {};

  if (!(userModule = userAuthAll[module.toLocaleLowerCase()])) {
    return false;
  }
  if (action) {
    return userModule.actionsList.indexOf(action.toLocaleLowerCase()) !== -1;
  }

  return true;
}

function nodeHasAuth(module, action) {
  var self = this;
  return async function (ctx, next) {
    // this is instance of Context
    var userAuthAll = ctx.session.passportUserAuth || {};
    if (hasAuth(module, action, userAuthAll)) {
      await next();
    } else {
      // https://tools.ietf.org/html/rfc2616#page-66
      ctx.status = 401; // 'Unauthorized'
    }
  };
}

function setAuth() {}

module.exports = {
  hasAuth: hasAuth,
  setAuth: setAuth,
  nodeHasAuth: nodeHasAuth
};