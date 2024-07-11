const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongodb = require('./utilities/database')
const passport = require('passport')
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy

const app = express()
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json())
app.use(bodyParser.json())

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
    next()
})

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'] }))
app.use(cors({ origin: '*' }))

// Routes
app.use('/', require('./routes/index'))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    // console.log('GitHub profile:', profile)
    return done(null, profile)
}))

passport.serializeUser((user, done) => {
    // console.log('Serialize user:', user)
    done(null, user)
})

passport.deserializeUser((user, done) => {
    // console.log('Deserialize user:', user)
    done(null, user)
})

app.get('/', (req, res) => {
    const message = req.session.logoutMessage
    delete req.session.logoutMessage

    if (message) {
        res.send(message)
    } else if (req.session.user) {
        const displayName = req.session.user.displayName || req.session.user.username
        // console.log('After login:', req.session)
        res.send(`Logged in as ${displayName}`)
    } else {
        res.send('Store API')
    }
})

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}), (req, res) => {
    req.session.user = req.user
    // console.log('Authenticated user:', req.user)
    res.redirect('/api-docs')
})

// Handling Errors
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error."
    res.status(err.statusCode).json({
        message: err.message
    })
})

// Initialize MongoDB and start the server
mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}`)
        })
    }
})