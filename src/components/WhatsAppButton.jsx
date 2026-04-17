import { MessageCircle } from 'lucide-react'
import { COMPANY } from '../lib/constants'

export default function WhatsAppButton() {
  const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMsg)}`

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-400 rounded-full shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110 group"
        title="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30 group-hover:opacity-50"></span>
        <MessageCircle size={32} className="text-white relative z-10" />
      </a>
    </div>
  )
}
