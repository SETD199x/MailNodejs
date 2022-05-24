var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nodemailer = require('nodemailer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sendMailRouter = require('./routes/sendMail');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/send', sendMailRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/send', function (req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'sadenoughtodie97@gmail.com', //Tài khoản gmail vừa tạo
      pass: 'Sock14111997' //Mật khẩu tài khoản gmail vừa tạo
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
  var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    from: 'sadenoughtodie97@gmail.com',
    to: req.body.mail,
    subject: 'Test Nodemailer',
    text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
    html: '<h1>Hello World!!!</h1>' //Nội dung html mình đã tạo trên kia :))
  }
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.redirect('/users');
    } else {
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    }
  });
});

app.get('/test', function (req, res) {
  res.render('test.ejs');
});

module.exports = app;
