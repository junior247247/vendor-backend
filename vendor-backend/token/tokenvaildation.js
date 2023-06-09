const jwt=require('jsonwebtoken')

let secret=''

const RequestToken=(req,res,next)=>{
    let token=(req.get('token'))?res.get('token'):''

    jwt.verify(token,secret,(err,decoded)=>{
        if(err)return res.json({ok:false,message:'token no valido'})
    })
    next()
}

