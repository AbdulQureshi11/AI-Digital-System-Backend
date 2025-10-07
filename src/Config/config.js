import { Sequelize } from "sequelize";


const sequelize = new Sequelize('ai-website', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('Database Connected Sccuessfully'))
    .catch(() => console.log('Database Error'))


export default sequelize;