const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const request = require('request');

const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient(process.env.REDIS_PORT);
let get = promisify(client.get).bind(client);

require('dotenv').config();
exports.queryResolver = {
  sendUserOtp: async (_a, args) => {
    try {
      let otpSent = false;
      const mobileNumber = args.mobile.trim();
      if (mobileNumber.length !== 10) throw new Error('Invalid mobile number');

      const IsUserExists = await User.findOne({ mobile: mobileNumber }).exec();
      // console.log(IsUserExists);
      if (!IsUserExists) throw new Error('Mobile Number not registered!');

      const otp = Math.floor(1000 + Math.random() * 9000);
      // console.log(otp);
      client.setex(mobileNumber, 60, otp);

      if (otp) otpSent = true;

      return otpSent;
    } catch (err) {
      throw err;
    }
  },

  verifyUser: async (_, args) => {
    try {
      const mobileNumber = args.mobile.trim();
      const verifyCode = args.otp.trim();
      if (mobileNumber.length !== 10 || verifyCode.length !== 4)
        throw new Error('Invalid mobile number or otp');
      const otp = await get(mobileNumber);
      // console.log(otp);
      if (!otp) throw new Error('Mobile number not Registered');
      if (otp !== verifyCode) throw new Error('Otp mismatch');

      const { id: userID } = await User.findOne({ mobile: mobileNumber });

      if (!userID) throw new Error('Not a Registered Mobile number');

      const accessToken = jwt.sign(
        { userID: userID },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
      );
      const refreshToken = jwt.sign(
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
        process.env.REFRESH_TOKEN_KEY
      );
      client.setex(userID, 7 * 24 * 60 * 60, refreshToken);
      // console.log('redis-set');
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
      // console.log(tokenExists);
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
  createUser: async (_, args) => {
    try {
      const mobileNumber = args.mobile.trim();
      if (mobileNumber.length !== 10) throw new Error('Invalid mobile number');

      const IsUserExists = await User.findOne({ mobile: mobileNumber }).exec();
      // console.log(IsUserExists);
      if (IsUserExists) throw new Error('Mobile Number already registered!');

      const user = new User({
        userID: Object.id,
        mobile: mobileNumber,
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
