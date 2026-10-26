export interface ImageOptions {
  w?: number
  h?: number
  /** aspect ratio, e.g. '16:9' (used together with a crop mode and a width) */
  ar?: string
  /** fill = crop to fit, lfill = same but never upscale, limit = shrink only, no crop */
  crop?: 'fill' | 'lfill' | 'limit' | 'fit'
  gravity?: 'auto' | 'face' | 'center'
  format?: 'auto' | 'png' | 'jpg' | 'webp'
}

/**
 * Builds Cloudinary delivery URLs. Cloudinary resizes/crops/compresses on the fly,
 * so we upload one original and ask for exactly the size each place needs:
 *   https://res.cloudinary.com/<cloud>/image/upload/<transformations>/<public id>
 */
export function useCloudinary() {
  const cloudName = useRuntimeConfig().public.cloudinaryCloudName
  if (!cloudName) {
    throw new Error(
      'NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set. Add it to .env locally and to Vercel > Settings > Environment Variables.',
    )
  }
  const base = `https://res.cloudinary.com/${cloudName}/image/upload`

  function url(publicId: string, o: ImageOptions = {}): string {
    const t = [`f_${o.format ?? 'auto'}`, 'q_auto'] // best format + sensible quality per browser
    if (o.crop) t.push(`c_${o.crop}`)
    if (o.gravity) t.push(`g_${o.gravity}`)
    if (o.ar) t.push(`ar_${o.ar}`)
    if (o.w) t.push(`w_${o.w}`)
    if (o.h) t.push(`h_${o.h}`)
    return `${base}/${t.join(',')}/${publicId}`
  }

  /** Value for an <img srcset>: the same picture at several widths. */
  function srcset(publicId: string, widths: number[], o: ImageOptions = {}): string {
    return widths.map((w) => `${url(publicId, { ...o, w })} ${w}w`).join(', ')
  }

  return { url, srcset }
}
