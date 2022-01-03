const express = require("express")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()

const app = express()
const port = 4000

app.use(express.json())


const key = process.env.KEY

app.get("/", (req, res) => {
    res.send("hi")
})

const verify = (req, res, next) => {
    if (Object.keys(req.body).includes("token")) {
        var token = req.body.token
        try {
            var user = jwt.verify(token, key)
            req.body = { ...req.body, ...user }
            next()
        } catch (err) {
            res.send({ "msg": "Not found" })
        }
    }
    else {
        res.send({ "msg": "error" })
    }
}

app.get("/access", verify, (req, res) => {
    res.send(req.body)
})


app.get("/token", (req, res) => {
    var user = req.body.user
    var pass = req.body.pass
    var name = req.body.name
    const token = jwt.sign({ "user": user, "pass": pass, "name": name }, key)
    res.send(token)
})

app.listen(port, () => {
    console.log(`Listening at ${port}`)
})