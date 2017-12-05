const storageKey = 'chat-auth-data'

const read = itemName => {
  const item = localStorage.getItem(itemName)
  return JSON.parse(item) || null
}

const write = (itemName, blob) => {
  localStorage.setItem(itemName, JSON.stringify(blob))
}

const has = itemName => Boolean(localStorage.getItem(itemName))

export { read, write, has, storageKey }
