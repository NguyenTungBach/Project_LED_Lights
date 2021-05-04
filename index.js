const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Nhúng thư viện mongoose
const Product = require('./models/product');
const Contact = require('./models/contact');
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

// LIST START
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

// tìm kiếm theo danh mục Category
app.get('/admin/product/list/category', function (req,res) {
    // res.send(req.query.category); // trả về yêu cầu category
    Product.find({category: req.query.category}).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('admin/product/category.ejs',{
            list: data
        });
    });
    // res.render('admin/product/list.ejs');
});

// tìm kiếm theo từ khóa key word
app.get('/admin/product/list/key-word', function (req,res) {
    // res.send(req.query.key); // trả về yêu cầu category
    Product.find({key: req.query.key}).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('admin/product/key-word.ejs',{
            list: data
        });
    });
    // res.render('admin/product/list.ejs');
});

// tìm kiếm theo thương hiệu trademark
app.get('/admin/product/list/trademark', function (req,res) {
    // res.send(req.query.trademark); // trả về yêu cầu category
    Product.find({trademark: req.query.trademark}).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('admin/product/trademark.ejs',{
            list: data
        });
    });
    // res.render('admin/product/list.ejs');
});

// Chi tiết sản phẩm
app.get('/admin/product/detail', function (req,res) {
    //res.send(req.query.id); // trả về yêu cầu id
    Product.findById(req.query.id).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('admin/product/detail.ejs',{
            item: data
        });
    });
    // res.render('admin/product/list.ejs');
});

// lấy sản phẩm cần sửa
app.get('/admin/product/edit', function (req,res) {
    //res.send(req.query.id); // trả về yêu cầu id
    Product.findById(req.query.id).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('admin/product/edit.ejs',{
            item: data
        });
    });
    // res.render('admin/product/list.ejs');
});

// sửa sản phẩm theo id rồi quay về trang chủ list
app.post('/admin/product/edit', function (req,res) {
    //res.send(req.query.id); // trả về yêu cầu id
    Product.findByIdAndUpdate(req.query.id, req.body).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
            res.redirect('/admin/product/list');
    });
    // res.render('admin/product/list.ejs');
});

// lấy sản phẩm cần xóa để hỏi
app.get('/admin/product/delete', function (req,res) {
    //res.send(req.query.id); // trả về yêu cầu id
    Product.findById(req.query.id).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('admin/product/delete.ejs',{
            item: data
        });
    });
    // res.render('admin/product/list.ejs');
});

// Xóa sản phẩm rồi về trang chủ list
app.post('/admin/product/delete', function (req,res) {
    //res.send(req.query.id); // trả về yêu cầu id
    Product.findByIdAndDelete(req.query.id).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.redirect('/admin/product/list');
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
        // res.send('Success');
        res.redirect('/admin/product/list');
    });
    // res.send(req.body);
});
// LIST END

//Bach
//CONTACT ADMIN START

// trả về trang contact
app.get('/client/contact', function (req,res) {
    res.render('client/page/client-contact.ejs');
});

// trả về thông báo gửi contact thành công
app.get('/client/contact/success', function (req,res) {
    res.render('client/page/client-contact-success.ejs');
});

// trả về những phần đã nhập trong contact từ client lên cho DATABASE
app.post('/client/contact', function (req,res) {
    const contact = new Contact (req.body);
    contact.save().then(function (){ // gủi lên database
        // res.send(req.body);
        // res.render(alert('Send Success! We will reply to you later'));
        res.redirect('/client/contact/success');
    });
});

// admin xem những contact gửi thông qua DATABASE
app.get('/admin/product/contact', function (req,res) {
    Contact.find().then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('admin/product/notifications.ejs',{
            contact: data
        });
    });
});

// Thông tin chi tiết của 1 contact
app.get('/admin/product/info-notifications', function (req,res) {
    //res.send(req.query.id); // trả về yêu cầu id
    Contact.findById(req.query.id).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('admin/product/info-notifications.ejs',{
            contact: data
        });
    });
    // res.render('admin/product/list.ejs');
});

//Tạo trang hỏi có xóa contact không
app.get('/admin/product/delete-contact', function (req,res) {
    //res.send(req.query.id); // trả về yêu cầu id
    Contact.findById(req.query.id).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('admin/product/delete-contact.ejs',{
            contact: data
        });
    });
    // res.render('admin/product/list.ejs');
});

//Trường hợp nếu là contact Đểu thì xóa rồi quay về trang danh sách contact
app.post('/admin/product/delete-contact', function (req,res) {
    //res.send(req.query.id); // trả về yêu cầu id
    Contact.findByIdAndDelete(req.query.id).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.redirect('/admin/product/contact');
    });
    // res.render('admin/product/list.ejs');
});

//CONTACT ADMIN END



//CLIENT  (phan nay danh cho Client)

//Bach
//CONTACT CLIENT START
// trả về trang contact
app.get('/client/contact', function (req,res) {
    res.render('client/page/client-contact.ejs');
});

//CONTACT CLIENT END


//Nguyen-Home
app.get('/',function (req,res){
    res.render('client/page/client-home.ejs')
});

//Nguyen-products
app.get('/client/products', function(req,res){
    // res.render('client/page/client-products');
    // res.send(req.query.id); // trả về yêu cầu id
    Product.find().then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
    // res.render('admin/product/list.ejs');
});

app.get('/client/products/sort-a-z', function(req,res){
    // res.render('client/page/client-products');
    // res.send(req.query.id); // trả về yêu cầu id
    Product.find().sort([['name', 1]]).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
    // res.render('admin/product/list.ejs');
});

app.get('/client/products/sort-z-a', function(req,res){
    // res.render('client/page/client-products');
    // res.send(req.query.id); // trả về yêu cầu id
    Product.find().sort([['name', -1]]).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
    // res.render('admin/product/list.ejs');
});

app.get('/client/products/sort-number-asc', function(req,res){
    // res.render('client/page/client-products');
    // res.send(req.query.id); // trả về yêu cầu id
    Product.find().sort([['price', 1]]).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
    // res.render('admin/product/list.ejs');
});

app.get('/client/products/sort-number-desc', function(req,res){
    // res.render('client/page/client-products');
    // res.send(req.query.id); // trả về yêu cầu id
    Product.find().sort([['price', -1]]).then(function (data){
        // res.send(data); // kiểm tra xem sản phẩm đã đc lấy về chưa
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
    // res.render('admin/product/list.ejs');
});

//Bach - CATEGORY
//CATEGORY CLIENT START
//CATEGORY Bulbs
app.get('/client/products/category/bulbs', function(req,res){
    Product.find({category: 'Bulbs'}).then(function (data){
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
});

//CATEGORY Spot Lights
app.get('/client/products/category/spot-lights', function(req,res){
    Product.find({category: 'Spot Lights'}).then(function (data){
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
});

//CATEGORY Decoration Lights
app.get('/client/products/category/decoration-lights', function(req,res){
    Product.find({category: 'Decoration Lights'}).then(function (data){
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
});

//CATEGORY Smart Lights
app.get('/client/products/category/smart-lights', function(req,res){
    Product.find({category: 'Smart Lights'}).then(function (data){
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
});

//CATEGORY CLIENT END

//Bach - TRADEMARK
//TRADEMARK CLIENT START
//TRADEMARK Coca
app.get('/client/products/trademark/coca', function(req,res){
    Product.find({trademark: 'Coca'}).then(function (data){
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
});

//TRADEMARK Pepsi
app.get('/client/products/trademark/pepsi', function(req,res){
    Product.find({trademark: 'Pepsi'}).then(function (data){
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
});

//TRADEMARK DC
app.get('/client/products/trademark/dc', function(req,res){
    Product.find({trademark: 'DC'}).then(function (data){
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
});

//TRADEMARK Mavel
app.get('/client/products/trademark/mavel', function(req,res){
    Product.find({trademark: 'Mavel'}).then(function (data){
        res.render('client/page/client-products.ejs',{
            list: data
        });
    });
});

//TRADEMARK CLIENT END

//Kien-Blog
app.get('/client/blog', function (req,res){
    res.render('client/page/client-blog.ejs')
})

app.listen(process.env.PORT || port, function () {
    console.log(`Đã chạy http://localhost:${port}`)
});

// app.listen(process.env.PORT, function () {
//     console.log(`ở cổng khác tại http://localhost:${port}`)
// })