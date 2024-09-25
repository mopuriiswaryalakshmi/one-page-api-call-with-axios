const express = require('express')
const app = express()
const axios = require('axios')

cache = {}
const TTL = 20000

app.use('/:id', (req, res, next) =>{
    let reqObject = req.params.id
    console.log("reqObject---")
    console.log(reqObject)
    if(cache[reqObject] != undefined ) {
        cachedResult = cache[reqObject]
        console.log("cachedResult=======")
        console.log(cachedResult)
        if(Date.now() < cachedResult.expiry) {
            console.log("Data fetched from Cache---")
            console.log(cache[reqObject])
            return res.send(cachedResult.data)
        }   else {
            delete cache[reqObject]
        }
    }
    try {
        return axios.get(`https://groww.in/v1/api/stocks_data/v1/tr_live_prices/exchange/NSE/segment/CASH/${reqObject}/latest`)
        .then(result => {
            console.log("result from api------")
            console.log(result.data)
            cache[reqObject] = {
                data: result.data,
                expiry: Date.now() + TTL
            } 
            return res.send(result.data)
        })
        .catch(err => {
            console.log(err)
            return res.send(err)
        })
    } catch (err) {
        return res.send(err)
    }

})

app.listen(3300)