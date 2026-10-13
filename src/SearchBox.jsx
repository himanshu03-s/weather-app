import { useState } from 'react'
export default function SearchBox({ onSearch, loading }) {
  const [city, setCity] = useState('')
  return <form onSubmit={e => { e.preventDefault(); onSearch(city) }} className="flex flex-col gap-3 sm:flex-row">
    <label className="min-w-0 flex-1"><span className="sr-only">City name</span><input required minLength={2} value={city} onChange={e => setCity(e.target.value)} placeholder="Search a city, e.g. London" className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 lg:py-2.5 outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-600/10" /></label>
    <button disabled={loading} className="rounded-2xl bg-sky-800 px-8 py-4 lg:py-2.5 font-semibold text-white hover:bg-sky-900 disabled:opacity-60">{loading ? 'Searching…' : 'Search city ↗'}</button>
  </form>
}


