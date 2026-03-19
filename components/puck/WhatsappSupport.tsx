import React from "react"
import { MessageCircle, Phone, Mail, Clock } from "lucide-react"
import type { ComponentConfig } from "@measured/puck"

export type WhatsappSupportProps = {
  title: string;
  subtitle: string;
  hours: string;
  phone: string;
  email: string;
  buttonText: string;
  whatsappNumber: string;
  whatsappMessage: string;
};

export const WhatsappSupportConfig: ComponentConfig<WhatsappSupportProps> = {
  fields: {
    title: { type: "text" },
    subtitle: { type: "text" },
    hours: { type: "text" },
    phone: { type: "text" },
    email: { type: "text" },
    buttonText: { type: "text" },
    whatsappNumber: { type: "text" },
    whatsappMessage: { type: "text" },
  },
  defaultProps: {
    title: "WhatsApp Destek Hattı",
    subtitle: "Sorularınız için bize ulaşın",
    hours: "Pazartesi - Cumartesi: 09:00 - 18:00",
    phone: "0850 123 45 67",
    email: "info@multilimit.com",
    buttonText: "WhatsApp ile Yazın",
    whatsappNumber: "905551234567",
    whatsappMessage: "Merhaba, Multilimit Premium Detoks Kompleksi hakkında bilgi almak istiyorum."
  },
  render: (props) => {
    const encodedMessage = encodeURIComponent(props.whatsappMessage);
    const whatsappLink = `https://wa.me/${props.whatsappNumber}?text=${encodedMessage}`;

    return (
      <section className="py-16 lg:py-20 bg-gradient-to-r from-green-900/20 via-green-800/10 to-green-900/20 border-y border-green-800/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">
                    {props.title}
                  </h2>
                  <p className="text-muted-foreground text-sm">{props.subtitle}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {props.hours}
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {props.phone}
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {props.email}
                </span>
              </div>
            </div>

            {/* CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-green-600/25"
            >
              <MessageCircle className="w-6 h-6" />
              {props.buttonText}
            </a>
          </div>
        </div>
      </section>
    );
  },
};
