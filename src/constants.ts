let url = 'http://localhost:4000'
if (process.env.NODE_ENV === 'production') {
  url = ''
}

export const API_URL = url