"use strict";

const jwt = require('jsonwebtoken');
const config = require('config');
const ACCESS_SECRET_KEY = config.get('JWT.access_secret_key');

exports.verifyJwtAndNext = (req, res, next) => { // 미들웨어 2개 이상
    try {
        req.decoded = jwt.verify(req.headers.authorization, ACCESS_SECRET_KEY);
        return next();
    }
    catch (error) {
        // 유효시간이 초과된 경우
        if (error.name === "TokenExpiredError") {
            return res.status(419).json({
                code: 419,
                message: "Token has expired."
            });
        }
        // 토큰의 비밀키가 일치하지 않는 경우
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                code: 401,
                message: "Invalid token."
            });
        }
    }
};

exports.verifyJwt = (req, res, next) => { // 미들웨어 1개 한정
    try {
        if (jwt.verify(req.headers.authorization, ACCESS_SECRET_KEY)) {
            return res.status(200).json({
                code: 200,
                message: "Token verify success."
            });
        }
    }
    catch (error) {
        // 유효시간이 초과된 경우
        if (error.name === "TokenExpiredError") {
            return res.status(419).json({
                code: 419,
                message: "Token has expired."
            });
        }
        // 토큰의 비밀키가 일치하지 않는 경우
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                code: 401,
                message: "Invalid token."
            });
        }
    }
};

