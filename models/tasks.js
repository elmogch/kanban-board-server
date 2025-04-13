const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Tasks = sequelize.define("tasks", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    stage: {
        type: DataTypes.INTEGER,
    },
}, {timestamps: false});

module.exports = Tasks;
