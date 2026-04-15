import { MessageCircle } from 'lucide-react'
import { COMPANY } from '../lib/constants'

export default function WhatsAppButton() {
  const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMsg)}`

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="wa-button"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={28} color="#fff" />
    </a>
  )
}
