module.exports = (seq, Sequelize) => seq.define('application', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    person: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('辅导室使用申请', '个人自习申请', '个人一对一辅导申请', '课程辅导申请', '发展辅导申请'),
        allowNull: false
    },
    detail: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    state: {
        type: Sequelize.ENUM('申请中', '已阅'),
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    freezeTableName: false
});
