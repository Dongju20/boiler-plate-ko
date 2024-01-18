const express = require('express');
const app = express();
const port = 3000;
const { User } = require('./models/User');

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const config = require('./config/key')

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('티벳여우 World!'));

// 회원가입 라우터
app.post('/register', (req, res) => {
    // 회원 가입 할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어줌
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


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
