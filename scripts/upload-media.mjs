// Upload every image in a folder to Cloudinary, using a signed request.
//
//   npm run upload:media -- <folder> [cloudinary-folder]
//   npm run upload:media -- ./my-photos mackenzie
//
// Each file becomes the public ID  "<cloudinary-folder>/<filename without extension>",
// e.g. community-help.jpg -> mackenzie/community-help. Re-running overwrites.
// Reads CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET / NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME from .env.

import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import { basename, extname, join, resolve } from 'node:path'

const { CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret, NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME: cloud } = process.env
const [dirArg, folder = 'mackenzie'] = process.argv.slice(2)

if (!apiKey || !apiSecret || !cloud) {
  console.error('Missing Cloudinary settings. Fill in .env (see .env.example).')
  process.exit(1)
}
if (!dirArg) {
  console.error('Usage: npm run upload:media -- <folder> [cloudinary-folder]')
  process.exit(1)
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg'])

// Cloudinary signature: SHA-1 of "key=value&key=value" (keys sorted A-Z) + API secret.
const sign = (params) =>
  createHash('sha1')
    .update(
      Object.keys(params)
        .sort()
        .map((k) => `${k}=${params[k]}`)
        .join('&') + apiSecret,
    )
    .digest('hex')

async function upload(filePath) {
  const publicId = `${folder}/${basename(filePath, extname(filePath))}`
  const params = { overwrite: 'true', public_id: publicId, timestamp: Math.floor(Date.now() / 1000) }

  const form = new FormData()
  form.append('file', new Blob([await readFile(filePath)]), basename(filePath))
  form.append('api_key', apiKey)
  form.append('signature', sign(params))
  for (const [k, v] of Object.entries(params)) form.append(k, String(v))

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: 'POST', body: form })
  const body = await res.json()
  if (!res.ok) throw new Error(body.error?.message ?? `HTTP ${res.status}`)
  return body
}

const dir = resolve(dirArg)
const files = (await readdir(dir)).filter((f) => IMAGE_EXTENSIONS.has(extname(f).toLowerCase()))
if (!files.length) {
  console.error(`No images found in ${dir}`)
  process.exit(1)
}

let failed = 0
for (const file of files) {
  try {
    const r = await upload(join(dir, file))
    console.log(`ok    ${r.public_id}  (${r.width}x${r.height}, ${Math.round(r.bytes / 1024)} KB)`)
  } catch (err) {
    failed++
    console.error(`FAIL  ${file}: ${err.message}`)
  }
}
process.exit(failed ? 1 : 0)
