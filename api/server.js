import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const port = 3001;

app.use(morgan('dev'));
app.use(bodyParser.json());

// Load Routes
routes(app);

// Start the Dev Server
app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});

export default app;