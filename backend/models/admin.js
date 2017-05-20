module.exports = (seq, Sequelize) => seq.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    account: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    freezeTableName: false
});
