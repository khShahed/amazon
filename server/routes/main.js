const router = require('express').Router();
const Category = require('../models/category');

router.route('/categories')
.get((req, res, next) => {
    Category.find({}, (error, categories) => {
        res.json({
            success: true,
            message: "Request successful.",
            categories: categories
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

module.exports = router;