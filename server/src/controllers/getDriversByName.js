const axios = require ("axios");
const {Driver, Team} = require ("../db")
const {Op, Sequelize} = require("sequelize")

const nameApi = async (name) =>{
    const response = await axios.get("http://localhost:5000/drivers?name.forename={name}")
    const {data} = response;
    
    const dataFilter = data.filter(driver =>
        driver.name.forename.toLowerCase().includes(name.toLowerCase()))
        return dataFilter
    }

const nameBdd = async (name)=>{
    const data = await Driver.findAll({
        where: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("Driver.name")),
            {
                [Op.iLike]: `%${name.toLowerCase()}%`
            }
        ),
        include: {
            model: Team,
            through: {
                attributes: []
            }
        }
    });
    
    const cleanData = data.map(driver => ({
        id : driver.id,
        name : {
            forename : driver.name,
            surname : driver.lastname
        },
        image : {
            url : driver.image 
        },
        dob : driver.birthday,
        nationality : driver.nationality,
        teams : driver.Teams.map(team => team.name).join(', '),
        description : driver.description
    }));
    return cleanData
}

module.exports = nameApi, nameBdd;