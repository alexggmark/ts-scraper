import * as corsAnywhere from 'cors-anywhere'
// import * as http from 'http'
import * as https from 'https'
import * as fs from 'fs'
import dotenv from 'dotenv'
import routing from './routing'
dotenv.config()

const isDev = process.env.NODE_ENV !== 'production'
const port: number = Number(process.env.PORT) || 3000
const serverPort = 4000

const options = isDev ? {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.cert')
} : {};


corsAnywhere.createServer(options, {
  originWhitelist: [],
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, () => {
  console.log('Running CORS Anywhere on ' + port)
})

https.createServer(options, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Request-Method', '*')
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
	res.setHeader('Access-Control-Allow-Headers', '*')
  routing(req, res)
}).listen(serverPort, () => {
  console.log('Running HTTP Server ' + serverPort)
})
