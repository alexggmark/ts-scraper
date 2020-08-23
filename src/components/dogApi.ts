interface ApiResponse {
  message: string
  status: string
}

export default class DogApi  {
  limit: number
  private apiUrl = 'https://dog.ceo/api/breeds/image/random'

  constructor(limit: number) {
    this.limit = limit
  }

  async fetchApi(): Promise<Response> {
    return await fetch(this.apiUrl)
      .then((res) => {
        return res.json()
      })
  }

  async doggy(): Promise<Response> {
    return await this.fetchApi()
  }
}
