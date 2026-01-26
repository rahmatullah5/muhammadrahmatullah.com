/** @format */

"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Contact form submission from ${formData.name}`;
    const body = `${formData.message}\n\nFrom: ${formData.name} (${formData.email})`;

    window.location.href = `mailto:hei.rahmatullah@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container py-8">
      <h1 className="mb-8">Contact Me</h1>
      <div style={{ maxWidth: "600px" }}>
        <p className="mb-8 text-secondary">
          Have a project in mind or want to discuss engineering practices? Send
          me a message below.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" style={{ fontWeight: 500 }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              style={{
                padding: "0.75rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                fontSize: "1rem",
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" style={{ fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={{
                padding: "0.75rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                fontSize: "1rem",
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" style={{ fontWeight: 500 }}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              style={{
                padding: "0.75rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                fontSize: "1rem",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn"
            style={{ alignSelf: "flex-start", marginTop: "1rem" }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
