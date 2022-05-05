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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkUserValidation_1 = require("../../models/User/checkUserValidation");
const router = express_1.default.Router();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Destructure
    const { username, password } = req.body;
    //Check if username is valid
    let validUsername = yield (0, checkUserValidation_1.checkUsername)(username);
    //Handle non existent username
    if (!validUsername)
        return res.status(401).json({ message: 'Username does not exists' });
    //Validate password
    //Only triggered if username exists
    let userValidation = yield (0, checkUserValidation_1.checkPassword)(username, password);
    if (!userValidation)
        return res.status(401).json({ message: 'Incorrect Password' });
    //Set Session Info
    req.session.user_id = userValidation === null || userValidation === void 0 ? void 0 : userValidation.user_id;
    req.session.loggedIn = true;
    //log session id
    console.log(req.session.id);
    return res.status(200).json({ message: 'Logged In' });
}));
module.exports = router;
//# sourceMappingURL=login.js.map