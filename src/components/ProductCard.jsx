import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'

export default function ProductCard({ product }) {
  const hasImage = Boolean(product.image_url)

  return (
    <div className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden hover:border-brand-accent dark:hover:border-brand-accent hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      <Link to={`/products/${product.id}`} className="block aspect-video bg-gray-100 dark:bg-brand-steel relative overflow-hidden">
        {hasImage ? (
          <img 
            src={product.image_url} 
            alt={product.name} 
            loading="lazy"
            width="400"
            height="225"
            className="w-full h-full object-cover md:group-hover:scale-105 group-active:scale-95 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Settings size={48} className="text-gray-400 dark:text-brand-muted opacity-50" />
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-brand-dark/90 text-brand-accent border border-brand-accent/30 px-3 py-1 rounded shadow-md font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm">
          {product.machine_type.replace('_', ' ')}
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
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
