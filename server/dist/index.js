"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const basicRoutes_1 = __importDefault(require("./routes/basicRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', basicRoutes_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// const express = require('express');
// const app = express();
// const userRoutes = require('./routes/userRoutes');
// // Middleware
// app.use(express.json());
// // Routes
// app.use('/api/users', userRoutes);
// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// import express from 'express';
// const app = express();
// app.use(express.json())
// const port = 3000;
// let log : Array<Array<any>> = [];
// function createTable(tableData: Array<Array<string | number>>) : string {
//     var res = "";
//     tableData.forEach(function(rowData) {
//         let row_res = ""
//       rowData.forEach(function(cellData: string | number) {
//         row_res += `${cellData} `;
//       });
//       res += row_res + "<br />";
//     });
//     return res;
//   } 
// app.get('/', (req, res) => {
//     res.send(`<!DOCTYPE html>
// <html>
// <head>
//     <title>Life 720 Server</title>
// </head>
// <body>
//     <h1>Life 720</h1>
//     ${createTable(log)}
// </body>
// </html>`)
// })
// app.post('/logger/', (req, res) => {
//     console.log("got connection!")
//     log.push([req.body.id, req.body.timestamp, req.body.lat, req.body.long])
//     res.send()
//     console.log(log)
// })
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
