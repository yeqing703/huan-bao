/*const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5502;
const fs = require('fs');
const cors = require('cors');
const serveIndex = require('serve-index');

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

// 提供静态资源
app.use("/", serveIndex(path.join(__dirname, "public"), { icons: true })); //还有这句
app.use("/", express.static(path.join(__dirname, "public")));


// 处理POST请求
app.post('/public', (req, res) => {
    const { uname, umail, uaddress } = req.body;
    if (!uname || !umail || !uaddress) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    const dataDir = path.join(__dirname, './public/data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const fileName = uname + '.json';
    const filePath = path.join(__dirname, 'public', 'data', `${uname}.json`);


    fs.writeFile('./public/data/' + req.body.uname + '.json', JSON.stringify(req.body), (err) => {
        if (err) {
            console.log('保存文件失败')
            res.json({
                "errno": 1,
                "msg": 'try later'
            })
        } else {
            console.log('保存文件成功')
            res.json({
                "errno": 0,
                "msg": 'register ok'
            })
        }
    })
    res.send('Registration successful');
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
const express = require('express');
const app = express();


app.get('/public?', (req, res) => {
    const uname = req.query.uname;
    const umail = req.query.umail;
    const uaddress = req.query.uaddress;

    if (!uname || !umail || !uaddress) {
        return res.status(400).json({ success: false, message: '所有字段都是必填项' });
    }

    // 假设保存成功
    const saveResult = false; // 这里应该是实际的保存逻辑

    if (saveResult) {
        res.json({ success: true, message: '数据保存成功' });
    } else {
        res.json({ success: false, message: '数据保存失败' });
    }
    // 返回JSON响应
    res.json({ success: saveResult, message: saveResult ? '数据保存成功' : '数据保存失败' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: '服务器内部错误' });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});