const express=require('express')
const { List, Create, GetById, Update } = require('../models/municipe')
const io = require('../server')
const app=express()


app.get('/municipe',(req,res)=>{
    const limite=req.query.limite || 20
    const from =req.query.from || 0
    List(limite,from).then((resp,err)=>{
        if(err)return res.json({ok:false,err}).status(400)
            res.json({ok:true,data:resp}).status(200)
    })

})
app.get('/municipe/:id',(req,res)=>{
    const id=req.params.id
    GetById(id).then((resp,err)=>{
        if(err)return res.json({ok:false,err}).status(400)
        res.json({ok:true,data:resp})
    })
})


app.post('/municipe',(req,res)=>{
    const  body=req.body
    Create(body).then((resp,err)=>{
        if(err)return res.json({ok:false,err}).status(400)
            io.emit('municipe',{data:''})
            res.json({ok:true,data:resp}).status(200)
    })
})


app.put('/municipe/:id',(req,res)=>{
    const body=req.body
    const id=req.params.id
    Update(body,id).then((resp,err)=>{
        if(err)return res.json({ok:true,err}).status(400)
            res.json({ok:true,data:resp}).status(200)
            io.emit('municipe',{data:''})
    })
})





module.exports=app;