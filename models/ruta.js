const sql=require('mssql')
const config = require('../config/connect')



const UpdateMunicipio=async(id,municipioId)=>{
    let pool= await sql.connect(config)
    let result= await pool.request()
        .input('id',sql.Int,id)
        .input('municipioId',sql.Int,municipioId)
        .execute('UpdateMunicipio')

        return result.rowsAffected
}

const CreateRutaAndMunicipio= async(RoutId,MunicipeId)=>{
    let pool= await sql.connect(config)
    let result= await pool.request()
                .input('RutaId',sql.Int,RoutId)
                .input('MunicipioId',sql.Int,MunicipeId)
                .execute('CreateRutaAndMunicipio')

          return result.rowsAffected      
}

const Update=async(body)=>{
    let pool= await sql.connect(config)
    const {id,name,adress,contact,propietario,contactoPropietario,limiteCretido,lat,long,location}=body;
    let resilt= await pool.request()
        .input('id',sql.Int,id)
        .input('name',sql.VarChar(50),name)
        .input('adress',sql.VarChar(50),adress)
        .input('contact',sql.VarChar(50),contact)
        .input('propiterio',sql.VarChar(50),propietario)
        .input('contactPropietario',sql.VarChar(50),contactoPropietario)
        .input('limiteCredito',sql.Decimal(18,2),limiteCretido)
        .input('location',sql.VarChar(300),location)
        .input('lat',sql.VarChar(200),lat)
        .input('long',sql.VarChar(200),long).execute('UpdateRuta')

        return resilt.rowsAffected;
      
}






const Create=async(body)=>{
    let pool= await sql.connect(config)
    const {name,adress,contact,propietario,contactoPropietario,limiteCretido,lat,long,location}=body;
    let resilt= await pool.request()
        .input('name',sql.VarChar(50),name)
        .input('adress',sql.VarChar(50),adress)
        .input('contact',sql.VarChar(50),contact)
        .input('propiterio',sql.VarChar(50),propietario)
        .input('contactPropietario',sql.VarChar(50),contactoPropietario)
        .input('limiteCredito',sql.Decimal(18,2),limiteCretido)
        .input('location',sql.VarChar(300),location)
        .input('lat',sql.VarChar(200),lat)
        .input('long',sql.VarChar(200),long).execute('CreateRuta')

        return resilt.rowsAffected;
      
}


const List= async(from,limit)=>{
    let pool= await sql.connect(config)
    let result= await pool.request()
        .input('from',sql.Int,from)
        .input('limit',sql.Int,limit)
        .execute('ShowRoutes')

       return result.recordsets[0]
}

const GetId=async()=>{
    let pool=await sql.connect(config)
    let result=await pool.request().execute('RutaId')
    return result.recordset[0];
}

const GetById=async(id)=>{
    let pool = await sql.connect(config)
    let result=await pool.request().input('id',sql.Int,id).execute('getRutaById')
    return result.recordset[0]
}

const getLimiteOfCredit=async(id)=>{
    const pool=await sql.connect(config)
    const result=await pool.request()
    .input('clientId',sql.Int,id)
    .execute('sumarLimitesDeCliente')
    return result.recordset[0]
}


module.exports={
    Create,
    GetId,
    CreateRutaAndMunicipio,
    List,
    GetById,
    Update,
    UpdateMunicipio,
    getLimiteOfCredit
}