import { pool } from '../configs/connectDB';

// var express = require("express");
// const formidable = require("formidable");
// const fs = require("fs");
// var router = express.Router();
// var db = require("../configs/connectDB");
let getAllUsers =async(req,res)=>{

  const [rows, fields] = await pool.execute('SELECT * FROM products');
  return res.status(200).json({
  message:'Chao ban nhung',
  data: rows

  
  });
}

let createNewUser = async(req,res)=>{
    let {firstName,lastName,address,email} = req.body;
    if(!firstName || !lastName || !address || !email){
        return res.status(200).json({
            message: 'missing required params'
         })
    }
  await pool.execute('insert into users(firstName, lastName,address, email) values(?,?,?,?)',
  [firstName,lastName,address,email]);

 return res.status(200).json({
    message: 'Tao Ok'
 })
}
let updateUser = async(req,res)=>{
    let {firstName,lastName,address,email,id} = req.body;

    if(!firstName || !lastName || !address || !email || !id){
        return res.status(200).json({
            message: 'missing required params'
         })
    }
 
  await pool.execute('update users set firstName=?, lastName=?, email=?, address=? where id=?',
  [firstName,lastName,email,address,id])

    return res.status(200).json({
        message: 'Update Ok'
     })
}

let deleteUser = async(req,res)=>{
    let userId = req.params.id;
    if(!userId){
        return res.status(200).json({
            message: 'missing required params'
         })
    }

    await pool.execute('delete from users where id=?',[userId]);

    return res.status(200).json({
        message: 'Delete Ok'
     })
}

module.exports ={
getAllUsers, createNewUser, updateUser,deleteUser
}