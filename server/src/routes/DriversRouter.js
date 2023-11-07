const {Router} = require ("express")
const getDrivers = require ("../handlers/getDrivers")
const getDriversById = require("../controllers/getDriversById")
const postDrivers = require ("../controllers/postDrivers")
const driversRouter = Router();

driversRouter.get("/", getDrivers)
driversRouter.get("/:id", getDriversById)
driversRouter.post("/", postDrivers)

module.exports = driversRouter;