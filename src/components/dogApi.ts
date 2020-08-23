interface ApiResponse {
  message: string
  status: string
}

export default class DogApi  {
  limit: number
  element: string
  private apiUrl = 'https://dog.ceo/api/breeds/image/random'

  constructor(limit: number, element: string) {
    this.limit = limit
    this.element = element
  }

  updateDom(apiRes: ApiResponse): void {
    const imgElement = document.createElement('img')
    imgElement.setAttribute('src', apiRes.message)
    this.selectElement.append(imgElement)
  }

  get selectElement(): Element {
    return document.querySelector(this.element)
  }

  async fetchApi<T>(): Promise<T> {
    try {
      const response = await fetch(this.apiUrl)
      const body = await response.json()
      return body
    } catch(err) {
      console.log(err)
    }
  }

  async init(): Promise<void> {
    const response = await this.fetchApi<ApiResponse>()
    this.updateDom(response)
    return
  }
}
