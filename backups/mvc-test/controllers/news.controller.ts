import { NewsModel } from '../models/news.model'
import { NewsView } from '../views/news.view'

export class NewsController<M, V> {
  constructor(private model: NewsModel, private view: NewsView) {
    this.view.bindTest(this.runTest)
  }

  runTest(): void {
    this.model.testFunc()
    console.log('RunTest')
  }

  init(): boolean {
    console.log('Working')
    return this.model !== null
  }
}