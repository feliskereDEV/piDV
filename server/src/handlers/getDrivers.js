const getDriversApi = require ("../controllers/getDriversController");
const getDriversBdd = require ("../controllers/getDriversController");
const nameApi = require ("../controllers/getDriversByName")
const nameBdd = require ("../controllers/getDriversByName");
const { all } = require("axios");

const getDrivers = async (req,res) =>{
    const driversApi = await getDriversApi();
    const driversBdd = await getDriversBdd();
    const drivers = [...driversApi, ...driversBdd]
    const {name} = req.query;
    
    
    if(name){
        name = name.toLowerCase(); // no está funcionando   
        try {
            const searchApi = await nameApi(name);
            const searchDb = await nameBdd(name);
            const driversName = [...searchApi, ...searchDb]
            
            console.log(allSearch)
            driversName.length ? res.status(200).json(allSearch.slice(0,15)) : res.status(400).send("Invalid driver")
            console.log(allSearch)
        } catch (error) {
            return error
        }
    }

    else{
        try {
            res.status(200).json(drivers)
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }
}


module.exports = getDrivers;