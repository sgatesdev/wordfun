import express, { Application, Request, Response } from 'express';
import { sequelize } from './db'
import routes from './routes';
import cors from 'cors';

const app: Application = express();
const PORT = 8080;

// set up middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up routes
app.use('/', routes);

// connect to db
sequelize.authenticate()
  .then(() => console.log('database connection successful'))
  .catch(error => console.error('database connection failed:', error))

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});