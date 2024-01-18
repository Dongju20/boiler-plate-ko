const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema)

//따른 파일에서도 쓸수있게
module.exports = {}