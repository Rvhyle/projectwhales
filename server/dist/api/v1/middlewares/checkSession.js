"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSession = void 0;
const checkSession = (req, res, next) => {
    //Check if session exists
    let sessionCookie = req.cookies;
    console.log(req.cookies);
    next();
};
exports.checkSession = checkSession;
//# sourceMappingURL=checkSession.js.map