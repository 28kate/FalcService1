const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const{validateToken}=require("../middleware/Middleware")


router.get("/:serviceId", async (req, res) => {
    const serviceId = req.params.serviceId;
    try {
      const comments = await Comments.findAll({
        where: { ServiceId: serviceId },
        order: [['createdAt', 'DESC']]  
      });
      res.json(comments);
    } catch (err) {
      console.error("Error retrieving comments:", err);
      res.status(500).json({ error: "Error retrieving comments" });
    }
  });
  
  router.post("/",validateToken, async (req, res) => {
    const comment = req.body;
    const userName=req.user.userName;
    comment.userName=userName;
    try {
      
        const newComment = await Comments.create(
         comment
        );

      
        res.json(newComment); 
    } catch (err) {
        console.error("Error creating comment:", err);
        res.status(500).json({ error: "Error creating comment" });
    }
});


router.delete('/com/:id',validateToken, async (req, res) => {
    const commentId = req.params.id;
    try {
    
        await Comments.destroy({ where: { id: commentId } });
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});
module.exports = router;