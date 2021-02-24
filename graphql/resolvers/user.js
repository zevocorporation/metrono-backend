const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const request = require('request');

const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient(process.env.REDIS_PORT);
let get = promisify(client.get).bind(client);

require('dotenv').config();

exports.queryResolver = {
  sendUserOtp: async (_, args, { req }) => {
    try {
      // if (!req.isAuth) throw new Error('Not Authenticated');

      const mobilenumberexist = await User.findOne({
        mobile: args.mobile,
      });
      if (!mobilenumberexist) {
        throw new Error('Mobile Number does not exist');
      }
      // const otp = await Math.floor(1000 + Math.random() * 9000);
      otp = 1234;
      // var options = {
      //   method: 'GET',
      //   url: 'https://global.datagenit.com/API/sms-api.php',
      //   qs: {
      //     auth: process.env.DATAGEN_AUTHKEY,
      //     senderid: process.env.DATAGEN_SENDERID,
      //     msisdn: mobilenumberexist.mobile,
      //     message: `Your one time password is ${otp}.this otp will expire in 1 minute `,
      //   },
      //   strictSSL: false,
      //   rejectUnauthorized: false,
      //   headers: {
      //     'cache-control': 'no-cache',
      //   },
      // };
      const mobilekey = mobilenumberexist.mobile;
      console.log(otp);
      // request(options, (error, response, body) => {
      //   if (error) throw new Error(error);
      //   console.log(body);
      // });
      client.setex(mobilekey, 60, otp); //temp alternate statement..
      // await sendOTP
      //   .then((result) => {
      //     console.log(result);
      //     otpSent = true;
      //     client.setex(mobile, 60, otp);
      //   })
      //   .catch((err) => {
      //     throw err;
      //   });

      // if (otpSent) return true;
      return true;
    } catch (err) {
      throw err;
    }
  },
  verifyUser: async (_, args, { req }) => {
    try {
      args.otp.trim();
      if (args.otp.length !== 4) {
        throw new Error('Otp is invalid');
      }

      const otp = await get(args.mobile);

      if (args.otp !== otp) throw new Error('Invalid crendentials');

      console.log(args);
      const { id: userID } = await User.findOne({ mobile: args.mobile });

      const accessToken = jwt.sign(
        { userID: userID },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );

      const refreshToken = jwt.sign(
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        },
        process.env.REFRESH_TOKEN_KEY
      );

      client.setex(userID, 7 * 24 * 60 * 60, refreshToken);
      console.log('redis-set');
      return {
        userID: userID,
        accessToken: accessToken,
        refreshToken: refreshToken,
        accessExpiry: process.env.ACCESS_TOKEN_EXPIRY,
        refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY,
      };
    } catch (err) {
      throw err;
    }
  },
  refreshTokens: async (_, args, { req }) => {
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader) throw new Error('Headers Not Found');
      const token = authHeader.split(' ')[1];

      let decodedToken;
      if (!token) throw new Error('Not a valid token');
      try {
        decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
      } catch (err) {
        throw err;
      }
      if (!decodedToken) throw new Error('Invalid refresh token');

      const tokenExists = await get(args.userID);
      console.log(tokenExists);
      if (!tokenExists) throw new Error('Existing Token not found');
      if (!(token == tokenExists)) throw new Error('Tokens Mismatch');

      const accessToken = jwt.sign(
        { userID: args.userID },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );

      const refreshToken = jwt.sign(
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        },
        process.env.REFRESH_TOKEN_KEY
      );

      client.setex(args.userID, 7 * 24 * 60 * 60, refreshToken);

      return {
        userID: args.userID,
        accessToken: accessToken,
        refreshToken: refreshToken,
        accessExpiry: process.env.ACCESS_TOKEN_EXPIRY,
        refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY,
      };
    } catch (err) {
      throw err;
    }
  },
};

exports.mutationResolver = {
  createUser: async (_, args, { req }) => {
    try {
      // if (!req.isAuth) throw new Error('Not Authenticated');
      console.log(args.mobile);
      if (args.mobile.length != 10)
        throw new Error('Not a valid mobile number');

      const user = new User({
        userID: Object.id,
        mobile: args.mobile.trim(),
      });
      const result = await user.save();
      console.log(result);
      return {
        data: result,
        accountCreated: true,
      };
    } catch (err) {
      throw err;
    }
  },
};
