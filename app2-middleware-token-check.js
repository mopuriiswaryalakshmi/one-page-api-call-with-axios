const express = require('express')
const app = express()
app.use(express.json())

/* custom middleware when token is present call api api/sumIf not return error*/
const checkToken = (req, res, next) => { 
    const token = req.headers['authorization']
    if(!token) { 
        return res.status(401).json({error: "Unauthorized Token, Please Check"}) 
    }
    next()
}

/* input [1, 2, 3] - GET -Accept array of number outpur response 6*/
app.get( '/api/sum', checkToken, (req, res) => { 
    const {numbers} = req.body 
    console.log(req.body.numbers)
    const sum = numbers.reduce((acc, num) => acc+num, 0)
    res.json({sum}) // res.json("Hi")
})

/* PORT Listen */
const PORT = 3000
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`)})
