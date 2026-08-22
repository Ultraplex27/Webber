"use client";

import { useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage.client";

export function ProductGallery({ name, images }: { name: string; images: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex aspect-[4/3] items-center justify-center rounded-[6px] border border-grey-200 bg-white p-8">
        <SmartImage
          key={images[active]}
          src={images[active]}
          alt={`${name} BMS render, view ${active + 1} of ${images.length}`}
          ratio="4 / 3"
          fit="contain"
          loading="eager"
          placeholderLabel={name.toUpperCase()}
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-4 flex flex-nowrap gap-3 overflow-x-auto pb-1" aria-label="Product views">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={active === i}
                aria-label={`View ${i + 1} of ${images.length}`}
                className={`flex h-24 w-24 items-center justify-center rounded-[6px] border bg-white p-2 transition-colors ${
                  active === i
                    ? "border-blue-700 ring-1 ring-blue-700"
                    : "border-grey-200 hover:border-blue-300"
                }`}
              >
                <SmartImage
                  src={src}
                  alt=""
                  ratio="1 / 1"
                  fit="contain"
                  placeholderLabel=""
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
