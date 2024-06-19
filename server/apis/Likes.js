const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middleware/Middleware");

router.post("/", validateToken, async (req, res) => {
  const { ServiceId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: { ServiceId: ServiceId, UserId: UserId },
  });
  if (!found) {
    await Likes.create({ ServiceId: ServiceId, UserId: UserId });
    res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: { ServiceId: ServiceId, UserId: UserId },
    });
    res.json({ liked: false });
  }
});

module.exports = router;