const API_KEY = ""
const API_URL = "https://newsapi.org/v2/"

async function getFromApi(path: string) {
  const url = `${API_URL}/${path}&apiKey=${API_KEY}`

  try {
    const response = await fetch(`${url}`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    throw new Error("The information could not be obtained from the API.")
  }
}

export default getFromApi
