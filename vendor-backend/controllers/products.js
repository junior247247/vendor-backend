const express = require('express')

let Product = require('../models/products');
const io = require('../server');


const app = express()


io.on('connection',(client)=>{

  app.get('/products/:id', (req, res) => {
    let UserId = req.params.id;
    let from = req.query.from || 0
    let limit = req.query.limit || 20
  
  
    Product.List(UserId, from, limit).then((resp, err) => {
      if (err) return res.json({ ok: false, err }).status(400)
      res.json({ ok: true, data: resp }).status(200)
  
    })
  })
  app.get('/product/:id', (req, res) => {
    let id = req.params.id
    let UserId = req.query.UserId
    Product.ProductById(id, UserId).then((resp, err) => {
      if (err) return res.json({ ok: false, err }).status(400)
      res.json({ ok: true, data: resp }).status(200)
    })
  })
  
  app.post('/product', (req, res) => {
  
    let body = req.body;
    Product.create(body).then((resp, err) => {
      Product.getId().then(resp => {
        
        res.json({ id: resp.id }).status(200)
        io.emit('product',{data:''})
      })
  
    })
  })
  
  
  app.put('/product', (req, res) => {
    let body = req.body;
    Product.Update(body).then((resp, err) => {
       if(err)return res.json({ok:false,err}).status(400)
       io.emit('product',{data:''})
       res.json({ok:true,data:resp})
    
    })
  })
  


})




module.exports = app;