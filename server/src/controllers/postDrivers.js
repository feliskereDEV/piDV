const { Drivers, Teams } = require('./../db');

const postDrivers = async (req, res) => {

    try {

        const { name, lastname, description, image, nationality, birthday, teams } = req.body;

        if (!teams?.length || !name || !lastname || !description || !image || !nationality || !birthday) {
            return res.status(400).json({ error: 'Incomplete Driver Data' });
        }

        const teamIds = await Promise.all(teams.map(async (teamName) => {
            const team = await Teams.findOne({ where: { name: teamName } });
            return team.id;
        }));

        const [newDriver,created] = await Drivers.findOrCreate({
            where : {
                name,
                lastname,
                description,    
                image,
                nationality,
                birthday
            }
        });

        await newDriver.setTeams(teamIds);

        return res.status(200).json(newDriver);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

}

module.exports = postDrivers;