import { Router } from "express";
import { auth, isLogged } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/register',isLogged,(req,res)=>{
    res.render('register')
})

router.get('/registerError',(req,res)=>{
    res.render('registerError')
})

router.get('/login',isLogged,(req,res)=>{
    res.render('login')
})

router.get('/profile',auth,(req,res)=>{
    res.render('profile',{email:req.session.email, role:req.session.isAdmin})
})

router.get('/loginError',(req,res)=>{
    res.render('loginError')
})
export default router