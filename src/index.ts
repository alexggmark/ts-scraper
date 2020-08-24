import { NewsController } from './controllers/news.controller'
import { NewsModel } from './models/news.model'
import { NewsView } from './views/news.view'

const app = new NewsController(new NewsModel(), new NewsView())

app.init()