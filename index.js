'use strict';

function hasAuth(module, action, userAuthAll) {
  if(!module) {
    return false;
  }
  action = action || '';
  userAuthAll = userAuthAll  || {};
  let userModule = {}
  
  if(!(userModule = userAuthAll[module.toLocaleLowerCase()])) {
    return false;
  } 
  if(action) {
    return userModule.actionsList.indexOf(action) !== -1
  }

  return true;

}

function nodeHasAuth(module, action) {
  const self = this;
  return async function(ctx, next) {
    // this is instance of Context
    const userAuthAll = ctx.session.passportUserAuth || {};
    if (hasAuth(module, action, userAuthAll)) {
      await next();
    } else {
      // https://tools.ietf.org/html/rfc2616#page-66
      ctx.status = 401; // 'Unauthorized'
    }
  };
}

function setAuth() {

}

module.exports = {
  hasAuth,
  setAuth,
  nodeHasAuth
};