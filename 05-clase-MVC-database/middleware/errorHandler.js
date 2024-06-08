export default function errorHanlderMiddleware (error, req, res, next) {
  console.error(error)
  res.status(500).send('Something broke!')
}
