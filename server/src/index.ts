import express from 'express';
import cors from 'cors';
import router from './routes/basicRoutes';
import database from './database/Database';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors()) // allow cross-origin requests from any port
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

  console.log("Done!")

}

run();
