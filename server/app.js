const express = require('express')
const app = express()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtexpress = require('express-jwt');
const  cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const  cors = require('cors');
 
dotenv.config();


app.use(cors()); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser());


// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use(jwtexpress({
    secret: process.env.JWT_KEY,
    credentialsRequired: false,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
          // Handle token presented as a Bearer token in the Authorization header
          return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
          // Handle token presented as URI param
          return req.query.token;
        } else if (req.cookies && req.cookies.token) {
          // Handle token presented as a cookie parameter
          return req.cookies.token;
        }
        // If we return null, we couldn't find a token.
        // In this case, the JWT middleware will return a 401 (unauthorized) to the client for this request
        return null; 
      }
  }));
  
app.get('/protected',jwtexpress({secret: process.env.JWT_KEY}), (req, res) => {
    res.json(req.user);
});
  

const generateAuthToken = async (user) => {
    // Generate an auth token for the user
    const token = jwt.sign({id: 123}, process.env.JWT_KEY)
    return token
}

app.post('/login', async(req, res) => {
    //Login a registered user
    try {
        const { login, password } = req.body
        const user = {login, password }
        if (!user || login != "admin" || password != "admin" ) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await generateAuthToken(user)
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

  
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })