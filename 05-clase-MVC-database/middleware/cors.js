export function corsMiddleware (req, res, next) {
  console.log(`Request from: ${req.url}`)
  res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Methods', 'DELETE, POST, PATCH, GET')

  next()
}
