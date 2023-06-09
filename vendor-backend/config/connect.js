
/*
const config = {
    server: '192.168.1.7',
    database: 'Vendor',
    user: 'jr',
    password: '147852369',
    options: {
      encrypt: false // Si se utiliza una conexión segura
    }
  };*/


  const config = {
    server: 'junior247247.database.windows.net',
    database: 'Vendor',
    user: 'server',
    password: 'Junior221089',
    options: {
      encrypt: true,
      trustServerCertificate:true
    }
  };


  module.exports=config;