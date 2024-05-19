// 后端
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

// 创建 Express 应用
const app = express();

// 设置 EJS 视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用 body-parser 中间件
app.use(bodyParser.urlencoded({ extended: false }));

// 创建数据库连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456', // 请替换成你的数据库密码
    database: 'gzb'
});

// 处理根路径请求，显示搜索表单
app.get('/', (req, res) => {
    res.render('search', { results: null });
});

// 处理搜索请求
app.post('/search', (req, res) => {
    const { id, name, description } = req.body;
    let query = 'SELECT Nameid, name, shuoming FROM zmxy4 WHERE 1=1';
    const params = [];

    if (id) {
        query += ' AND Nameid LIKE ?';
        params.push('%' + id + '%');
    }
    if (name) {
        query += ' AND name LIKE ?';
        params.push('%' + name + '%');
    }
    if (description) {
        query += ' AND shuoming LIKE ?';
        params.push('%' + description + '%');
    }

    connection.query(query, params, (error, results) => {
        if (error) {
            res.send('查询出错：' + error.message);
            return;
        }
        res.render('search', { results });
    });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`ctrl点击打开链接 http://localhost:${PORT}/`);
});