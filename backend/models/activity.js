module.exports = (seq, Sequelize) => seq.define('activity', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    freezeTableName: false
});
