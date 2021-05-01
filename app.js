const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const STATIC = require('./config/staticValues');
const Sentry = require('@sentry/node');
const compression = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
// const { Sequelize } = require('sequelize');
const RateLimit = require('express-rate-limit');
const checkToken = require('./config/jwt/jwtMiddleware');
// const RedisStore = require('rate-limit-redis');
// const Redis = require('ioredis');
// const client = new Redis('/tmp/redis.sock');

const helmet = require("helmet");
const mongoose = require('mongoose');
require('dotenv').config();


// https://jonnysoft.tech/nodejs/api/v1
// https://jungle99.herokuapp.com/99jungle/api/v1
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const roleRouter = require('./routes/role');
const categoryRouter = require('./routes/category');
const colourRouter = require('./routes/colour');
const sizeRouter = require('./routes/size');
const tagRouter = require('./routes/tag');
const templateRouter = require('./routes/email-template');
const merchantRouter = require('./routes/merchant');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const occassionRouter = require('./routes/occassion');
const sleeveRouter = require('./routes/sleeve');
const neckRouter = require('./routes/neck');
const patternRouter = require('./routes/pattern');
const brandRouter = require('./routes/brand');
const productTypeRouter = require('./routes/product-type');
const modelRouter = require('./routes/model');
const finishingRouter = require('./routes/finishing');
const materialRouter = require('./routes/material');
const stripeRouter = require('./routes/stripe-route');



var app = express();



Sentry.init({ 
  dsn: "https://3db4541c4f794ec98538775547198eaa@o488440.ingest.sentry.io/5569583"
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

//-------------------------------------------------------------
//  DB Connection and connection checking
//-------------------------------------------------------------
mongoose.connect('mongodb+srv://99jungle:99jungle@2232@99jungle-db.zymab.mongodb.net/99jungle-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(data => {
  //connection checking
  console.log('Mongo DB Atlas Connected !!!');
}).catch(err => {
  console.log('Mongo DB Atlas connection  err  >>>  ', err);
});


//-------------------------------------------------------------
//  allowing CORS middleware
//-------------------------------------------------------------
app.use(cors());


//-------------------------------------------------------------
//  override with POST having ?_method=DELETE / PATCH
//-------------------------------------------------------------
app.use(methodOverride('_method'))


const limiter = new RateLimit({
  // store: new RedisStore({
  //   client: client
  // }),
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
app.use(limiter);

// helmet middleware
app.use(helmet());

//-------------------------------------------------------------
//  Compressing responce middleware
//-------------------------------------------------------------
app.use(compression());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// https://jonnysoft.tech/nodejs/api/v1
app.use('/', indexRouter);
app.use(`${STATIC.apiRoot}`, indexRouter);
app.use(`${STATIC.apiRoot}/auth`, authRouter);
app.use(`${STATIC.apiRoot}/role`, roleRouter);
app.use(`${STATIC.apiRoot}/category`, checkToken, categoryRouter);
app.use(`${STATIC.apiRoot}/tag`, checkToken, tagRouter);
app.use(`${STATIC.apiRoot}/template`, checkToken, templateRouter);
app.use(`${STATIC.apiRoot}/colour`, colourRouter);
app.use(`${STATIC.apiRoot}/size`, sizeRouter);
app.use(`${STATIC.apiRoot}/merchant`, checkToken, merchantRouter);
app.use(`${STATIC.apiRoot}/product`, productRouter);
app.use(`${STATIC.apiRoot}/user`, checkToken, userRouter);
app.use(`${STATIC.apiRoot}/occassion`, occassionRouter);
app.use(`${STATIC.apiRoot}/sleeve`, sleeveRouter);
app.use(`${STATIC.apiRoot}/neck`, neckRouter);
app.use(`${STATIC.apiRoot}/pattern`, patternRouter);
app.use(`${STATIC.apiRoot}/brand`, brandRouter);
app.use(`${STATIC.apiRoot}/product-type`, productTypeRouter);
app.use(`${STATIC.apiRoot}/model`, modelRouter);
app.use(`${STATIC.apiRoot}/finishing`, finishingRouter);
app.use(`${STATIC.apiRoot}/material`, materialRouter);
app.use(`${STATIC.apiRoot}/stripe`, checkToken, stripeRouter);




// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;