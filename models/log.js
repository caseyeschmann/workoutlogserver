
// Property	Type
// description	STRING
// definition	STRING
// result	STRING
// owner_id	INTEGER

module.exports = (sequelize, DataTypes) => {
    const log = sequelize.define('log', {
        description: {
            type: DataTypes.string,
            allowNull: false,
        },
        definition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    })
    return log;
}