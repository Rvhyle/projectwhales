"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const checkSession_1 = require("./api//v1/middlewares/checkSession");
const client_1 = require("@prisma/client");
const session_config_1 = __importDefault(require("./api/v1/utils/session_config"));
exports.prisma = new client_1.PrismaClient();
//CONSTANTS
const SERVER = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
SERVER.use(express_1.default.json());
SERVER.use(checkSession_1.checkSession);
// Session
SERVER.use(session_config_1.default);
//Paths
SERVER.use('/projectwhales/api/v1/auth', require('./api/v1/controllers/auth/register'));
SERVER.use('/projectwhales/api/v1/auth', require('./api/v1/controllers/auth/login'));
// Start Express server
SERVER.listen(PORT, () => {
    console.log(`Server connected at PORT ${PORT} 🔌`);
});
//# sourceMappingURL=index.js.map