import express from 'express';

import { AdminRoute, VandorRoute } from './routes';

const app = express();
app.use('/admin', AdminRoute);
app.use('/vandor', VandorRoute);



app.listen(3000, () => {
    console.clear();
    console.log("Server is running on port 3000");
})