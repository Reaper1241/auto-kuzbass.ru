import { createError, defineEventHandler, setHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const { llmsBase, feedsDomain } = useRuntimeConfig(event)

  const content = await $fetch<string>('/llms.txt', {
    baseURL: llmsBase,
    responseType: 'text',
    headers: {
      Domain: feedsDomain,
    },
  }).catch((error) => {
    throw createError({
      statusCode: error?.response?.status || 502,
      statusMessage: 'Failed to fetch llms.txt from backend',
    })
  })

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return content
})
