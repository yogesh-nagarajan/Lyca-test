"use client";

import { useState } from "react";

export default function EmailContainer({ data }: { data: any }) {
  const [email, setEmail] = useState("");

  return (
    <section className="w-full bg-[#dbe6ef] py-10">
      <div className="max-w-4xl mx-auto px-4 text-center">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-semibold text-[#2d3748] mb-10">
          {data.emailContainerTitle}
        </h2>

        {/* Input + Button Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={data.emailContainerPlaceholder}
            className="w-full md:w-[500px] px-5 py-4 rounded-md border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          />

          <a
            href={data.emailContainerButtonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#19c37d] hover:bg-[#08dc7d] text-white font-semibold px-8 py-4 rounded-md transition duration-300 whitespace-nowrap"
          >
            {data.emailContainerButton}
          </a>
        </div>

        {/* Description */}
        <p className="text-[#4a5568] text-base max-w-3xl mx-auto">
          {data.emailContainerDescription}
        </p>

      </div>
    </section>
  );
}