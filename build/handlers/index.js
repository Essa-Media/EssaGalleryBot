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
exports.log = void 0;
exports.default = loadHandler;
const logger_1 = __importDefault(require("../utils/logger"));
const commands_1 = require("./commands");
const events_1 = require("./events");
exports.log = logger_1.default.child({ module: "handlers" });
function loadHandler(client) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, commands_1.registerCommands)(client);
        yield (0, events_1.registerEvents)(client);
        exports.log.info("Handlers loaded.");
    });
}
