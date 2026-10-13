// Condition imagery takes priority over temperature so rainy days never look sunny.
const photo = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`
const themes = {
  hot: { label: 'Sun-soaked skies', image: photo('photo-1507525428034-b723cf961d3e'), background: 'from-orange-100 via-amber-50 to-sky-100' },
  mild: { label: 'A breath of fresh air', image: photo('photo-1470071459604-3b5ec3a7fe05'), background: 'from-sky-200 via-blue-50 to-emerald-50' },
  cold: { label: 'A crisp, cool day', image: photo('photo-1418985991508-e47386d96a71'), background: 'from-blue-200 via-slate-100 to-cyan-50' },
  rain: { label: 'Rain on the horizon', image: photo('photo-1534274988757-a28bf1a57c17'), background: 'from-slate-300 via-blue-100 to-slate-100' },
  snow: { label: 'A world of winter', image: photo('photo-1418985991508-e47386d96a71'), background: 'from-cyan-100 via-white to-blue-200' },
  cloudy: { label: 'Under a cloudy sky', image: photo('photo-1501630834273-4b5604d2ee31'), background: 'from-slate-200 via-sky-100 to-blue-50' },
}
export function weatherTheme(current) {
  if (!current) return themes.mild
  const code = current.weather_code
  if ([71, 73, 75, 77, 85, 86].includes(code)) return themes.snow
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) return themes.rain
  if ([3, 45, 48].includes(code)) return themes.cloudy
  if (current.temperature_2m <= 10) return themes.cold
  if (current.temperature_2m >= 28) return themes.hot
  return themes.mild
}
