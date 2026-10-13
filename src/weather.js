export function condition(code) {
  if (code === 0) return ['Clear sky', '☀']
  if (code <= 2) return ['Partly cloudy', '🌤']
  if (code === 3) return ['Overcast', '☁']
  if ([45, 48].includes(code)) return ['Foggy', '🌫']
  if (code >= 95) return ['Thunderstorms', '⛈']
  if ([71, 73, 75, 77, 85, 86].includes(code)) return ['Snow', '❄']
  if (code >= 51) return ['Rain', '🌧']
  return ['Conditions unavailable', '☁']
}
async function request(url, signal) {
  let response
  try { response = await fetch(url, { signal }) }
  catch (error) {
    if (signal?.aborted) throw error
    throw new Error('Could not connect to the weather service. Check your internet connection and try again.')
  }
  if (!response.ok) throw new Error(response.status === 429 ? 'Too many requests. Please wait a moment and try again.' : 'The weather service is temporarily unavailable. Please try again.')
  const data = await response.json()
  if (data.error) throw new Error('The weather service could not complete this request. Please try again.')
  return data
}
export async function getWeather(city, signal) {
  const query = city.trim()
  if (query.length < 2) throw new Error('Enter at least two letters of a city name.')
  const locations = await request(`https://geocoding-api.open-meteo.com/v1/search?${new URLSearchParams({ name: query, count: '1', language: 'en', format: 'json' })}`, signal)
  const place = locations.results?.[0]
  if (!place) throw new Error(`No city found for “${query}”. Check the spelling or add a country name.`)
  const params = new URLSearchParams({ latitude: place.latitude, longitude: place.longitude, current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m', daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max', timezone: 'auto', forecast_days: '5' })
  const data = await request(`https://api.open-meteo.com/v1/forecast?${params}`, signal)
  if (!data.current || !data.daily?.time?.length) throw new Error('Weather data is incomplete. Please try again.')
  return { place, ...data }
}
