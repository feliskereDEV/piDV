const axios = require ("axios")
const {Driver, Team} = require ("../db")

const getDriversApi = async () => {
    const response = await axios.get("http://localhost:5000/drivers")
    const {data} = response
    return data;
}

const getDriversBdd = async () =>{
    const data = await Driver.findAll({
        include: [
            {
                model: Team,
                through: {
                    attributes: [],
                }
            }
        ]
    });

    const cleanData = data.map(driver => ({
        id: driver.id,
        name: {
            forename: driver.name,
            surname: driver.lastname,
        },
        description: driver.description,
        image: {
            url: driver.image
        },
        nacionality: driver.nacionality,
        dob: driver.birthday,
        teams: driver.Team.map(team => team.name).join(", ")
    }))
    return cleanData
}

module.exports = getDriversApi, getDriversBdd;
