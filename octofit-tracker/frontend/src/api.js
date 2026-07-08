export const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export function getApiUrl(component) {
  if (!codespaceName) {
    return null
  }

  return `https://${codespaceName}-8000.app.github.dev/api/${component}/`
}

export function normalizeCollection(payload, collectionName) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidates = [
    payload[collectionName],
    payload.results,
    payload.items,
    payload.data,
    payload.docs,
    payload.records,
  ]

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate
    }

    if (candidate && typeof candidate === 'object') {
      const nestedArray = Object.values(candidate).find(Array.isArray)
      if (nestedArray) {
        return nestedArray
      }
    }
  }

  return []
}

export async function fetchCollection(component, collectionName = component) {
  const url = getApiUrl(component)

  if (!url) {
    return {
      items: [],
      apiUrl: null,
      configurationError: 'Define VITE_CODESPACE_NAME to load live API data.',
    }
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  const payload = await response.json()

  return {
    items: normalizeCollection(payload, collectionName),
    apiUrl: url,
    configurationError: null,
  }
}