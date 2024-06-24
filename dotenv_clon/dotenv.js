import fs from 'node:fs'

export function config ({ path = '.env' } = {}) {
  try {
    // Obtener el contenido
    const content = fs.readFileSync(path, 'utf8')

    // Separar cada linea
    const rows = content.split('\r\n').filter(Boolean)

    // Iterar cada linea para obtener la clave y el valor
    rows.forEach(row => {
      const [key, ...value] = row.split('=')

      const formattedKey = key.trim().toString()

      const joinedValue = value.join('=').trim().toString()
      const formattedValue = formatValue(joinedValue)

      // Mutar process.env con la clavce y valor
      process.env[formattedKey] = formattedValue
      return [formattedKey, formattedValue]
    })
  } catch (error) {

  }
}

function formatValue (value) {
  const valueHasQuotes =
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'")) ||
    (value.startsWith('`') && value.endsWith('`'))

  return valueHasQuotes ? value.slice(1, -1) : value
}
