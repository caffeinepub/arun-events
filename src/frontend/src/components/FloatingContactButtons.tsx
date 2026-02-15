import { PhoneIcon, WhatsAppIcon } from './icons';
import { siteData } from '../config/siteData';

export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      <a
        href={`tel:${siteData.phone}`}
        className="w-14 h-14 rounded-full bg-[oklch(0.55_0.18_250)] hover:bg-[oklch(0.50_0.18_250)] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_250)] focus:ring-offset-2"
        aria-label="Call us"
      >
        <PhoneIcon className="w-6 h-6" />
      </a>

      <a
        href={siteData.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[oklch(0.65_0.20_145)] hover:bg-[oklch(0.60_0.20_145)] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.20_145)] focus:ring-offset-2"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </div>
  );
}
