import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { sessionsModel } from '../dao/models/sessions.model.js'
import { hashPassword } from '../utils.js'
import { Strategy as GithubStrategy } from 'passport-github2'

// passport-local
passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      email = email.toLowerCase()
      const user = await sessionsModel.find({ email })
      if (user.length !== 0) {
        return done(null, false)
      }
      const hashNewPassword = await hashPassword(password)
      const newUser = { ...req.body, email: email.toLowerCase(), password: hashNewPassword }
      const newUserBD = await sessionsModel.create(newUser)
      done(null, newUserBD)
    }
  )
)

//passport-github
passport.use(
  'githubRegister',
  new GithubStrategy(
    {
      clientID: 'Iv1.788bd517e0a17c65',
      clientSecret: 'e533d2c4788bd97eb2507209f5ca71dfdf423566',
      callbackURL: 'http://localhost:8080/api/sessions/github',
    },
    async (accessToken, refreshToken, profile, done) => {
      const usuario = await sessionsModel.findOne({ email: profile._json.email })
      if (!usuario) {
        const nuevoUsuario = {
          first_name: profile._json.login.split(' ')[0],
          last_name: profile._json.login.split(' ')[1] || ' ',
          email: profile._json.email,
          age: 24,
          password: ' ',
        }
        const dbResultado = await sessionsModel.create(nuevoUsuario)
        done(null, dbResultado)
      } else {
        done(null, usuario)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
  const user = await sessionsModel.findById(_id)
  done(null, user)
})
