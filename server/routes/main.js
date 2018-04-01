const router = require('express').Router();
const Category = require('../models/category');

router.route('/categories')
.get((req, res, next) => {
    Category.find({}, (error, all) => {
        res.json({
            success: true,
            message: "Request successful.",
            categories: all
        });
    })
})
.post((req, res, next) => {
    let category = new Category();
    category.name = req.body.category;
    category.save();
    res.json({
        success: true,
        message: "Category successfully saved."
    });
});

router.get('/categories/:id', (req, res, next) => {
    const resultPerPage = 10;
    Product.find({categoryId: req.param.id})
        .populate('category')
        .exec((err, products)=>{
            Product.count({categoryId:req.params.id}, (err, totalProducts) => {
                res.json({
                    success: true,
                    message: 'successful',
                    products: products,
                    categoryName: products[0].category.name,
                    totalProducts: totalProducts,
                    pages: Math.ceil(totalProducts/ resultPerPage)
                });
            });
        });
});

module.exports = router;