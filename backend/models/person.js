module.exports = (seq, Sequelize) => seq.define('person', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    class: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    number: {
        type: Sequelize.TEXT,
        validate: {
            isNumeric: true
        },
        allowNull: false
    },
    phone: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    qq: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    }
}, {
    timestamps: true,
    paranoid: true,
    freezeTableName: false
});

