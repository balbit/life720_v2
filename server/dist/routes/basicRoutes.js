"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const basicController_1 = require("../controllers/basicController");
const router = express_1.default.Router();
router.post('/createuser', basicController_1.createUser);
router.post('/addfriend', basicController_1.addFriend);
router.post('/sendloc', basicController_1.sendLocation);
router.get('/getloc', basicController_1.getLocation);
exports.default = router;
