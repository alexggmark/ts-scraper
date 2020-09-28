import * as http from 'http'
import * as path from 'path'
import * as fs from 'fs'
import dotenv from 'dotenv'
import routing from './routing'
dotenv.config()

const serverPort = Number(process.env.PORT) || 4000

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Request-Method', '*')
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')

  /**
   * Set up routes for API requests
   */
  routing(req, res)

  /**
   * This is unbelievably unelegant, but for the sake of getting this working
   * without Express and with Heroku limitations, this is quickest method
   * - Checks for each URL request and produces specific static content
   * - Manually checked to prevent overlap with API's routes
   */
  if (req.url == '/') {
    const readStream = fs.createReadStream(path.join(__dirname, '/src/dist/index.html'))
    res.writeHead(200, {'Content-type': 'text/html'})
    readStream.pipe(res)
  }

  if (req.url == '/style.css') {
    const readStream = fs.createReadStream(path.join(__dirname, '/src/dist/style.css'))
    res.writeHead(200, {'Content-type': 'text/html'})
    readStream.pipe(res)
  }

  if (req.url == '/bundle.js') {
    const readStream = fs.createReadStream(path.join(__dirname, '/src/dist/bundle.js'))
    res.writeHead(200, {'Content-type': 'text/html'})
    readStream.pipe(res)
  }

  if (req.url == '/favicon.ico') {
    const readStream = fs.createReadStream(path.join(__dirname, '/src/dist/favicon.ico'))
    res.writeHead(200, {'Content-type': 'text/html'})
    readStream.pipe(res)
  }

  if (req.url == '/505f876506e853fff8022de9e0384052.gif') {
    const readStream = fs.createReadStream(path.join(__dirname, '/src/dist/505f876506e853fff8022de9e0384052.gif'))
    res.writeHead(200, {'Content-type': 'text/html'})
    readStream.pipe(res)
  }
}).listen(serverPort, () => {
  console.log('Running HTTP Server ' + serverPort)
})
