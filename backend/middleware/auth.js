import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
const env = process.env.NODE_ENV || 'example';
dotenv.config({ path: `.env.${env}` });
const Sec=process.env.SECRET;
const auth=async(req,res,next)=>{
const tok=req.header.authorization;
if(tok){
    try{
        const token=tok.split("")[1];
        const x=jwt.verify(token,Sec,(err,user)=>{
            if(err){
                res.status(401).json({message:"Invalid token"});
            }
            else{
                req.user=user;
                next();
            }
        })
    }
    catch(err){
        res.status(401).json({message:"Invalid token"});
    }
}
}
export default auth;