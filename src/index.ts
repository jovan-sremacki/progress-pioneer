import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Stefan Kuzman!!!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
