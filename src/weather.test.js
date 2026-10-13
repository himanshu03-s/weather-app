import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getWeather } from './weather.js'

test('search encodes city names and retrieves the matching forecast', async () => {
  const original = globalThis.fetch
  const urls = []
  globalThis.fetch = async url => {
    urls.push(url)
    return { ok: true, json: async () => urls.length === 1 ? { results: [{ name: 'New York', latitude: 40.7, longitude: -74 }] } : { current: { temperature_2m: 20 }, daily: { time: ['2026-10-13'] } } }
  }
  try {
    const result = await getWeather(' New York ')
    assert.equal(new URL(urls[0]).searchParams.get('name'), 'New York')
    assert.equal(new URL(urls[1]).searchParams.get('latitude'), '40.7')
    assert.equal(result.current.temperature_2m, 20)
  } finally { globalThis.fetch = original }
})

test('unknown cities, service failures, and network errors have distinct messages', async () => {
  const original = globalThis.fetch
  try {
    globalThis.fetch = async () => ({ ok: true, json: async () => ({}) })
    await assert.rejects(getWeather('Unknowncity'), /No city found/)
    globalThis.fetch = async () => ({ ok: false, status: 429 })
    await assert.rejects(getWeather('Delhi'), /Too many requests/)
    globalThis.fetch = async () => ({ ok: false, status: 500 })
    await assert.rejects(getWeather('Delhi'), /temporarily unavailable/)
    globalThis.fetch = async () => { throw new TypeError('Failed to fetch') }
    await assert.rejects(getWeather('Delhi'), /internet connection/)
    await assert.rejects(getWeather('   '), /at least two letters/)
  } finally { globalThis.fetch = original }
})
