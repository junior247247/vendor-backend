const express = require('express');
const io = require('../server');
const app = express();
const User = require('../models/usuario')
const bcrypt=require('bcrypt')
let secret=''

const jwt=require('jsonwebtoken')

app.post('/auth',(req,res)=>{
        const{username,pass}=req.body
        User.Auth(username).then((data)=>{
            if(data.length<=0) return res.json({ok:false,message:'El Usuario incorrecto'})
            if(!bcrypt.compareSync(pass,data[0].password)) return res.json({ok:false,message:'Contraseña incorrecta'}).status(400)
            const{id,name,username}=data[0]
            res.json({ok:true,data:{id,name,username}}).status(200)
        })

   
})

app.post('/usuario', (req, res) => {
    let body = req.body
    User.Create(body).then((resp) => {
        User.UserId().then((resp) => {
            res.json({ ok: true, data: resp }).status(200)
        })
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})

app.put("/usuario/:id", (req, res) => {


})

app.get('/usuario', (req, res) => {



})

module.exports = app;