module.exports = (seq, Sequelize) => seq.define('teacher', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    intro: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    },
    image: {
        type: Sequelize.TEXT
    },
    type: {
        type: Sequelize.ENUM('专业导师', '成长导师', '朋辈导师', '党员导师'),
        allowNull: false
    },
    class: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    phone: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },
    subject: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    achievement: {
        type: Sequelize.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
    paranoid: true,
    freezeTableName: false
});
