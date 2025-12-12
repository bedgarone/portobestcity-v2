export function YouTubeEmbed({ value }: { value: { url: string } }) {
  const { url } = value
  const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()

  return (
    <div className="relative aspect-video w-full">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={'YouTube Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full rounded-lg"
      />
    </div>
  )
}
