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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    return userModule.actionsList.indexOf(action) !== -1;
  }

  return true;
}

function nodeHasAuth(module, action) {
  var self = this;
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var userAuthAll;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // this is instance of Context
              userAuthAll = ctx.session.passportUserAuth || {};

              if (!hasAuth(module, action, userAuthAll)) {
                _context.next = 6;
                break;
              }

              _context.next = 4;
              return next();

            case 4:
              _context.next = 7;
              break;

            case 6:
              // https://tools.ietf.org/html/rfc2616#page-66
              ctx.status = 401; // 'Unauthorized'

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

function setAuth() {}

module.exports = {
  hasAuth: hasAuth,
  setAuth: setAuth,
  nodeHasAuth: nodeHasAuth
};