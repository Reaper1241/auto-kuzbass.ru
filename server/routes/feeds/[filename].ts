import { defineEventHandler, sendStream, setHeader } from 'h3'
import { createReadStream } from 'node:fs'
import { join } from 'pathe'
 
export default defineEventHandler((event) => {
  const { filename } = event.context.params
  const filePath = join(process.cwd(), 'runtime_public/feeds', filename)
 
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return sendStream(event, createReadStream(filePath))
})