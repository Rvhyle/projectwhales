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
const index_1 = require("../../../../index");
const bcrypt = require('bcrypt');
const createUser = (email, password, username, name) => __awaiter(void 0, void 0, void 0, function* () {
    //Create hashed Password
    const saltRounds = 10;
    const hashedPass = bcrypt.hashSync(password, saltRounds);
    yield index_1.prisma.user.create({
        data: {
            email: email,
            password: hashedPass,
            username: username,
            name: name,
        },
    });
});
exports.default = createUser;
//# sourceMappingURL=createUser.js.map