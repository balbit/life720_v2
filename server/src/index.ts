import express from 'express';
import router from './routes/basicRoutes';
import { add_user, get_friends, make_friends, add_location, get_current_location, get_friends_current_location } from './models/basicModel';

const app = express();

app.use(express.json())
app.use('/api', router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

const run = async () => {
  // const ishank_id = await add_user("ishank");
  // const elliot_id = await add_user("elliot");
  const ishank_id = "user-7ce7c2e4";
  const elliot_id = "user-d1f1e35d";

  console.log(`ishank_id: ${ishank_id}`);
  console.log(`elliot_id: ${elliot_id}`);

  let ishank_friends = await get_friends(ishank_id);
  let elliot_friends = await get_friends(elliot_id);
  console.log(ishank_friends)
  console.log(elliot_friends)

  await make_friends(ishank_id, elliot_id);

  ishank_friends = await get_friends(ishank_id);
  elliot_friends = await get_friends(elliot_id);
  console.log(ishank_friends)
  console.log(elliot_friends)

  await add_location(ishank_id, new Date(), {latitude: 10, longitude: 10});
  await add_location(elliot_id, new Date(), {latitude: 10, longitude: 10});
  await new Promise((resolve) => { setTimeout(resolve, 2000); });
  await add_location(ishank_id, new Date(), {latitude: 30, longitude: 40});

  const location = await get_current_location(ishank_id);
  console.log(location)

  const location_2 = await get_friends_current_location(elliot_id);
  console.log(location_2)

}

run();


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