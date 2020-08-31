import * as http from 'http'
import domParser from './domParsing'

const routing = (req: http.IncomingMessage, res: http.ServerResponse): void => {
  if (req.url === '/bbc') {
    console.log('/bbc')
    http.get('http://localhost:3000/https://www.bbc.co.uk/news', (response: http.IncomingMessage) => {
      response.setEncoding('utf8')
      let body = ''
      response.on('data', (chunk: string) => {
        body += chunk
      })
      response.on('end', () => {
        console.log(domParser(body))
        // res.write(JSON.stringify(domParser(body)))
        res.end(JSON.stringify(domParser(body)))
      })
    }).on('error', (e) => {
      console.log(`Error: ${e.message}`)
    })
  }
}

export default routing