"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.checkUsername = exports.checkEmail = void 0;
const index_1 = require("../../../../index");
const bcrypt = require('bcrypt');
const checkEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let emailIsValid = yield index_1.prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    //return true if email address does exists; false otherwise
    return emailIsValid ? true : false;
});
exports.checkEmail = checkEmail;
const checkUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    let usernameIsValid = yield index_1.prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    //return true if username does exists; false otherwise
    return usernameIsValid ? true : false;
});
exports.checkUsername = checkUsername;
// Validate Password
const checkPassword = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    //Get hashed password from database
    let hashedPass = yield index_1.prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
            password: true,
        },
    });
    //compare password input with hashed password
    let isPasswordValid = bcrypt.compareSync(password, hashedPass === null || hashedPass === void 0 ? void 0 : hashedPass.password);
    return {
        isPasswordValid: isPasswordValid,
        user_id: hashedPass === null || hashedPass === void 0 ? void 0 : hashedPass.id,
    };
});
exports.checkPassword = checkPassword;
//# sourceMappingURL=checkUserValidation.js.map