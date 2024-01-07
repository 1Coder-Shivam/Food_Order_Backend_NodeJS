import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';

import { AdminRoute, VandorRoute } from './routes';
import { MONGO_URI } from './config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRoute);
app.use('/vandor', VandorRoute);

mongoose
      .connect(MONGO_URI)
      .then((res) => {
        console.log(
          'Connected to Distribution API Database - Initial Connection'
        );
      })
      .catch((err) => {
        console.log(
          `Initial Distribution API Database connection error occured -`,
          err
        );
      });
app.listen(3000, () => {
    console.clear();
    console.log("Server is running on port 3000");
})