/** @format */

import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";

export const metadata = {
  title: "Contact | Muhammad Rahmatullah",
  description: "Get in touch with Muhammad Rahmatullah.",
};

const contacts = [
  {
    icon: <FiMail size={24} />,
    label: "Email",
    value: "hei.rahmatullah@gmail.com",
    href: "mailto:hei.rahmatullah@gmail.com",
  },
  {
    icon: <FaWhatsapp size={24} />,
    label: "WhatsApp",
    value: "+62 812 3456 7890", // Placeholder
    href: "https://wa.me/6281234567890",
  },
  {
    icon: <FaTelegram size={24} />,
    label: "Telegram",
    value: "@rahmatullah", // Placeholder
    href: "https://t.me/rahmatullah",
  },
  {
    icon: <FiPhone size={24} />,
    label: "Phone",
    value: "+62 812 3456 7890", // Placeholder
    href: "tel:+6281234567890",
  },
];

export default function Contact() {
  return (
    <div className="container py-8">
      <h1 className="mb-8">Contact Me</h1>
      <div style={{ maxWidth: "800px" }}>
        <p className="mb-8 text-secondary">
          Feel free to reach out via any of the platforms below. I'm always open
          to discussing new projects, creative ideas, or opportunities to be
          part of your visions.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={
                contact.label === "Phone" || contact.label === "Email"
                  ? "_self"
                  : "_blank"
              }
              rel="noopener noreferrer"
              className="group"
              style={{
                padding: "1.5rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--card-background)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                textDecoration: "none",
                color: "var(--foreground)",
                transition: "border-color 0.2s, transform 0.2s",
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "50%",
                  backgroundColor: "var(--background-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {contact.icon}
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>
                  {contact.label}
                </h3>
                <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
                  {contact.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
