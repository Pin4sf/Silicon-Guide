import Link from "next/link"

export default function GlossaryPage() {
  // Glossary terms organized alphabetically
  const glossaryTerms = [
    {
      letter: "A",
      terms: [
        {
          term: "ALD (Atomic Layer Deposition)",
          definition:
            "A thin film deposition technique that is based on the sequential use of self-limiting surface reactions. It allows for precise layer-by-layer growth of films with excellent conformality and thickness control at the atomic scale.",
          relatedChapters: ["ch16"],
        },
        {
          term: "ASIC (Application-Specific Integrated Circuit)",
          definition:
            "An integrated circuit customized for a particular use or application, rather than intended for general-purpose use. ASICs are designed to perform specific functions and are optimized for performance, power, and area.",
          relatedChapters: ["ch8"],
        },
      ],
    },
    {
      letter: "B",
      terms: [
        {
          term: "BJT (Bipolar Junction Transistor)",
          definition:
            "A type of transistor that uses both electron and hole carriers. It consists of three semiconductor regions: emitter, base, and collector. BJTs are commonly used in analog circuits and some digital applications.",
          relatedChapters: ["ch4"],
        },
        {
          term: "Band Gap",
          definition:
            "The energy difference between the top of the valence band and the bottom of the conduction band in a semiconductor. It represents the minimum energy required to excite an electron from the valence band to the conduction band.",
          relatedChapters: ["ch3"],
        },
      ],
    },
    {
      letter: "C",
      terms: [
        {
          term: "CMOS (Complementary Metal-Oxide-Semiconductor)",
          definition:
            "A technology for constructing integrated circuits that uses complementary pairs of p-type and n-type MOSFETs for logic functions. CMOS is the dominant technology for modern digital ICs due to its low static power consumption and high noise immunity.",
          relatedChapters: ["ch4", "ch5"],
        },
        {
          term: "CVD (Chemical Vapor Deposition)",
          definition:
            "A deposition process used to produce high-quality, high-performance solid materials. The process involves chemical reactions of vapor-phase precursors on a heated substrate to form a solid film.",
          relatedChapters: ["ch16"],
        },
      ],
    },
    {
      letter: "D",
      terms: [
        {
          term: "Doping",
          definition:
            "The intentional introduction of impurities into a semiconductor material to modulate its electrical, optical, and structural properties. Doping creates either excess holes (p-type) or excess electrons (n-type) in the semiconductor.",
          relatedChapters: ["ch3", "ch17"],
        },
        {
          term: "DRC (Design Rule Checking)",
          definition:
            "A verification step in the IC design process that determines whether the physical layout of a chip satisfies a series of recommended parameters called design rules. These rules ensure manufacturability and reliability.",
          relatedChapters: ["ch10", "ch12"],
        },
      ],
    },
    {
      letter: "E",
      terms: [
        {
          term: "EDA (Electronic Design Automation)",
          definition:
            "Software tools used to design electronic systems such as integrated circuits and printed circuit boards. EDA tools automate the design, verification, and testing of electronic hardware.",
          relatedChapters: ["ch13"],
        },
        {
          term: "EUV (Extreme Ultraviolet) Lithography",
          definition:
            "An advanced lithography technology that uses extreme ultraviolet light with a wavelength of 13.5 nm to pattern semiconductor wafers. EUV enables the production of smaller feature sizes for advanced technology nodes.",
          relatedChapters: ["ch15"],
        },
      ],
    },
    {
      letter: "F",
      terms: [
        {
          term: "FinFET",
          definition:
            "A type of 3D transistor architecture where the conducting channel is wrapped by a thin silicon 'fin' that forms the body of the device. FinFETs provide better control of the channel and reduce short-channel effects compared to planar transistors.",
          relatedChapters: ["ch21"],
        },
        {
          term: "Foundry",
          definition:
            "A semiconductor fabrication plant that manufactures integrated circuits designed by other companies. Foundries enable fabless semiconductor companies to design chips without owning manufacturing facilities.",
          relatedChapters: ["ch2"],
        },
      ],
    },
    // More terms would be added for letters G-Z
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Semiconductor Glossary</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-8">
        A comprehensive reference of semiconductor terms, acronyms, and definitions used throughout the Silicon Guide
        handbook.
      </p>

      {/* Alphabet quick navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {glossaryTerms.map((section) => (
          <a
            key={section.letter}
            href={`#section-${section.letter}`}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-teal-100 dark:bg-gray-800 dark:hover:bg-teal-900/30 text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
          >
            {section.letter}
          </a>
        ))}
      </div>

      {/* Glossary content */}
      <div className="space-y-10">
        {glossaryTerms.map((section) => (
          <div key={section.letter} id={`section-${section.letter}`}>
            <h2 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400 border-b pb-2">
              {section.letter}
            </h2>
            <div className="space-y-6">
              {section.terms.map((item) => (
                <div key={item.term} className="group">
                  <h3 className="text-xl font-medium mb-2">{item.term}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{item.definition}</p>
                  {item.relatedChapters && item.relatedChapters.length > 0 && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Related chapters:{" "}
                      {item.relatedChapters.map((chapterId, index) => (
                        <span key={chapterId}>
                          <Link
                            href={`/handbook/${chapterId}`}
                            className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                          >
                            {chapterId.replace("ch", "Chapter ")}
                          </Link>
                          {index < item.relatedChapters.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
