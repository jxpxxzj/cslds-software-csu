module.exports = (seq, Sequelize) => seq.define('research', {
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
    address: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});
