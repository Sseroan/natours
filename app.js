import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

// 1) Middle wares

// Shows Type of request, Path, status, and time
app.use(morgan('dev'));

// Necessary for the res.body
app.use(express.json());

// Serve static files
app.use(express.static(`public`));
// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/public/overview.html`);
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(express.static('dev-data'));

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
