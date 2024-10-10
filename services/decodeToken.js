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

/* here promisify handle (error,decode section),with out this it look like 

(jwt.verify)(token,process.env.secretkey,(error,decode)=>{
if(error){
res.send("error occured")
}else{
res.send("eveything is done good")

}


}) */
