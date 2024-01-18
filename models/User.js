const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,     //스페이스 없애기
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String    //유효성 검사
    },
    tokenExp: {
        type: Number    //유호 기간
    }
})

userSchema.pre('save',function( next ){
    //로그인한 유저 정보를 가져온다(유저 스키마)
    let user = this;
    //비밀번호를 암호화 시킨다.
    //비밀번호를 바꿀때만 암호화처리
    //필드 중에 패스워드가 변환댈때만 처리한다
    if(user.isModified('password')){

        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash
                next();
        });
    });
    }else{
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword) {
    return new Promise((resolve, reject) => {
        // plainPassword 1234567 암호화된 비밀번호와 같은지 체크
        // 암호화해서 db와 맞는지 확인하기
        bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
            // 암호가 맞지 않다면
            if (err) return reject(err);
            // 암호가 맞다면
            resolve(isMatch);
        });
    });
}

userSchema.methods.generateToken = function () {
    return new Promise((resolve, reject) => {
        // jsonwebtoken을 사용하여 토큰 생성
        let user = this;
        let token = jwt.sign({ userId: user._id }, 'secretToken');
        user.token = token;

        // 새로운 토큰으로 사용자 저장
        user.save()
            .then(savedUser => resolve(savedUser))
            .catch(error => reject(error));
    });
};

const User = mongoose.model('User', userSchema)

//따른 파일에서도 쓸수있게
module.exports = {User};