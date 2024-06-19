const express=require("express")
const router=express.Router()
const {Users}=require("../models")
const bcrypt=require("bcrypt");
const {sign}=require('jsonwebtoken')
const{validateToken}=require("../middleware/Middleware")


router.post("/",async(req,res)=>{
    const {userName, password,role}=req.body;
    if (!userName||!password){
        res.send("Fill in all fields")
    }
 else{
    bcrypt.hash(password,10).then((hash)=>{
        Users.create({
            userName:userName,
            password:hash,
            role:role
        })
        res.json({userName:userName,role:role})
    })
 }
    
})

router.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    const user = await Users.findOne({ where: { userName: userName } });

    if (!user) {
        res.json({ error: "User does not exist" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong username or password combination" });
            } else {
                const accessToken = sign({ userName: user.userName, id: user.id, role: user.role }, "importantsecret");
                res.json({ token: accessToken, userName: user.userName, id: user.id, role: user.role });
            }
        }).catch(err => {
            console.error("Error comparing passwords:", err);
            res.status(500).json({ error: "Internal server error" });
        });
    }
    router.get("/authen",validateToken,(req,res)=>{
        res.json(req.user)
     })
});


router.get("/basicInfo/:id", async(req,res)=>{
  const id=req.params.id;
  const basicInfo= await Users.findByPk(id,{attributes:{exclude:['password']}})
  res.json(basicInfo)
})




module.exports=router;