const express = require('express');
const jwt = require('jsonwebtoken') 
const user = express.Router();
const db = require('../config/database')

user.post("/login",async(req,res,next)=>{
    const {email, password} = req.body
    const query = `SELECT * FROM usuarios WHERE email = '${email}' AND password = '${password}';`
    
    const rows = await db.query(query)

    if(email&&password){
        if(rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "node")
            return res.status(200).json({code:200,message:token,ok:true})
        }else{
            return res.status(200).json({code:401,message:"Usuario y/o contraseña incorrectos",ok:false})
        }
    }
    return res.status(500).json({code:500, message:"Campos incompletos",ok:false})
})

user.post("/signin",async(req,res,next)=>{
    const {nombre, email, password} = req.body
    if(email&&password&&nombre){
        let query = `INSERT INTO usuarios (email, password, nombre) VALUES ('${email}', '${password}', '${nombre}');`
    
        const rows = await db.query(query)
        if(rows.affectedRows == 1){
			return res.status(201).json({code:201,message:"Empleado registrado correctamente",ok:true})
		}
		return res.status(500).json({code:500,message:"Ocurrió un error",ok:false})
	}
	return res.status(500).json({code:500,nessage:"Campos incompletos",ok:false})
})

user.get("/",async(req,res,next)=>{
    const query = "SELECT * FROM usuarios";
    try{
        const rows = await db.query(query);
        return res.status(200).json({code:200, message:rows})
    } catch(e){
        console.log(e)
        return res.status(500).json({code:500, message:"NO SE PUDO"})
    }
})

module.exports = user