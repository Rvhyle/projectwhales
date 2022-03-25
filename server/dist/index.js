"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
//CONSTANTS
const SERVER = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
//Paths
SERVER.use('/', require('./api/v1/auth/register'));
// Start Express server
SERVER.listen(PORT, () => {
    console.log(`Server connected at PORT ${PORT} 🔌`);
});
//# sourceMappingURL=index.js.map