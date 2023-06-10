const sql=require('mssql')
const config = require('../config/connect')

//const bcrypt=require('bcrypt')

const Create= async(body)=>{
    const {pass,RoleId,name,username} =body;
   const pool= await sql.connect(config)
   const result= await pool.request()
        //.input('password',sql.VarChar(200),bcrypt.hashSync(pass,10)) 
        .input('idRole',sql.Int,RoleId)
        .input('name',sql.VarChar(50),name)
        .input('username',sql.VarChar(50),username)

        .execute('creteUser')

        return result.returnValue;
}

const Auth= async(username)=>{
    const pool= await sql.connect(config)
    const result= await pool.request()
    .input('username',sql.VarChar(50),username)
    .execute('Auth')
    return result.recordset
}


const UserId=async()=>{
    const pool= await sql.connect(config)
    const result=await pool.request().execute('UserId')
    return result.recordset
}

module.exports={
    Create,
    UserId,
    Auth
}