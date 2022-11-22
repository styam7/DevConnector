const express = require('express')
const connectDB = require('./config/db')
const app = express();
var cors = require('cors')
//connect database
connectDB();
app.use(cors())
//body parser
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))


const PORT = process.env.PORT || 5000 
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})