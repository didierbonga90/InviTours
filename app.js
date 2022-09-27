var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
}

const getOneTour = (req, res) => {
  console.log(req.params);

  const idtour = req.params.id * 1
  const tour = tours.find(el => el.id === idtour)

  if (idtour > tours.length) return res.status(404).json({ status: 'fail', message: 'id doesn\'t exist' });

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
}


const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  // push the data to the file
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
}


const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) return res.send(404).json({ status: 'fail', message: 'id doesn\'t exist' });
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'update tour here...'
    }
  })
}


const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) return res.send(404).json({ status: 'fail', message: 'id doesn\'t exist' });
  res.status(204).json({
    status: 'success',
    data: {
      tour: null
    }
  })
}


app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour)
app
  .route('/api/v1/tours/:id')
  .get(getOneTour)
  .patch(updateTour)
  .delete(deleteTour)

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
