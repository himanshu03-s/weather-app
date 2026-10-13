import { condition } from './weather'
import { weatherTheme } from './weatherTheme'
const number = value => Number.isFinite(value) ? Math.round(value) : '—'
export default function InfoBox({ info }) {
  const { current, daily, place } = info
  const theme = weatherTheme(current)
  const [description, icon] = condition(current.weather_code)
  return <div className="grid gap-6 lg:grid-cols-2 lg:gap-3">
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-800 to-slate-950 p-7 text-white sm:p-10 lg:p-5">
      <img key={theme.image} src={theme.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/20" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border border-white/10" />
      <div className="relative flex flex-wrap items-start justify-between gap-5 lg:gap-2"><div><p className="mb-3 lg:mb-1 text-xs font-semibold tracking-[0.2em] text-sky-100">{theme.label}</p><h2 className="text-3xl lg:text-2xl font-semibold tracking-tight">{place.name}</h2><p className="mt-1 text-sm text-white/85">{[place.admin1, place.country].filter(Boolean).join(', ')}</p></div><span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-sky-100">Updated {current.time.slice(11, 16)} · local time</span></div>
      <div className="relative mt-8 lg:mt-3 flex items-center justify-between gap-4"><div><p className="text-7xl font-light tracking-tighter sm:text-8xl lg:text-6xl">{number(current.temperature_2m)}<span className="align-top text-4xl text-sky-100">°C</span></p><p className="mt-4 lg:mt-1 text-lg text-white">{description}</p><p className="mt-2 text-sm text-white/80">High {number(daily.temperature_2m_max[0])}° <span className="mx-2">/</span> Low {number(daily.temperature_2m_min[0])}°</p></div><span aria-hidden="true" className="text-7xl text-amber-200 drop-shadow-lg sm:pr-10 sm:text-9xl lg:pr-2 lg:text-7xl">{current.weather_code === 0 && !current.is_day ? '☾' : icon}</span></div>
    </section>
    <section aria-label="Weather details" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-3">{[
      ['Feels like', `${number(current.apparent_temperature)}°`, 'Apparent temperature', '◉'],
      ['Humidity', `${number(current.relative_humidity_2m)}%`, 'Relative humidity', '♧'],
      ['Wind speed', `${number(current.wind_speed_10m)} km/h`, 'At 10 metres', '≋'],
      ['Precipitation', `${current.precipitation ?? '—'} mm`, 'Current interval', '☂'],
    ].map(([title, value, caption, symbol]) => <div key={title} className="rounded-2xl border border-white/70 bg-white/75 backdrop-blur-md shadow-sm p-5 lg:p-3"><div className="mb-4 lg:mb-1 flex items-center justify-between gap-2 text-sm text-slate-500">{title}<span aria-hidden="true" className="text-xl text-sky-700">{symbol}</span></div><p className="text-2xl font-semibold tracking-tight">{value}</p><p className="mt-2 lg:mt-1 text-xs text-slate-400">{caption}</p></div>)}</section>
    <section className="rounded-3xl border border-white/70 bg-white/75 backdrop-blur-md shadow-sm p-6 sm:p-8 lg:col-span-2 lg:p-4"><div className="mb-6 lg:mb-2 flex items-center justify-between"><h2 className="text-lg font-semibold">The days ahead</h2><span className="text-xs text-slate-400">5-day forecast</span></div><div className="grid gap-3 sm:grid-cols-5 lg:gap-2">{daily.time.map((date, index) => {
      const [label, symbol] = condition(daily.weather_code[index])
      return <div key={date} className={`flex items-center justify-between gap-3 rounded-2xl p-4 sm:flex-col sm:text-center lg:flex-row lg:gap-2 lg:p-3 ${index === 0 ? 'bg-sky-100/80' : 'bg-slate-50'}`}><p className="w-16 text-sm font-semibold sm:w-auto">{index === 0 ? 'Today' : new Date(`${date}T12:00:00`).toLocaleDateString('en', { weekday: 'short' })}</p><span role="img" aria-label={label} className="text-3xl text-amber-500">{symbol}</span><div><p className="text-sm font-semibold">{number(daily.temperature_2m_max[index])}° <span className="ml-2 font-normal text-slate-400">{number(daily.temperature_2m_min[index])}°</span></p><p className="mt-1 text-xs text-sky-700">{daily.precipitation_probability_max[index] ?? '—'}% precip.</p></div></div>
    })}</div></section>
  </div>
}


