import * as jsonServer from 'json-server'
import {Express} from 'express'
import * as fs from 'fs'
import * as https from 'https'
const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
import {handleAuthentication} from './auth'

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one  used by JSON Server
server.use(jsonServer.bodyParser)

 server.post('/login', handleAuthentication)

// Use default router
server.use(router)

const options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
}

https.createServer(options, server).listen(3001, () => {
    console.log('JSON Server is running')
})