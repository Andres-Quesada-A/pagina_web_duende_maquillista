import express, { json } from 'express' // require -> commonJS

const app = express()
app.use(json())
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
