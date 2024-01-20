const {User} = require('../models/User')
let auth = async (req, res, next) => {
    try {
      // 클라이언트 쿠키에서 토큰을 가져옵니다.
      let token = req.cookies.x_auth;
      // 토큰을 복호화한 후 유저를 찾습니다.
      const user = await User.findByToken(token);
      console.log(user);
      if (!user) {
        // 유저가 없는 경우
        return res.status(401).json({ isAuth: false, error: true, message: '인증되지 않은 사용자입니다.' });
      }
  
      // 유저가 있으면 인증 성공
      req.token = token;
      req.user = user;
      next();
    } catch (err) {
      // 에러 처리
      console.error(err);
      res.status(500).json({ isAuth: false, error: true, message: '서버 오류' });
    }
  };

module.exports = {auth};