const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const app = express();
const port = 3000;


app.use(express.static("public")); // đã link rồi thì đừng ghi đường dẫn có cái này
// app.use(express.static("public/assets"));
app.set('view engine', 'ejs'); // sử dụng ejs làm view engine chính
app.set('views', 'view'); // sử dụng thư mục views để chứa các file ejs


// const Cat = mongoose.model('Cat', {
//     name: String,
//     desciption: String,
//     age: Number
// });

// app.get('/demo-db', function (req,resp) {
//     const cat = new Cat({
//         name: 'Yasuo',
//         description: 'gank team',
//         age: '2'
//     });
//     cat.save().then(function (){
//         resp.send('hello db')
//     })
// });
/////
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));// giúp chúng ta parse dữ liệu từ form
// parse application/jason
app.use(bodyParser.json());

app.get('/admin/product/dashboard', function (req,res) {
    res.render('admin/product/dashboard.ejs');
});

app.get('/admin/product/list', function (req,res) {
    res.render('admin/product/list.ejs');
});

app.get('/admin/product/form', function (req,res) {
    res.render('admin/product/form.ejs');
});


app.listen(port, function () {
    console.log(`Đã chạy http://localhost:${port}`)
})