const express = require('express');
const app = express();
const port = 3000;
const { User } = require('./models/User');
const cookieParser = require('cookie-parser')
// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const config = require('./config/key')

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('티벳여우 World!'));

// 회원가입 라우터

app.post('/register', (req, res) =>{
      //회원가입 할때 필요한 정보들을 Clinent 에서 가져오면
      //그것들을 데이터베이스에 넣어준다 
  
      const user = new User(req.body);
  
      user
      .save()
      .then(() => {
        res.status(200).json({
          success: true,
        });
      })
      .catch((err) => {
        console.error(err);
        res.json({
          success: false,
          err: err,
      });
    });
});


app.post('/login', (req, res) => {
  // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다
  User.findOne({ email: req.body.email })
      .then(userInfo => {
          if (!userInfo) {
              return res.json({
                  loginSuccess: false,
                  message: "제공된 이메일에 해당하는 유저가 없습니다."
              });
          }

          // 2. 요청된 이메일에 데이터베이스에 있다면 비밀번호가 맞는지 확인
          userInfo.comparePassword(req.body.password)
              .then(isMatch => {
                  // 비밀번호가 틀리면
                  if (!isMatch)
                      return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });

                  // 비밀번호까지 맞다면 토큰을 생성한다.
                  userInfo.generateToken()
                      .then((token) => {
                          // 토큰을 저장한다 어디에? 쿠키, 로컬스토리지
                          // 쿠키에 저장
                          res.cookie('x_auth', token)
                              .status(200)
                              .json({ loginSuccess: true, userId: userInfo._id });
                      })
                      .catch(err => {
                          console.error(err);
                          res.status(400).send(err);
                      });
              })
              .catch(err => {
                  console.error(err);
                  res.status(400).send(err);
              });
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ loginSuccess: false, error: "서버 오류" });
      });
  // 3. 비밀번호까지 같다면 토큰을 생성하기
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
