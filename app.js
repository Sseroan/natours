import fs from 'fs';
import express from 'express';
import morgan from 'morgan';

const app = express();

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

// 1) Middle wares

app.use(morgan('dev'));

//Necessary for the res.body
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Route Handlers

// Get all tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

// Get a Tour
const getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

// Create a Tour
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `./dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).send({
        status: 'Success',
        data: {
          tours: newTour,
        },
      });
    }
  );
};

// Update a tour, use PATCH if updating part of tour
const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour: `<Update Tour here...>`,
    },
  });
};

// Delete a tour
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
};

// Users

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined.',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined.',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined.',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined.',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined.',
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) Routes

// Tours

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//Users

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// 4) Connection

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
