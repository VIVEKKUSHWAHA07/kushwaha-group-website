import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Settings, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductCard({ product }) {
  const images = product.image_url ? product.image_url.split(',') : []
  const hasImage = images.length > 0
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [images.length])

  const nextImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden hover:border-brand-accent dark:hover:border-brand-accent hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      <Link to={`/products/${product.id}`} className="block aspect-video bg-gray-100 dark:bg-brand-steel relative overflow-hidden group/slider">
        {hasImage ? (
          <>
            <div className="flex w-full h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {images.map((img, i) => (
                <img 
                  key={i}
                  src={img} 
                  alt={`${product.name} - ${i + 1}`} 
                  loading="lazy"
                  className="w-full h-full flex-shrink-0 object-cover" 
                />
              ))}
            </div>
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full opacity-0 md:group-hover/slider:opacity-100 transition-opacity shadow-md z-10"><ChevronLeft size={16}/></button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full opacity-0 md:group-hover/slider:opacity-100 transition-opacity shadow-md z-10"><ChevronRight size={16}/></button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                  {images.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentIndex ? 'bg-brand-accent' : 'bg-white/50'}`}></div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Settings size={48} className="text-gray-400 dark:text-brand-muted opacity-50" />
          </div>
        )}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 dark:bg-brand-dark/90 text-brand-accent border border-brand-accent/30 px-2 md:px-3 py-1 rounded shadow-md font-mono text-[9px] md:text-[10px] uppercase tracking-wider backdrop-blur-sm z-10">
          {product.machine_type.replace('_', ' ')}
        </div>
      </Link>

      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`} className="mb-4">
          <h3 className="font-display text-2xl text-gray-900 dark:text-white group-hover:text-brand-accent transition-colors leading-tight">{product.name}</h3>
        </Link>
        
        <div className="flex flex-col gap-2 font-mono text-xs text-gray-600 dark:text-brand-muted mb-6 flex-grow">
          {product.material && (
            <div className="flex items-start justify-between border-b border-gray-200 dark:border-brand-border/50 pb-2">
              <span className="uppercase tracking-wider">Material</span>
              <span className="text-gray-900 dark:text-brand-light text-right">{product.material}</span>
            </div>
          )}
          {product.diameter_range && (
            <div className="flex items-start justify-between border-b border-gray-200 dark:border-brand-border/50 pb-2">
              <span className="uppercase tracking-wider">Diameter</span>
              <span className="text-gray-900 dark:text-brand-light text-right">{product.diameter_range}</span>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <Link to={`/products/${product.id}`} className="text-brand-accent hover:text-brand-gold font-semibold text-sm transition-colors flex items-center gap-2 w-fit">
            View Details <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
