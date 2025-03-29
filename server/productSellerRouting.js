const express = require('express');
const router = express.Router();
const {ProductModel} = require('./schema/schema');


//Add new product
router.post('/proDet', async (req, res) => {
    const { 'product-id': id, img, name, price, description, 'start-time': start, 'end-time': end } = req.body;
    try {
      const newProduct = new ProductModel({
        _id: id,
        img: img || '',
        Name: name,
        price: parseFloat(price),
        Description: description,
        Start: new Date(start),
        End: new Date(end)
      });
      const result = await newProduct.save();
      res.status(201).json({ message: 'Product created successfully', product: result });
    } catch (err) {
      console.error('Error saving product:', err);
      res.status(500).json({ error: 'Failed to create product' });
    }
});

//fetch data from DB
router.get('/products', async (req, res) => {
    try {
      const products = await ProductModel.find({});
      res.status(200).json(products);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
});

module.exports = router;