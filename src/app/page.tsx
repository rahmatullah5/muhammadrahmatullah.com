/** @format */

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  return (
    <div
      className="container"
      style={{
        padding: "8rem 1rem",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
        Building scalable systems with{" "}
        <span className="text-primary">clarity</span> and{" "}
        <span className="text-primary">precision</span>.
      </h1>
      <p
        className="text-secondary"
        style={{
          fontSize: "1.25rem",
          maxWidth: "600px",
          marginBottom: "2.5rem",
        }}
      >
        I'm Muhammad Rahmatullah, a Senior Full-stack Engineer with expertise in
        optimizing data pipelines, microservices, and high-performance
        applications.
      </p>
      <div className="flex gap-4">
        <Link href="/about" className="btn">
          View Experience
        </Link>
        <Link
          href="/contact"
          className="btn btn-outline flex items-center gap-4"
        >
          Contact Me <FiArrowRight />
        </Link>
      </div>

      <div style={{ marginTop: "4rem" }}>{/* Spacer */}</div>

      <Portfolio />
    </div>
  );
}
