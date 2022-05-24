var express = require('express');
var router = express.Router();

const nodemailer =  require('nodemailer');

router.post('/send', function(req, res, next) {
  console.log(req.body.mail);
  var transporter =  nodemailer.createTransport({ // config mail server
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'sadenoughtodie97@gmail.com', //Tài khoản gmail vừa tạo
          pass: 'Sock14111997' //Mật khẩu tài khoản gmail vừa tạo
      },
      tls: {
          rejectUnauthorized: false
      }
  });
  var content = '';
  content += `
      <div style="padding: 10px; background-color: #003375">
          <div style="padding: 10px; background-color: white;">
              <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
              <span style="color: black">Đây là mail test</span>
          </div>
      </div>
  `;
  var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
      from: 'sadenoughtodie97@gmail.com',
      to: req.body.mail,
      subject: 'Test Nodemailer',
      text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
      html: content //Nội dung html mình đã tạo trên kia :))
  }
  transporter.sendMail(mainOptions, function(err, info){
      if (err) {
          console.log(err);
          res.redirect('/');
      } else {
          console.log('Message sent: ' +  info.response);
          res.redirect('/');
      }
  });
});

module.exports = router;