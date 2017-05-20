module.exports = (seq, Sequelize) => seq.define('introduction', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    introduction: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    constitution: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    rule: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    freezeTableName: false
});
