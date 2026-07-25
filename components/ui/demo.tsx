"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden" style={{ background: "#E8E6D8" }}>
      <ContainerScroll
        titleComponent={
          <div className="mb-6 px-4">
            <p
              className="text-sm font-mono uppercase tracking-widest mb-3 opacity-60"
              style={{ color: "#000" }}
            >
              // Built with precision
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
              style={{ fontFamily: "Inter, sans-serif", color: "#000" }}
            >
              Websites that work
              <br />
              <span
                className="italic"
                style={{
                  fontFamily: "Georgia, serif",
                  background: "#C084FC",
                  padding: "0 8px",
                  display: "inline-block",
                  marginTop: "4px",
                }}
              >
                beautifully.
              </span>
            </h2>
          </div>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2074&auto=format&fit=crop"
          alt="Portfolio website mockup on laptop screen"
          height={720}
          width={1400}
          className="mx-auto object-cover h-full w-full object-top"
          draggable={false}
          priority
        />
      </ContainerScroll>
    </div>
  );
}
