const {Router} = require ("express")
const getDrivers = require ("../handlers/getDrivers")


const driversRouter = Router();

driversRouter.get("/", getDrivers)

module.exports = driversRouter;