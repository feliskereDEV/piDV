const { Router } = require("express");
const DriversRouter = require ("../routes/DriversRouter")
const router = Router();


router.use("/drivers", DriversRouter)





module.exports = router;
