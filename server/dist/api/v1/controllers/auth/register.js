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
const express_validator_1 = require("express-validator");
const checkUserValidation_1 = require("../../models/User/checkUserValidation");
const createUser_1 = __importDefault(require("../../models/User/createUser"));
const router = express_1.default.Router();
router.post('/register', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 8, max: 16 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, name } = req.body;
    // Check for input errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    //Check if Username and email exists
    let emailCheck = yield (0, checkUserValidation_1.checkEmail)(email);
    let usernameCheck = yield (0, checkUserValidation_1.checkUsername)(username);
    //Check if info provided is valid and does not exists
    if (emailCheck) {
        return res.status(401).json({ message: 'Email already in use' });
    }
    if (usernameCheck) {
        return res.status(401).json({ message: 'Username already in use' });
    }
    try {
        yield (0, createUser_1.default)(email, password, username, name);
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error creating account' });
    }
    //Create User
    return res.status(200).json({ message: 'Account created' });
}));
module.exports = router;
//# sourceMappingURL=register.js.map