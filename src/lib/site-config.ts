// Replace with your real WhatsApp business number (international format, digits only).
export const WHATSAPP_NUMBER = "213666627098";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Lead forms: paste your Formspree form endpoint here (https://formspree.io/f/xxxxxxx).
// Leave empty to fall back to a WhatsApp handoff.
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnpaoedd";
