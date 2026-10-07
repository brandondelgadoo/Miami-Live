import { useState } from 'react'

// Shows a gradient placeholder if the image URL fails to load
const FallbackImage = ({ src, alt, className = '', color = '#ff4fa3' }) => {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={`image-fallback ${className}`}
        style={{ '--accent': color }}
        role="img"
        aria-label={alt}
      />
    )
  }

  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />
}

export default FallbackImage
