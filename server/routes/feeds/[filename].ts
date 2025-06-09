import { defineEventHandler, sendStream } from 'h3'
import { createReadStream } from 'node:fs'
import { join } from 'pathe'

export default defineEventHandler((event) => {
  const { filename } = event.context.params
  const filePath = join(process.cwd(), 'runtime_public/feeds', filename)
  return sendStream(event, createReadStream(filePath))
})