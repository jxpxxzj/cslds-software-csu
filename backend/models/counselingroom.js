module.exports = (seq, Sequelize) => seq.define('counselingRoom', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    place: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    time: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    freezeTableName: false
});
