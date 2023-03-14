import { Router } from 'express'
import { sessionsModel } from '../dao/models/sessions.model.js'
import { comparePasswords } from '../utils.js'
import passport from 'passport'

const router = Router()

// registro y login passport

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/views/registerError',
    successRedirect: '/views/login',
    passReqToCallback: true,
})
)

router.post('/login', async (req, res) => {
    const password= req.body.password
    const email = req.body.email.toLowerCase()
    const user = await sessionsModel.find({ email })
    if (user.length !== 0) {
        const isPassword = await comparePasswords(password, user[0].password)
        if (isPassword) {
            for (const key in req.body) {
                req.session[key] = req.body[key]
            }
            req.session.logged = true
            if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                req.session.isAdmin = true
            } else {
                req.session.isAdmin = false
            }
            return res.redirect('/views/profile')
        }
    }

    return res.redirect('/views/loginError')
})

//login github

router.get('/loginGithub', passport.authenticate('githubRegister', { scope: ['user:email'] }))
router.get('/github', passport.authenticate('githubRegister', { failureRedirect: '/views/registerError' }), async (req, res) => {
    req.session.email = req.user.email
    res.redirect('/views/profile')
})

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) console.log(error);
        else res.redirect('/views/login')
    })
})
export default router
