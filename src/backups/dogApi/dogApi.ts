interface ApiResponse {
  message: string
  status: string
}

export default class DogApi  {
  limit: number
  element: string
  button: string
  private apiUrl = 'https://dog.ceo/api/breeds/image/random'

  constructor(limit: number, element: string, button: string) {
    this.limit = limit
    this.element = element
    this.button = button
  }

  updateDom(apiRes: ApiResponse): void {
    while (this.imageElement.firstChild) {
      this.imageElement.removeChild(this.imageElement.lastChild)
    }
    const imgElement = document.createElement('img')
    imgElement.className = 'dog-image'
    imgElement.setAttribute('src', apiRes.message)
    this.imageElement.append(imgElement)
  }

  get imageElement(): Element {
    return document.querySelector(this.element)
  }

  get updateElement(): Element {
    return document.querySelector(this.button)
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

  setEventListeners(): void {
    this.updateElement.addEventListener('click', () => {
      this.fetchAndUpdateDom()
    })
  }

  async fetchAndUpdateDom(): Promise<void> {
    const response = await this.fetchApi<ApiResponse>()
    this.updateDom(response)
  }

  init(): void {
    this.fetchAndUpdateDom()
    this.setEventListeners()
    return
  }
}
