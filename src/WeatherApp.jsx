import { useEffect, useRef, useState } from 'react'
import SearchBox from './SearchBox'
import InfoBox from './InfoBox'
import { getWeather } from './weather'
import { weatherTheme } from './weatherTheme'
export default function WeatherApp() {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const activeRequest = useRef(null)
  async function search(city) {
    activeRequest.current?.abort()
    const controller = new AbortController()
    activeRequest.current = controller
    setLoading(true)
    setError('')
    setInfo(null)
    const timeout = setTimeout(() => controller.abort('timeout'), 15000)
    try {
      const result = await getWeather(city, controller.signal)
      if (!controller.signal.aborted) setInfo(result)
    } catch (err) {
      if (!controller.signal.aborted) setError(err.message)
      else if (controller.signal.reason === 'timeout') setError('The request took too long. Please try again.')
    } finally {
      clearTimeout(timeout)
      if (activeRequest.current === controller) setLoading(false)
    }
  }
  useEffect(() => () => activeRequest.current?.abort(), [])
  const theme = weatherTheme(info?.current)
  return <div className={`min-h-screen min-w-80 bg-gradient-to-br ${theme.background} font-['Segoe_UI',Arial,sans-serif] text-slate-800 selection:bg-teal-200 selection:text-teal-900 [&_button]:cursor-pointer [&_button:focus-visible]:outline-3 [&_button:focus-visible]:outline-teal-600 [&_button:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-3 [&_a:focus-visible]:outline-teal-600 [&_a:focus-visible]:outline-offset-4`}>
    <header className="border-b border-white/60 bg-white/65 backdrop-blur-xl"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10 lg:py-3"><a href="./" className="flex items-center gap-3 text-xl font-bold tracking-tight"><span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-700 text-2xl text-amber-200">☀</span>Himanshu <span className="font-normal text-slate-400">Weather</span></a><span className="hidden text-xs tracking-widest text-slate-500 sm:block">A LITTLE CLARITY, EVERY DAY</span></div></header>
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-14 lg:py-4">
      <div className="mb-8 lg:mb-4"><p className="mb-3 lg:mb-1 text-xs font-bold tracking-[0.22em] text-sky-700">YOUR DAILY OUTLOOK</p><h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-3xl">A world of weather.<br className="lg:hidden" /><span className="text-sky-700 lg:ml-2">One simple search.</span></h1><p className="mt-4 lg:mt-1 lg:text-sm text-slate-500">From your hometown to your next destination. See what’s outside.</p></div>
      <SearchBox onSearch={search} loading={loading} />
      <div className="mt-4 mb-9 lg:my-3 flex flex-wrap items-center gap-2 text-xs text-slate-500"><span className="mr-1">Explore</span>{['Delhi', 'London', 'Tokyo', 'New York'].map(city => <button key={city} disabled={loading} onClick={() => search(city)} className="rounded-full border border-slate-200 bg-white px-4 py-2 lg:py-1 hover:border-teal-600 hover:text-teal-800 disabled:opacity-50">{city} ↗</button>)}</div>
      {error && <div role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">{error}</div>}
      <div aria-live="polite" aria-busy={loading}>{loading ? <div role="status" className="flex min-h-80 lg:min-h-64 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white"><span className="mb-5 h-10 w-10 rounded-full border-2 border-teal-100 border-t-teal-700 motion-safe:animate-spin" /><p className="text-slate-500">Checking the skies…</p></div> : info ? <InfoBox info={info} /> : <section className="relative isolate overflow-hidden rounded-3xl bg-sky-950 px-8 py-16 text-center text-white sm:py-20 lg:py-8"><img src={theme.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-950/90 to-sky-950/50" /><span aria-hidden="true" className="mb-5 block text-7xl text-amber-200">☀</span><p className="mb-3 text-xs tracking-[0.2em] text-teal-200">NEAR HOME. FAR AWAY.</p><h2 className="text-3xl font-semibold">Every day starts with a forecast.</h2><p className="mx-auto mt-4 max-w-md text-sm leading-6 text-teal-100/75">Search for a city above to discover current conditions and the next five days at a glance.</p></section>}</div>
      <footer className="mt-9 lg:mt-3 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-5 lg:pt-3 text-xs text-slate-500"><span>Himanshu Weather · A clearer view of your day</span></footer>
    </main>
  </div>
}



