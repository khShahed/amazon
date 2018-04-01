const router = require('express').Router();
const multer = require('multer');
const Product = require('../models/product');
const checkJWT = require('../middlewares/check-jwt');

const faker = require('faker');

const upload = multer({
    destination: function (req, file, callback) {
        callback(null, '../files/img/product/');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now().toString() + file.originalname);
    }
});

router.route('/products')
    .get(checkJWT,  (req, res, next) => {
        Product.find({owner: req.decoded.user._id})
            .populate('owner')
            .populate('category')
            .exec((err, products) => {
                if (products){
                    res.json({
                        success: true,
                        message: 'Products',
                        products: products
                    });
                }
            });
    })
    .post([checkJWT, upload.single('product_picture')], (req, res, next) => {
        let product = new Product();
        product.owner = req.decoded._id;
        product.category = req.body.categoryId;
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        product.image = req.protocol + "://" + req.host + "/" + req.file.path;
        product.save();

        res.json({
            success: true,
            message: 'Successfully Added the product.'
        });
    });

// for testing
router.get('/faker/test', (req, res, next) => {
    for (i = 0; i<20; i++){
        let product = new Product();
        product.owner = '5ac06a9a8e150d283c56c396';
        product.category = "5ac06ec8a0b73e1810011cda";
        product.image = faker.image.cats();
        product.name = faker.commerce.productName();
        product.description = faker.lorem.words();
        product.price = faker.commerce.price();
        product.save();
    }
    res.json({
        success: true,
        message: '20 product added'
    });
});

module.exports = router;