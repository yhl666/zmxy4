const mysql = require('mysql2');

// 创建数据库连接
const connection = mysql.createConnection({
    host: 'localhost', // 数据库主机名
    user: 'root', // 数据库用户名
    password: '123456', // 数据库密码
    database: 'gzb' // 数据库名称
});

// 尝试连接数据库
connection.connect(function(err) {
    if (err) {
        console.error('连接数据库失败: ' + err.stack);
        return;
    }

    console.log('成功连接到 MySQL 数据库');
});

// 关闭数据库连接
connection.end();