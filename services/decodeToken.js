import { promisify } from "util";
import jwt from "jsonwebtoken";
const decodeToken = async (token, secret) => {
  const decodedResult = await promisify(jwt.verify)(
    token,
    process.env.SECRETKEY
  );
  return decodedResult;
};

export default decodeToken;
