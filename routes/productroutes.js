const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Product =require('../models/Product')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('productsale', {title: 'Farm Manager login'})
});

router.post('/', async(req,res)=>{
    try{
        const product = new Product(req.body);
        await product.save()
        res.redirect('/productlist/lists')
        console.log(req.body)
    }
    catch(err){
        res.status(400).render('productsale', {title:"Products ", routeName:"Products"})
    }
})

router.get('/lists',async (req, res) => {
    try{
        let product = await Product.find();
        res.render('productlist',{products:product, title:'Product details'})

    }
    catch(err){
        console.log(err)
        res.send('failed to retrive manager details')
    }
});
router.get('/edit/:id', (req, res)=>{
    Product.findById(req.params.id, (err, product)=>{
      res.render('edit_product', {
        title: '',
        product: product
      });
    });
  });
// update submit new product 
router.post('/edit/:id', (req, res)=>{
    let product = {};
    product.name = req.body.name;
    product.price = req.body.price;
    
  
    let query = {_id: req.params.id};
  
    Product.update(query, product, (err)=>{
      if(err) {
        console.error(err);
        return;
      } else {
        req.flash('success', 'Product Updated');
        res.redirect('/');
      }
    })
  });
  router.get('/editproduct', (req, res) => {
    res.render('edit_product', {title: 'Farm Manager Register'})
});



module.exports = router