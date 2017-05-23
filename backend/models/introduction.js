module.exports = (seq, Sequelize) => seq.define('introduction', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    introduction: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    },
    constitution: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    },
    rule: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    freezeTableName: false
});
