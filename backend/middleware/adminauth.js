import jwt from "jsonwebtoken";

const adminAuth =async (req,res,next)=>{
    try{
        const {token} =req.headers
        if(!token){
            return res.json({success:false,message:"User is unauthorized"})
        }

        const tokendecode=jwt.verify(token,process.env.JWT_SECRET)

        if(tokendecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"User is unauthorized"})
        }
        next()
    }

    catch(err){
        console.log(err);
        console.log({success:false,message:err.message})
    }
}

export default adminAuth