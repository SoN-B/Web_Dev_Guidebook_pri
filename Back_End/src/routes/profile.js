"use strict";

const express = require('express');
const ctrl = require('../controllers/profile');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();

const upload = require("../functions/multer");

router.get("/content", verifyJWT.verifyJwtAndNext, ctrl.selfWrittenContent);
router.get("/comment", verifyJWT.verifyJwtAndNext, ctrl.selfWrittenComment);
router.get("/hit/content", verifyJWT.verifyJwtAndNext, ctrl.userHitContent);

router.post("/updation", verifyJWT.verifyJwtAndNext, upload.single("image"), ctrl.profileUpdate);

module.exports = router;
