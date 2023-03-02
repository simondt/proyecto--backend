import { Router } from 'express'
import { sessionsModel } from '../dao/models/sessions.model.js'
const router = Router()

/*
router.get('/login', async(req,res) =>{
    res.render('login')
})*/

router.post('/register', async (req, res) => {
    const { email, password } = req.body
    const userExists = await sessionsModel.find({ email, password })
    if (userExists.length!==0) {
        res.redirect('/views/registerError')
    } else {
        await sessionsModel.create(req.body)
        res.redirect('/views/login')
    }
})

router.post('/login', async (req, res) => {

    const { email, password } = req.body
    const user = await sessionsModel.find({ email, password })
    if (user.length!==0) {
        for (const key in req.body) {
            req.session[key] = req.body[key]
        }
        req.session.logged = true
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.isAdmin = true
        } else {
            req.session.isAdmin = false
        }
        res.redirect('/realtimeproducts')
    } else {
        res.redirect('/views/loginError')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) console.log(error);
        else res.redirect('/views/login')
    })
})
export default router
