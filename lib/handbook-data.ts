// This file contains the structured data for the handbook chapters and resources

export interface Resource {
  id: string
  title: string
  url: string
  sourceName: string
  summary: string
  contentType: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  keywords: string[]
  accessNotes: string
}

export interface Chapter {
  id: string
  title: string
  sectionTitle: string
  introductoryText: string
  keyTopics?: string[]
  learningObjectives?: string[]
  resources: Resource[]
}

// Handbook data
export const handbookData: Record<string, Chapter> = {
  ch1: {
    id: "ch1",
    title: "The Modern Semiconductor Era",
    sectionTitle: "Introduction",
    introductoryText:
      "Welcome to Silicon Guide, your comprehensive resource for semiconductor technology. This handbook covers everything from basic physics to advanced manufacturing techniques, designed for students, professionals, and enthusiasts alike. Semiconductors are the fundamental building blocks of modern electronics, enabling the creation of integrated circuits (ICs) that power everything from smartphones to supercomputers. Semiconductors are fundamental materials that bridge the gap between conductors and insulators*, enabling the controlled flow of electrical current essential for modern digital devices. These materials, primarily silicon but increasingly others like SiC and GaN, are processed into intricate microchips that power a vast array of technologies, from smartphones to advanced computing systems. Understanding semiconductors is crucial as the industry continues to grow, driving innovation and shaping the future of technology",
    keyTopics: [
      "Purpose of this Handbook",
      "Definition and unique electrical properties of semiconductors",
      "The critical role and widespread applications of semiconductors in modern technology",
      "Basic steps in semiconductor manufacturing",
      "Different types of semiconductor materials (e.g., silicon, SiC, GaN)",
      "The historical evolution and importance of the semiconductor industry",
      "The global scale and growth potential of the semiconductor market"  
    ],
    learningObjectives: [
    "Define a semiconductor and differentiate it from conductors and insulators based on electrical conductivity",
    "Identify and explain the significance of semiconductors in various electronic devices and industries",
    "Outline the fundamental stages involved in the manufacturing of semiconductor chips",
    "Recognize common semiconductor materials and their key applications",
    "Understand the basic historical progression of semiconductor technology and its impact",
    "Appreciate the economic importance and future growth trends of the global semiconductor industry"
    ],
    resources: [
      {
        id: "res1_1",
        title: "Semiconductor - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Semiconductor",
        sourceName: "Wikipedia",
        summary: "The Wikipedia page defines a *semiconductor as a material with conductivity between a conductor and an insulator*, which can be modified by doping. It details the properties of semiconductors, various semiconductor materials like silicon and germanium, and provides an extensive section on the early history of semiconductor development, including the invention of the transistor. This resource offers fundamental knowledge on the definition, properties, materials, and historical context of semiconductors, all essential for an introduction to the topic.",
        contentType: "Wiki Entry",
        difficulty: "Beginner",
        keywords: ["semiconductor definition", "electrical conductivity", "doping", "semiconductor materials", "history of semiconductors", "transistor"],
        accessNotes: "Free Access"  
      },
      {
        id: "res1_2",
      title: "What is a semiconductor?",
      url: "https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-a-semiconductor",
      sourceName: "McKinsey",
      summary: "This McKinsey article explains that a *semiconductor lies between a conductor and an insulator*, enabling controlled electrical current. It emphasizes the critical role of semiconductors in modern life and the ongoing Fourth Industrial Revolution, predicting significant industry growth. The article also briefly describes the manufacturing process and mentions key materials like silicon, SiC, and GaN. This resource provides a clear and concise introduction to the definition, importance, and manufacturing basics of semiconductors, aligning well with this chapter's objectives.",
      contentType: "Article",
      difficulty: "Beginner",
      keywords: ["semiconductor definition", "importance of semiconductors", "Fourth Industrial Revolution", "semiconductor materials", "manufacturing process", "industry growth"],
      accessNotes: "From uploaded PDF"
      },
      {
        id: "res1_3",
        title: "A 200-year timeline of the semiconductor industry",
        url: "https://www.emergingtechbrew.com/stories/2021/10/21/a-200-year-timeline-of-the-semiconductor-industry",
        sourceName: "Emerging Tech Brew (by Morning Brew Inc.)",
        summary: "This resource presents a *historical overview of the semiconductor industry over the past 200 years*, highlighting key events and the increasing importance of these materials. It touches upon the evolution of terminology and the current multi-billion dollar value of the sector. This timeline provides crucial context for understanding the historical development of semiconductor technology, a key topic in this introductory chapter.",
        contentType: "Timeline",
        difficulty: "Beginner",
        keywords: ["semiconductor history", "industry timeline", "technology evolution", "market value"],
        accessNotes: "Free Access"  
      },
      {
      id: "res1_4",
      title: "6 crucial steps in semiconductor manufacturing",
      url: "https://www.asml.com/en/news/stories/2021/semiconductor-manufacturing-process-steps",
      sourceName: "ASML",
      summary: "This article from ASML outlines the *six key stages in microchip production*: deposition, photoresist coating, lithography, etching, ionization, and packaging. It emphasizes the complexity and precision involved in creating the advanced chips found in modern devices. This resource is directly relevant to understanding the basic concepts of semiconductor manufacturing discussed in the chapter.",
      contentType: "Article",
      difficulty: "Beginner",
      keywords: ["semiconductor manufacturing", "microchip production", "deposition", "lithography", "etching", "packaging"],
      accessNotes: "From uploaded PDF"
      },
    ],
  },
  ch2: {
    id: "ch2",
    title: "The Global Landscape",
    sectionTitle: "Introduction",
    introductoryText:
      "The semiconductor industry is a complex global ecosystem with various players, economic factors, and geopolitical considerations. This chapter provides an overview of the industry landscape, key players, and market trends. Understanding this landscape is crucial for grasping the economic, technological, and geopolitical factors that shape the development and availability of semiconductor technology.",
    keyTopics: [
      "Key industry players (IDMs, Foundries, Fabless, OSATs, EDA, Equipment)",
      "Major geographical hubs and their specializations",
      "Market segments (Compute, Mobile, Auto, Industrial, AI)",
      "Supply chain overview and vulnerabilities",
      "Role of industry associations (SIA, SEMI, GSA, ESIA)",
    ],
    learningObjectives: [
      "Identify the major companies and their roles in the semiconductor ecosystem",
      "Describe the regional specializations in the global semiconductor industry",
      "Explain the challenges and vulnerabilities in the semiconductor supply chain",
      "Analyze the economic and geopolitical factors affecting semiconductor availability",
      "Discuss current trends and future directions in the industry landscape",
    ],
    resources: [
      {
        id: "res2_1",
        title: "Global Semiconductor Market Analysis",
        url: "https://example.com/semiconductor-market",
        sourceName: "McKinsey Insights",
        summary:
          "A comprehensive analysis of the global semiconductor market, including key players, market segments, and future trends. The report examines the economic impact of semiconductors, regional manufacturing capabilities, and projections for industry growth across different application domains.",
        contentType: "Article",
        difficulty: "Intermediate",
        keywords: ["market", "industry", "trends", "economic analysis"],
        accessNotes: "Free access with registration",
      },
      {
        id: "res2_2",
        title: "Semiconductor Supply Chain Explained",
        url: "https://example.com/supply-chain",
        sourceName: "SIA Reports",
        summary:
          "This report explains the complex semiconductor supply chain, from raw materials to finished products. It details the specialized roles of different regions and companies in the global ecosystem, highlighting vulnerabilities and strategic considerations for supply chain resilience.",
        contentType: "Paper Abstract",
        difficulty: "Intermediate",
        keywords: ["supply chain", "manufacturing", "logistics", "geopolitics"],
        accessNotes: "Free summary, full report requires purchase",
      },
      {
        id: "res2_3",
        title: "The Geopolitics of Semiconductors",
        url: "https://example.com/semiconductor-geopolitics",
        sourceName: "Foreign Affairs",
        summary:
          "An analysis of how semiconductors have become a focal point in global politics and trade relations. The article examines government initiatives like the CHIPS Act, export controls, and the strategic importance of semiconductor manufacturing capabilities for national security.",
        contentType: "Article",
        difficulty: "Advanced",
        keywords: ["geopolitics", "trade", "national security", "policy"],
        accessNotes: "Limited free articles per month",
      },
    ],
  },
  ch3: {
    id: "ch3",
    title: "Semiconductor Physics & Materials Science",
    sectionTitle: "I. Semiconductor Fundamentals",
    introductoryText:
      "Understanding the fundamental physics of semiconductors is essential for grasping how modern electronic devices work. This chapter covers basic atomic structure, semiconductor materials, and their properties. We'll explore how the unique electronic structure of semiconductor materials enables their use in a wide range of electronic applications.",
    keyTopics: [
      "Basic atomic structure and electron configuration",
      "Energy bands in solids: conductors, insulators, and semiconductors",
      "Intrinsic vs. extrinsic semiconductors",
      "Doping and carrier concentration",
      "Common semiconductor materials (Si, Ge, GaAs, SiC, GaN)",
    ],
    learningObjectives: [
      "Explain the band structure of semiconductor materials",
      "Describe the behavior of electrons and holes in semiconductors",
      "Calculate basic semiconductor parameters like carrier concentration",
      "Explain how doping affects semiconductor electrical properties",
      "Compare and contrast different semiconductor materials and their applications",
    ],
    resources: [
      {
        id: "res3_1",
        title: "Introduction to Semiconductor Physics",
        url: "https://example.com/intro-semiconductor-physics",
        sourceName: "MIT OpenCourseWare",
        summary:
          "This comprehensive introduction covers the basics of semiconductor physics, including atomic structure, electrons and holes, and the properties of semiconductor materials. The course materials include lecture notes, problem sets, and video demonstrations of key concepts in semiconductor behavior.",
        contentType: "Course",
        difficulty: "Beginner",
        keywords: ["physics", "electrons", "holes", "silicon", "band theory"],
        accessNotes: "Free access, no registration required",
      },
      {
        id: "res3_2",
        title: "Semiconductor Materials: Silicon vs. Germanium",
        url: "https://example.com/semiconductor-materials",
        sourceName: "IEEE Spectrum",
        summary:
          "A comparison of silicon and germanium as semiconductor materials, discussing their properties, advantages, and applications in modern electronics. The article explores why silicon became the dominant material despite germanium's early use, and examines emerging applications where germanium still offers advantages.",
        contentType: "Article",
        difficulty: "Intermediate",
        keywords: ["silicon", "germanium", "materials", "comparison", "properties"],
        accessNotes: "Free access with limited articles per month",
      },
      {
        id: "res3_3",
        title: "Band Theory of Solids",
        url: "https://example.com/band-theory",
        sourceName: "Coursera",
        summary:
          "This video lecture explains the band theory of solids and how it applies to semiconductors, conductors, and insulators. The course provides visualizations of energy bands, explains the concept of the Fermi level, and demonstrates how doping affects band structure in semiconductor materials.",
        contentType: "Video",
        difficulty: "Intermediate",
        keywords: ["band theory", "energy bands", "valence band", "conduction band", "Fermi level"],
        accessNotes: "Free access with Coursera account",
      },
    ],
  },
  ch4: {
    id: "ch4",
    title: "Core Semiconductor Devices",
    sectionTitle: "I. Semiconductor Fundamentals",
    introductoryText:
      "This chapter explores the fundamental semiconductor devices that form the building blocks of modern electronics. We'll examine how the physics principles from the previous chapter are applied to create functional electronic components, with a focus on diodes and transistors. Understanding these basic devices is essential for comprehending more complex integrated circuits.",
    keyTopics: [
      "PN Junction Diode operation and characteristics",
      "Bipolar Junction Transistors (BJT) structure and operation",
      "Metal-Oxide-Semiconductor Field-Effect Transistor (MOSFET) principles",
      "NMOS, PMOS, and CMOS technologies",
      "Basic I-V characteristics and device parameters",
    ],
    learningObjectives: [
      "Explain the operation of PN junction diodes under forward and reverse bias",
      "Describe the structure and operation of BJTs and MOSFETs",
      "Interpret basic I-V characteristic curves for semiconductor devices",
      "Understand the advantages of CMOS technology",
      "Recognize how these devices are used in basic electronic circuits",
    ],
    resources: [
      {
        id: "res4_1",
        title: "Semiconductor Diodes and Applications",
        url: "https://example.com/semiconductor-diodes",
        sourceName: "All About Circuits",
        summary:
          "A comprehensive guide to semiconductor diodes, covering PN junction physics, forward and reverse bias operation, and various diode types including rectifier, Zener, and LED. The article includes practical examples and applications in electronic circuits.",
        contentType: "Article",
        difficulty: "Beginner",
        keywords: ["diodes", "PN junction", "rectification", "Zener", "LED"],
        accessNotes: "Free access, no registration required",
      },
      {
        id: "res4_2",
        title: "Transistor Fundamentals: BJT and MOSFET",
        url: "https://example.com/transistor-fundamentals",
        sourceName: "Electronics Tutorials",
        summary:
          "This tutorial explains the structure, operation, and characteristics of both Bipolar Junction Transistors (BJTs) and Metal-Oxide-Semiconductor Field-Effect Transistors (MOSFETs). It covers biasing, amplification, and switching applications with practical circuit examples.",
        contentType: "Tutorial",
        difficulty: "Intermediate",
        keywords: ["transistors", "BJT", "MOSFET", "amplification", "switching"],
        accessNotes: "Free access",
      },
      {
        id: "res4_3",
        title: "CMOS Technology and Circuit Design",
        url: "https://example.com/cmos-technology",
        sourceName: "IEEE Xplore",
        summary:
          "An introduction to Complementary Metal-Oxide-Semiconductor (CMOS) technology, explaining how NMOS and PMOS transistors are combined to create efficient digital circuits. The paper discusses the advantages of CMOS in terms of power consumption, noise immunity, and scaling.",
        contentType: "Paper Abstract",
        difficulty: "Advanced",
        keywords: ["CMOS", "NMOS", "PMOS", "digital circuits", "power consumption"],
        accessNotes: "Abstract free, full paper requires subscription",
      },
    ],
  },
  ch5: {
    id: "ch5",
    title: "Introduction to Digital Logic & Circuits",
    sectionTitle: "I. Semiconductor Fundamentals",
    introductoryText:
      "Digital logic forms the foundation of all computing systems, from simple calculators to complex processors. This chapter introduces the principles of digital logic and how semiconductor devices are used to implement logical operations. We'll explore Boolean algebra, logic gates, and basic combinatorial circuits that are the building blocks of digital systems.",
    keyTopics: [
      "Boolean algebra fundamentals",
      "Logic gates (AND, OR, NOT, NAND, NOR, XOR)",
      "CMOS implementation of logic gates",
      "Basic combinatorial circuits (multiplexers, decoders, adders)",
      "Introduction to sequential logic elements",
    ],
    learningObjectives: [
      "Apply Boolean algebra to simplify logical expressions",
      "Describe the operation of basic logic gates and their truth tables",
      "Understand how CMOS technology implements logic functions",
      "Design simple combinatorial circuits for specific functions",
      "Recognize the building blocks of more complex digital systems",
    ],
    resources: [
      {
        id: "res5_1",
        title: "Digital Logic Basics",
        url: "https://example.com/digital-logic-basics",
        sourceName: "Khan Academy",
        summary:
          "An introductory course on digital logic covering number systems, Boolean algebra, logic gates, and truth tables. The lessons include interactive exercises and visualizations to help understand the fundamental concepts of digital logic design.",
        contentType: "Course",
        difficulty: "Beginner",
        keywords: ["digital logic", "Boolean algebra", "logic gates", "truth tables"],
        accessNotes: "Free access",
      },
      {
        id: "res5_2",
        title: "CMOS Logic Gate Design",
        url: "https://example.com/cmos-logic-gates",
        sourceName: "VLSI Systems Design",
        summary:
          "This article explains how CMOS technology is used to implement various logic gates. It covers the transistor-level design of basic gates (NOT, NAND, NOR) and more complex gates (XOR, XNOR), with analysis of power consumption, propagation delay, and area considerations.",
        contentType: "Article",
        difficulty: "Intermediate",
        keywords: ["CMOS", "logic gates", "transistor-level design", "power consumption"],
        accessNotes: "Free with registration",
      },
      {
        id: "res5_3",
        title: "Combinatorial Circuit Design",
        url: "https://example.com/combinatorial-circuits",
        sourceName: "Digital Design Journal",
        summary:
          "A practical guide to designing combinatorial circuits including multiplexers, decoders, encoders, and arithmetic circuits. The article provides design examples, optimization techniques, and implementation considerations for real-world applications.",
        contentType: "Tutorial",
        difficulty: "Intermediate",
        keywords: ["combinatorial circuits", "multiplexers", "decoders", "adders", "design"],
        accessNotes: "Free access with limited articles per month",
      },
    ],
  },
  ch6: {
    id: "ch6",
    title: "Introduction to Analog Circuits",
    sectionTitle: "I. Semiconductor Fundamentals",
    introductoryText:
      "While digital circuits process discrete values, analog circuits work with continuous signals that represent real-world phenomena like sound, light, and temperature. This chapter introduces the fundamental concepts of analog circuit design using semiconductor devices. We'll explore basic analog building blocks and their applications in signal processing and conditioning.",
    keyTopics: [
      "Basic concepts: current, voltage, resistance, capacitance, inductance",
      "Semiconductor devices in analog applications",
      "Fundamental circuits: amplifiers, current mirrors, oscillators",
      "Key metrics: gain, bandwidth, noise, distortion",
      "Introduction to operational amplifiers and their applications",
    ],
    learningObjectives: [
      "Understand the key differences between analog and digital circuits",
      "Explain the operation of basic analog building blocks",
      "Analyze simple analog circuits using semiconductor device models",
      "Interpret key specifications of analog circuits",
      "Recognize common analog circuit topologies and their applications",
    ],
    resources: [
      {
        id: "res6_1",
        title: "Fundamentals of Analog Circuit Design",
        url: "https://example.com/analog-fundamentals",
        sourceName: "All About Circuits",
        summary:
          "A comprehensive introduction to analog circuit design principles, covering basic concepts like current, voltage, impedance, and frequency response. The tutorial explains how semiconductor devices are used in analog applications and introduces essential circuit analysis techniques.",
        contentType: "Tutorial",
        difficulty: "Beginner",
        keywords: ["analog", "circuit design", "impedance", "frequency response"],
        accessNotes: "Free access, no registration required",
      },
      {
        id: "res6_2",
        title: "Operational Amplifiers: Theory and Applications",
        url: "https://example.com/op-amps",
        sourceName: "Analog Devices Technical Library",
        summary:
          "This resource explains operational amplifier fundamentals, including ideal vs. real op-amp characteristics, common configurations (inverting, non-inverting, differential), and practical application circuits. It includes design guidelines and troubleshooting tips for op-amp circuits.",
        contentType: "Article",
        difficulty: "Intermediate",
        keywords: ["operational amplifiers", "op-amps", "analog design", "signal conditioning"],
        accessNotes: "Free access with registration",
      },
      {
        id: "res6_3",
        title: "Analog Building Blocks: Current Mirrors and Bias Circuits",
        url: "https://example.com/current-mirrors",
        sourceName: "IEEE Solid-State Circuits Magazine",
        summary:
          "An in-depth exploration of current mirrors and bias circuits as fundamental building blocks in analog IC design. The article covers various current mirror topologies, temperature compensation techniques, and practical design considerations for achieving precise current references in analog circuits.",
        contentType: "Paper Abstract",
        difficulty: "Advanced",
        keywords: ["current mirrors", "bias circuits", "analog IC design", "reference circuits"],
        accessNotes: "Abstract free, full paper requires IEEE subscription",
      },
    ],
  },
  ch7: {
    id: "ch7",
    title: "Hardware Description Languages (HDLs)",
    sectionTitle: "II. IC Design & EDA",
    introductoryText:
      "Hardware Description Languages (HDLs) are specialized programming languages used to describe the structure and behavior of electronic circuits. This chapter introduces the most common HDLs—Verilog, VHDL, and SystemVerilog—and explains how they are used in the digital design process. Understanding HDLs is essential for modern IC design, as they enable designers to create complex digital systems efficiently.",
    keyTopics: [
      "Introduction to Verilog, VHDL, and SystemVerilog",
      "Basic syntax and language constructs",
      "Modeling combinational and sequential logic",
      "Register Transfer Level (RTL) design methodology",
      "Simulation and testbench development",
    ],
    learningObjectives: [
      "Understand the purpose and capabilities of Hardware Description Languages",
      "Write basic HDL code for combinational and sequential circuits",
      "Distinguish between behavioral, structural, and RTL modeling styles",
      "Create simple testbenches for design verification",
      "Recognize good coding practices for synthesis",
    ],
    resources: [
      {
        id: "res7_1",
        title: "Introduction to Verilog HDL",
        url: "https://example.com/verilog-intro",
        sourceName: "FPGA Tutorial",
        summary:
          "A beginner-friendly introduction to Verilog HDL, covering language syntax, data types, operators, and basic modeling techniques. The tutorial includes numerous code examples for common digital circuits and explains the difference between simulation and synthesis constructs.",
        contentType: "Tutorial",
        difficulty: "Beginner",
        keywords: ["Verilog", "HDL", "digital design", "RTL", "coding"],
        accessNotes: "Free access, no registration required",
      },
      {
        id: "res7_2",
        title: "VHDL Design Fundamentals",
        url: "https://example.com/vhdl-fundamentals",
        sourceName: "EDA Playground",
        summary:
          "This interactive course covers VHDL language basics, entity-architecture paradigm, concurrent and sequential statements, and design organization. It includes hands-on exercises with an online simulator to practice writing and testing VHDL code.",
        contentType: "Course",
        difficulty: "Intermediate",
        keywords: ["VHDL", "entity-architecture", "concurrent", "sequential", "simulation"],
        accessNotes: "Free access with registration",
      },
      {
        id: "res7_3",
        title: "SystemVerilog for Design and Verification",
        url: "https://example.com/systemverilog",
        sourceName: "Verification Academy",
        summary:
          "An overview of SystemVerilog as both a design and verification language. The article explains the enhancements SystemVerilog brings over traditional Verilog, including new data types, interfaces, assertions, and object-oriented programming features for testbench development.",
        contentType: "Article",
        difficulty: "Advanced",
        keywords: ["SystemVerilog", "verification", "assertions", "interfaces", "OOP"],
        accessNotes: "Free with registration",
      },
    ],
  },
  ch8: {
    id: "ch8",
    title: "Digital Design Flow & Methodologies",
    sectionTitle: "II. IC Design & EDA",
    introductoryText:
      "The digital design flow is a structured process for transforming a conceptual design into a manufacturable integrated circuit. This chapter provides an overview of the entire digital design flow, from specification to tapeout. Understanding this flow is crucial for IC designers, as it provides the framework within which all design activities take place.",
    keyTopics: [
      "Overview of the digital design flow: Specification to Tapeout",
      "RTL design and coding guidelines",
      "Logic synthesis and optimization",
      "Place and route (P&R) fundamentals",
      "Static timing analysis (STA) and signoff",
    ],
    learningObjectives: [
      "Describe the complete digital design flow and its major stages",
      "Understand the inputs and outputs of each design stage",
      "Recognize the key challenges and considerations at each stage",
      "Explain how design constraints influence the implementation",
      "Identify the tools and methodologies used throughout the flow",
    ],
    resources: [
      {
        id: "res8_1",
        title: "Digital IC Design Flow: From Concept to Silicon",
        url: "https://example.com/ic-design-flow",
        sourceName: "SemiEngineering",
        summary:
          "A comprehensive overview of the digital IC design flow, explaining each stage from specification and RTL design through synthesis, place and route, verification, and tapeout. The article discusses the tools, inputs, outputs, and key considerations at each stage of the process.",
        contentType: "Article",
        difficulty: "Intermediate",
        keywords: ["design flow", "RTL", "synthesis", "place and route", "tapeout"],
        accessNotes: "Free access",
      },
      {
        id: "res8_2",
        title: "Logic Synthesis Fundamentals",
        url: "https://example.com/logic-synthesis",
        sourceName: "Synopsys Technical Blog",
        summary:
          "This technical article explains the principles of logic synthesis, the process of converting RTL code into an optimized gate-level netlist. It covers technology mapping, timing optimization, area optimization, and power optimization techniques used in modern synthesis tools.",
        contentType: "Technical Blog",
        difficulty: "Advanced",
        keywords: ["synthesis", "optimization", "timing", "area", "power"],
        accessNotes: "Free access",
      },
      {
        id: "res8_3",
        title: "Static Timing Analysis Explained",
        url: "https://example.com/sta-explained",
        sourceName: "VLSI System Design",
        summary:
          "An introduction to Static Timing Analysis (STA), a critical step in verifying that a digital design meets its timing requirements. The tutorial covers timing paths, setup and hold checks, clock domains, and common timing violations with strategies to resolve them.",
        contentType: "Tutorial",
        difficulty: "Intermediate",
        keywords: ["STA", "timing analysis", "setup time", "hold time", "clock domains"],
        accessNotes: "Free with registration",
      },
    ],
  },
  // Add placeholder data for remaining chapters
  ch9: {
    id: "ch9",
    title: "Design Verification",
    sectionTitle: "II. IC Design & EDA",
    introductoryText:
      "Design verification is a critical phase in the IC design process that ensures the functionality of a design matches its specification. This chapter covers various verification methodologies and techniques used to validate digital designs before manufacturing. Effective verification is essential for reducing costly design iterations and ensuring product quality.",
    keyTopics: [
      "Verification methodologies and planning",
      "Simulation-based verification techniques",
      "Formal verification approaches",
      "Assertion-based verification",
      "Coverage metrics and analysis",
    ],
    learningObjectives: [
      "Understand the importance of verification in the IC design process",
      "Compare different verification methodologies and their applications",
      "Create effective testbenches for design validation",
      "Apply assertion-based techniques to verify design properties",
      "Analyze coverage metrics to assess verification completeness",
    ],
    resources: [
      {
        id: "res9_1",
        title: "Introduction to IC Design Verification",
        url: "https://example.com/design-verification-intro",
        sourceName: "Verification Academy",
        summary:
          "A comprehensive introduction to IC design verification, covering the fundamentals of verification planning, testbench architecture, and verification methodologies. The course explains why verification is critical and provides an overview of the various techniques used in modern verification environments.",
        contentType: "Course",
        difficulty: "Beginner",
        keywords: ["verification", "testbench", "simulation", "methodology"],
        accessNotes: "Free access with registration",
      },
      {
        id: "res9_2",
        title: "Universal Verification Methodology (UVM)",
        url: "https://example.com/uvm-overview",
        sourceName: "Accellera",
        summary:
          "An overview of the Universal Verification Methodology (UVM), an industry-standard methodology for verifying integrated circuit designs. The article explains UVM components, architecture, and how it enables the creation of reusable, scalable verification environments.",
        contentType: "Article",
        difficulty: "Intermediate",
        keywords: ["UVM", "SystemVerilog", "verification", "reusability"],
        accessNotes: "Free access",
      },
      {
        id: "res9_3",
        title: "Formal Verification Techniques",
        url: "https://example.com/formal-verification",
        sourceName: "IEEE Design & Test",
        summary:
          "This paper discusses formal verification techniques for hardware design, including model checking, equivalence checking, and property verification. It explains how formal methods can complement simulation-based approaches to achieve more comprehensive verification coverage.",
        contentType: "Paper Abstract",
        difficulty: "Advanced",
        keywords: ["formal verification", "model checking", "equivalence checking", "properties"],
        accessNotes: "Abstract free, full paper requires IEEE subscription",
      },
    ],
  },
  // Add more placeholder chapters following the same pattern
  ch10: {
    id: "ch10",
    title: "Physical Design & Layout",
    sectionTitle: "II. IC Design & EDA",
    introductoryText:
      'Physical design transforms a logical circuit description into the physical layout that \n      "Physical design transforms a logical circuit description into the physical layout that will be manufactured as an integrated circuit. This chapter covers the process of converting a gate-level netlist into a physical layout, including floorplanning, placement, routing, and design rule checking. Understanding physical design is crucial for creating manufacturable and high-performance ICs.',
    keyTopics: [
      "Floorplanning and chip organization",
      "Placement algorithms and strategies",
      "Clock tree synthesis (CTS)",
      "Global and detailed routing techniques",
      "Design rule checking (DRC) and layout vs. schematic (LVS)",
    ],
    learningObjectives: [
      "Understand the physical design flow and its major stages",
      "Explain the challenges and considerations in floorplanning and placement",
      "Describe clock tree synthesis and its importance for timing",
      "Recognize routing constraints and techniques for addressing congestion",
      "Apply design rule checking to ensure manufacturability",
    ],
    resources: [
      {
        id: "res10_1",
        title: "Introduction to IC Physical Design",
        url: "https://example.com/physical-design-intro",
        sourceName: "VLSI System Design",
        summary:
          "A comprehensive introduction to IC physical design, covering the entire flow from floorplanning to final layout. The tutorial explains each step in detail with examples and illustrations to help understand the transformation from logical to physical representation.",
        contentType: "Tutorial",
        difficulty: "Beginner",
        keywords: ["physical design", "floorplanning", "placement", "routing", "layout"],
        accessNotes: "Free access with registration",
      },
      {
        id: "res10_2",
        title: "Clock Tree Synthesis Techniques",
        url: "https://example.com/cts-techniques",
        sourceName: "Cadence Design Blog",
        summary:
          "This article discusses various clock tree synthesis techniques and their impact on power, performance, and area. It covers H-tree, mesh, and hybrid approaches, along with strategies for managing clock skew and optimizing power consumption in modern IC designs.",
        contentType: "Article",
        difficulty: "Intermediate",
        keywords: ["clock tree", "CTS", "skew", "power optimization", "timing"],
        accessNotes: "Free access",
      },
      {
        id: "res10_3",
        title: "Advanced Routing Algorithms for Nanometer Designs",
        url: "https://example.com/advanced-routing",
        sourceName: "ACM Transactions on Design Automation",
        summary:
          "A research paper exploring advanced routing algorithms for nanometer-scale IC designs. The paper discusses techniques for handling complex design rules, managing congestion, and optimizing for multiple objectives including timing, power, and signal integrity.",
        contentType: "Paper Abstract",
        difficulty: "Advanced",
        keywords: ["routing", "algorithms", "congestion", "design rules", "optimization"],
        accessNotes: "Abstract free, full paper requires ACM subscription",
      },
    ],
  },
  ch11: {
    id: "ch11",
    title: "Analog & Mixed-Signal Design Flow",
    sectionTitle: "II. IC Design & EDA",
    introductoryText:
      "Analog and mixed-signal design presents unique challenges compared to digital design. This chapter explores the specialized design flow for analog and mixed-signal circuits, from specification to layout. We'll cover the tools, methodologies, and verification techniques specific to analog design, highlighting the differences from digital design approaches.",
    keyTopics: [
      "Analog design specifications and requirements",
      "Schematic capture and circuit simulation",
      "Analog layout considerations and techniques",
      "Mixed-signal verification methodologies",
      "Analog design for manufacturability",
    ],
    learningObjectives: [
      "Understand the analog design flow and its key differences from digital design",
      "Apply appropriate simulation techniques for analog circuit verification",
      "Recognize critical layout considerations for analog circuits",
      "Explain the challenges of mixed-signal verification",
      "Implement design for manufacturability techniques in analog layouts",
    ],
    resources: [
      {
        id: "res11_1",
        title: "Analog IC Design Methodology",
        url: "https://example.com/analog-design-methodology",
        sourceName: "Analog Devices Engineering Journal",
        summary:
          "A comprehensive overview of analog IC design methodology, covering the entire flow from specifications to tape-out. The article discusses design approaches, simulation strategies, and layout techniques specific to analog circuits, with practical examples from real-world designs.",
        contentType: "Article",
        difficulty: "Intermediate",
        keywords: ["analog design", "methodology", "simulation", "layout", "verification"],
        accessNotes: "Free access with registration",
      },
      {
        id: "res11_2",
        title: "SPICE Simulation Fundamentals",
        url: "https://example.com/spice-fundamentals",
        sourceName: "All About Circuits",
        summary:
          "This tutorial introduces SPICE simulation for analog circuit design, covering model selection, analysis types (DC, AC, transient), and result interpretation. It includes practical examples of common analog circuits and explains how to set up effective simulations to verify circuit performance.",
        contentType: "Tutorial",
        difficulty: "Beginner",
        keywords: ["SPICE", "simulation", "analog", "circuit analysis", "models"],
        accessNotes: "Free access, no registration required",
      },
      {
        id: "res11_3",
        title: "Mixed-Signal Verification Challenges and Solutions",
        url: "https://example.com/mixed-signal-verification",
        sourceName: "IEEE Design & Test",
        summary:
          "This paper discusses the unique challenges of verifying mixed-signal designs and presents methodologies to address them. It covers AMS (Analog Mixed-Signal) simulation, real number modeling, and verification planning for complex mixed-signal systems.",
        contentType: "Paper Abstract",
        difficulty: "Advanced",
        keywords: ["mixed-signal", "verification", "AMS", "real number modeling", "simulation"],
        accessNotes: "Abstract free, full paper requires IEEE subscription",
      },
    ],
  },
  ch12: {
    id: "ch12",
    title: "Design for Manufacturing (DFM) & Design for Test (DFT)",
    sectionTitle: "II. IC Design & EDA",
    introductoryText:
      "Design for Manufacturing (DFM) and Design for Test (DFT) are critical considerations in modern IC design. This chapter explores techniques to enhance manufacturability and testability, which directly impact yield, reliability, and cost. We'll examine how DFM and DFT methodologies are integrated throughout the design flow to ensure successful production and testing of integrated circuits.",
    keyTopics: [
      "DFM techniques and methodologies",
      "Lithography-aware design and resolution enhancement techniques",
      "DFT strategies and scan-based testing",
      "Built-In Self-Test (BIST) architectures",
      "Yield analysis and optimization",
    ],
    learningObjectives: [
      "Understand the importance of DFM and DFT in the IC design process",
      "Apply DFM techniques to improve manufacturability and yield",
      "Implement scan-based testing methodologies for digital circuits",
      "Design effective BIST structures for memory and logic testing",
      "Analyze yield data to identify and address manufacturing issues",
    ],
    resources: [
      {
        id: "res12_1",
        title: "Design for Manufacturing: Principles and Practices",
        url: "https://example.com/dfm-principles",
        sourceName: "SemiEngineering",
        summary:
          "A comprehensive guide to Design for Manufacturing in semiconductor design, covering lithography considerations, process variation management, and layout optimization techniques. The article explains how DFM impacts yield and reliability, with practical guidelines for designers.",
        contentType: "Article",
        difficulty: "Intermediate",
        keywords: ["DFM", "manufacturability", "lithography", "process variation", "yield"],
        accessNotes: "Free access",
      },
      {
        id: "res12_2",
        title: "Scan-Based Design for Test",
        url: "https://example.com/scan-based-dft",
        sourceName: "Synopsys Technical Blog",
        summary:
          "This tutorial explains scan-based Design for Test techniques, including scan insertion, test pattern generation, and fault coverage analysis. It covers design considerations for implementing effective scan chains and achieving high fault coverage in digital circuits.",
        contentType: "Tutorial",
        difficulty: "Intermediate",
        keywords: ["DFT", "scan testing", "ATPG", "fault coverage", "testability"],
        accessNotes: "Free access",
      },
      {
        id: "res12_3",
        title: "Memory Built-In Self-Test Architectures",
        url: "https://example.com/memory-bist",
        sourceName: "IEEE Transactions on VLSI Systems",
        summary:
          "A research paper on advanced Built-In Self-Test architectures for memory testing. The paper discusses various BIST algorithms, controller designs, and optimization techniques for testing different types of memory structures in modern SoCs.",
        contentType: "Paper Abstract",
        difficulty: "Advanced",
        keywords: ["BIST", "memory testing", "fault models", "test algorithms", "SoC"],
        accessNotes: "Abstract free, full paper requires IEEE subscription",
      },
    ],
  },
  ch13: {
    id: "ch13",
    title: "Electronic Design Automation (EDA) Tools",
    sectionTitle: "II. IC Design & EDA",
    introductoryText:
      "Electronic Design Automation (EDA) tools are essential for modern semiconductor design, enabling engineers to create increasingly complex integrated circuits. This chapter provides an overview of the EDA ecosystem, including major tool categories, vendors, and emerging trends. Understanding the capabilities and limitations of EDA tools is crucial for effective IC design in today's competitive landscape.",
    keyTopics: [
      "EDA tool categories and their functions",
      "Major EDA vendors and their offerings",
      "Tool integration and design flows",
      "Cloud-based EDA and collaborative design",
      "Emerging trends in EDA technology",
    ],
    learningObjectives: [
      "Identify the major categories of EDA tools and their roles in the design process",
      "Compare offerings from different EDA vendors",
      "Understand how tools are integrated into cohesive design flows",
      "Evaluate the benefits and challenges of cloud-based EDA",
      "Recognize emerging trends and technologies in the EDA industry",
    ],
    resources: [
      {
        id: "res13_1",
        title: "Introduction to Electronic Design Automation",
        url: "https://example.com/eda-introduction",
        sourceName: "Semiconductor Engineering",
        summary:
          "A comprehensive overview of Electronic Design Automation, covering the evolution of EDA tools, major categories, and their role in the semiconductor design process. The article explains how EDA enables the design of complex integrated circuits and discusses the EDA ecosystem.",
        contentType: "Article",
        difficulty: "Beginner",
        keywords: ["EDA", "design tools", "automation", "semiconductor design", "CAD"],
        accessNotes: "Free access",
      },
      {
        id: "res13_2",
        title: "EDA Tool Integration and Design Flows",
        url: "https://example.com/eda-integration",
        sourceName: "Cadence Design Blog",
        summary:
          "This article discusses the integration of various EDA tools into cohesive design flows, covering data formats, APIs, and methodologies for seamless tool interoperability. It explains how effective tool integration improves design productivity and quality.",
        contentType: "Article",
        difficulty: "Intermediate",
        keywords: ["tool integration", "design flow", "interoperability", "productivity", "data formats"],
        accessNotes: "Free access",
      },
      {
        id: "res13_3",
        title: "Cloud-Based EDA: Opportunities and Challenges",
        url: "https://example.com/cloud-eda",
        sourceName: "DAC Proceedings",
        summary:
          "A research paper examining the shift toward cloud-based EDA, discussing the benefits, challenges, and implementation strategies. The paper covers performance considerations, security concerns, licensing models, and case studies of successful cloud EDA deployments.",
        contentType: "Paper Abstract",
        difficulty: "Advanced",
        keywords: ["cloud EDA", "SaaS", "security", "scalability", "collaboration"],
        accessNotes: "Abstract free, full paper requires purchase",
      },
    ],
  },
  ch14: {
    id: "ch14",
    title: "Wafer Fabrication Overview & Cleanrooms",
    sectionTitle: "III. Manufacturing Processes",
    introductoryText:
      "Wafer fabrication is the process of creating integrated circuits on silicon wafers. This chapter provides an overview of the wafer fabrication process, from raw silicon to processed wafers, and explains the critical role of cleanrooms in semiconductor manufacturing. Understanding these fundamental manufacturing concepts is essential for anyone involved in the semiconductor industry.",
    keyTopics: [
      "Silicon wafer production and preparation",
      "Cleanroom classifications and protocols",
      "Wafer fabrication process flow overview",
      "Contamination control and yield management",
      "Manufacturing equipment and automation",
    ],
    learningObjectives: [
      "Describe the process of creating silicon wafers from raw materials",
      "Understand cleanroom classifications and their importance in semiconductor manufacturing",
      "Explain the major steps in the wafer fabrication process",
      "Recognize sources of contamination and strategies for control",
      "Identify key equipment used in wafer fabrication facilities",
    ],
    resources: [
      {
        id: "res14_1",
        title: "From Sand to Silicon: The Making of a Chip",
        url: "https://example.com/sand-to-silicon",
        sourceName: "Intel Technology Journal",
        summary:
          "A comprehensive overview of the process of transforming raw silicon into finished semiconductor chips. The article traces the journey from silicon purification through wafer creation, fabrication processes, and final testing, with illustrations of each major step.",
        contentType: "Article",
        difficulty: "Beginner",
        keywords: ["silicon", "wafer", "fabrication", "manufacturing", "chip production"],
        accessNotes: "Free access",
      },
      {
        id: "res14_2",
        title: "Cleanroom Technology in Semiconductor Manufacturing",
        url: "https://example.com/cleanroom-technology",
        sourceName: "Semiconductor Manufacturing Handbook",
        summary:
          "This chapter explains cleanroom technology, including classification standards, design considerations, and operational protocols. It covers air filtration systems, gowning procedures, monitoring techniques, and contamination control strategies essential for semiconductor manufacturing.",
        contentType: "Book Chapter",
        difficulty: "Intermediate",
        keywords: ["cleanroom", "contamination control", "ISO standards", "HEPA filtration", "protocols"],
        accessNotes: "Preview available, full access requires purchase",
      },
      {
        id: "res14_3",
        title: "Wafer Fabrication Equipment: Evolution and Automation",
        url: "https://example.com/fab-equipment",
        sourceName: "SEMI Technology Symposium",
        summary:
          "A technical overview of wafer fabrication equipment, tracing its evolution and increasing automation. The paper discusses major equipment categories, technological advancements, and the trend toward fully automated fabs with AI-enhanced process control.",
        contentType: "Paper Abstract",
        difficulty: "Advanced",
        keywords: ["fabrication equipment", "automation", "process control", "smart manufacturing", "Industry 4.0"],
        accessNotes: "Abstract free, full paper requires SEMI membership",
      },
    ],
  },
  // Continue with remaining chapters following the same pattern
}

// Function to get chapter data
export function getChapterData(chapterId: string): Chapter | undefined {
  return handbookData[chapterId]
}

// Function to get resources for a chapter
export function getResourcesForChapter(chapterId: string): Resource[] {
  const chapter = handbookData[chapterId]
  return chapter ? chapter.resources : []
}

// Function to get all chapter IDs
export function getAllChapterIds(): string[] {
  return Object.keys(handbookData)
}

// Function to get chapter by section
export function getChaptersBySection(sectionTitle: string): Chapter[] {
  return Object.values(handbookData).filter((chapter) => chapter.sectionTitle === sectionTitle)
}

// Function to get all section titles
export function getAllSectionTitles(): string[] {
  const sections = new Set<string>()
  Object.values(handbookData).forEach((chapter) => {
    sections.add(chapter.sectionTitle)
  })
  return Array.from(sections)
}
