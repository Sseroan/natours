import fs from 'fs';

const tours = JSON.parse(
  fs.readFileSync(`./dev-data/data/tours-simple.json`)
);

// Param middleware - checkID
const checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  next();
};

// 400 - bad request
const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Missing name or Price',
    });
  }
  next();
};

// Tours

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

  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'Fail',
  //     message: 'Invalid ID',
  //   });
  // }

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

// Update a tour, use PATCH if updating part of tour/ properties
const updateTour = (req, res) => {
  const id = req.params.id * 1;

  res.status(200).json({
    status: 'Success',
    data: {
      tour: `<Update Tour here...>`,
    },
  });
};

// Delete a tour
const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};

export default {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
};
