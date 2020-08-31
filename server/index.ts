import * as corsAnywhere from 'cors-anywhere'
import * as http from 'http'
import dotenv from 'dotenv'
import routing from './routing'
dotenv.config()

const port: number = 3000 || Number(process.env.PORT)
const serverPort = 4000

corsAnywhere.createServer({
  originWhitelist: [],
  // I need to figure out why this might be needed
  // requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, () => {
  console.log('Running CORS Anywhere on ' + port)
})

http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Request-Method', '*')
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
	res.setHeader('Access-Control-Allow-Headers', '*')
  routing(req, res)
}).listen(serverPort, () => {
  console.log('Running HTTP Server')
})
