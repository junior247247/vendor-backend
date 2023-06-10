const sql=require('mssql')
const config = require('../config/connect')



const Create=async(obj)=>{

    const pool= await sql.connect(config)
    const resilt= await pool.request().input('number',sql.VarChar(50),obj.number).input('name',sql.VarChar(200),obj.name).execute('createMunicipio')
    return resilt.recordset
}



const Update=async(obj,id)=>{
    const pool = await sql.connect(config)
    const result= await pool.request().input('id',sql.Int,id).input('number',sql.VarChar(50),obj.number).input('name',sql.VarChar(200),obj.name).execute('UpdateMunicipe')
    return result.rowsAffected;
}



const List=async(limte,from)=>{
    const pool= await sql.connect(config)
    const result= await pool.request().input('from',sql.Int,from).input('limit',sql.Int,limte).execute('showMunicipe')
    return result.recordset
}
/*MunicipeById
@id int*/

const GetById= async(id)=>{
    const pool= await sql.connect(config)
    const result= await pool.request().input('id',sql.Int,id).execute('MunicipeById')
    return result.recordset
}


module.exports={
    Create,
    List,
    Update,
    GetById
}