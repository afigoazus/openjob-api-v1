import jwt from "jsonwebtoken";

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;

export function signAccessToken(payload) {
  const options = { expiresIn: "3h" };
  return jwt.sign(payload, ACCESS_TOKEN_KEY, options);
}

export function signRefreshToken(payload) {
  const options = { expiresIn: "1y" };
  return jwt.sign(payload, REFRESH_TOKEN_KEY, options);
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_KEY);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_KEY);
}
