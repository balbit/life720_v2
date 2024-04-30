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
exports.getLocation = exports.sendLocation = exports.addFriend = exports.createUser = void 0;
const hackyDatabase_1 = __importDefault(require("../database/hackyDatabase"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`CREATE_USER: ${JSON.stringify(req.body)}`);
    let uuid = hackyDatabase_1.default.add_user(req.body.name);
    res.send({ "uuid": uuid });
    hackyDatabase_1.default.print();
});
exports.createUser = createUser;
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`ADD_FRIEND: ${JSON.stringify(req.body)}`);
    hackyDatabase_1.default.add_friends(req.body.uuid, req.body.friend);
    res.send(200);
    hackyDatabase_1.default.print();
});
exports.addFriend = addFriend;
const sendLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`SEND_LOCATION: ${JSON.stringify(req.body)}`);
});
exports.sendLocation = sendLocation;
const getLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`GET_LOCATION: ${JSON.stringify(req.body)}`);
});
exports.getLocation = getLocation;
