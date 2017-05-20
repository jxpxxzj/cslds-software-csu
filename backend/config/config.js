module.exports = {
    server: {
        port: '3000',
        sessionKey: 'cslds-software-csu'
    },
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'xf',
        port: 3306
    },
    init: {
        force: process.env.npm_config_forceSync || false,
        admin: {
            account: 'admin',
            password: 'admin888'
        },
        introduction: {
            introduction: 'introduction',
            constitution: 'constitution',
            rule: 'rule'
        }
    }
};
