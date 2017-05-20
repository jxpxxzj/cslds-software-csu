module.exports = (seq, Sequelize) => seq.define('course', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    course: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    place: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    freezeTableName: false
});
