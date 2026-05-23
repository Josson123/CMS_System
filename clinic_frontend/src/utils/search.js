export function matchesSearch(item, query) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return true
  }

  return JSON.stringify(item).toLowerCase().includes(normalizedQuery)
}