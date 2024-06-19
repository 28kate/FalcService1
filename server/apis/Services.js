const express = require('express');
const router = express.Router();
const { Services,Likes } = require("../models");
const{validateToken}=require("../middleware/Middleware")

router.post("/",validateToken, async (req, res) => {
    const { icon,title,body,color} = req.body;

    if (!title || !icon || !body || !color){
        return res.status(200).send("Fill in all the details");
    }
    const service = await Services.create({
       title,icon,body,color
    });
    return res.status(200).send(service);
});

router.get("/",async(req,res)=> {
    const listOfServices= await Services.findAll()

    if(!listOfServices){
        res.json("Loading...")
    }
    res.json({listOfServices:listOfServices})

})

router.get("/byId/:id", async(req,res)=>{
    const id=req.params.id;
    const service = await Services.findByPk(id);
    res.json(service);
})

router.delete("/:serviceId",async(req,res)=>{
    const serviceId=req.params.serviceId;

    Services.destroy({where:{id:serviceId}})
    return("Deleted");
})



module.exports = router;
