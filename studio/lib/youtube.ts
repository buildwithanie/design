const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/

export function getYouTubeVideoId(value?: string): string | null {
  if (!value) {
    return null
  }

  try {
    const url = new URL(value)
    const hostname = url.hostname.replace(/^www\./, '').toLowerCase()

    if (hostname === 'youtu.be') {
      const videoId = url.pathname.split('/').filter(Boolean)[0]

      return videoId && YOUTUBE_ID_PATTERN.test(videoId) ? videoId : null
    }

    if (
      hostname === 'youtube.com' ||
      hostname === 'm.youtube.com' ||
      hostname === 'music.youtube.com'
    ) {
      if (url.pathname === '/watch') {
        const videoId = url.searchParams.get('v')

        return videoId && YOUTUBE_ID_PATTERN.test(videoId) ? videoId : null
      }

      const segments = url.pathname.split('/').filter(Boolean)

      if (
        ['embed', 'shorts', 'live'].includes(segments[0] ?? '') &&
        segments[1] &&
        YOUTUBE_ID_PATTERN.test(segments[1])
      ) {
        return segments[1]
      }
    }

    return null
  } catch {
    return null
  }
}
