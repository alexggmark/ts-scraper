import {
  API_URL
} from '../constants/index'
import { ApiResponse } from '../interfaces/apiResponse'

export const sortApiResponse = (array: ApiResponse[]): ApiResponse[] => {
  let current = array.length
  let randomIndex
  let temporaryVal

  while (current !== 0) {
    randomIndex = Math.floor(Math.random() * current)
    current -= 1
    temporaryVal = array[current]
    array[current] = array[randomIndex]
    array[randomIndex] = temporaryVal
  }

  return array
}

export const webScraper = async (): Promise<string> => {
  try {
    const scrapeBBC = await fetch(`${API_URL}/bbc`)
    const responseBBC = await scrapeBBC.json()
    const scrapeGuardian = await fetch(`${API_URL}/guardian`)
    const responseGuardian = await scrapeGuardian.json()

    const response = [...responseGuardian, ...responseBBC]
    return JSON.stringify(sortApiResponse(response))
  } catch (err) {
    console.log(err)
    return new Promise(reject => reject)
  }
}

export const truncateString = (text: string, limit: number): string => {
  return text.slice(0, limit)
}
