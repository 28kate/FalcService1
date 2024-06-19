const {verify}=require("jsonwebtoken")

const validateToken=(req,res,next)=>{
    const accessToken=req.header("accessToken");

    if(!accessToken){
       return res.json({error:"Please Login"})
    }
      else{
        const valideToken=verify(accessToken,"importantsecret")
         req.user=valideToken;
        if(valideToken){
          return  next()   
        }
        else{
          return res.json({error:err }) 
        }

      }
      
     
            
}

module.exports={validateToken}