const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Nhúng thư viện mongoose
const Product = require('./models/product');
const app = express();
const port = 3000;

//Thực hiện kết nối đến database mongoDB
mongoose.connect('mongodb+srv://test:123@cluster0.eecvk.mongodb.net/Project_Led_Lights?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static("public")); // đã link rồi thì đừng ghi đường dẫn có cái này
// app.use(express.static("public/assets"));
app.set('view engine', 'ejs'); // sử dụng ejs làm view engine chính
app.set('views', 'view'); // sử dụng thư mục views để chứa các file ejs

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// app.get('/demo-db', function (req,res) {
//     const p1 = new Product({
//         name: 'Product 1',
//         description: 'Test product 1',
//         price: 1000,
//         thumbnail: 'testz'
//     });
//     // p1.save().then(() => console.log('meow')); // Gửi lệnh insert vào bảng
//     p1.save().then(function (){ // Lệnh insert vào bảng, then đảm bảo save đc thành công thì đoạn code tiếp mới đc thực thi
//         res.send('Save thành công');
//     });
//     // p1.find().then(function (data){ // Lệnh truy vấn, then đảm bảo save đc thành công thì đoạn code tiếp mới đc thực thi
//     //     res.send(data);
//     // });
// });

// trả về dashboard
app.get('/admin/product/dashboard', function (req,res) {
    res.render('admin/product/dashboard.ejs');
});

// trả về list, tức là lấy danh sách sản phẩm
app.get('/admin/product/list', function (req,res) {
    Product.find().then(function (data){
       // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về từ form chưa
        res.render('admin/product/list.ejs',{
            list: data
        });
    });
    // res.render('admin/product/list.ejs');
});

// trả về form
app.get('/admin/product/create', function (req,res) {
    res.render('admin/product/form.ejs');
});

// trả về những phần đã nhập trong form
app.post('/admin/product/create', function (req,res) {
    const create_product = new Product (req.body);
    create_product.save().then(function (){
        res.send('Success');
    });
    // res.send(req.body);
});

app.listen(port, function () {
    console.log(`Đã chạy http://localhost:${port}`)
})