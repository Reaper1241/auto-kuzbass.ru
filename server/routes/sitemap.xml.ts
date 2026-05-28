import { defineEventHandler, setHeader, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const { sitemapBase, feedsDomain } = useRuntimeConfig()

  const response = await $fetch.raw(`${sitemapBase}/sitemap.xml`, {
    responseType: 'arrayBuffer',
    headers: {
      Domain: feedsDomain,
    },
  }).catch((err) => {
    throw createError({
      statusCode: err?.response?.status || 502,
      statusMessage: 'Failed to fetch sitemap from backend',
    })
  })

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return Buffer.from(response._data as ArrayBuffer)
})
