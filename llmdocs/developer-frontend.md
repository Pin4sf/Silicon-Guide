# Silicon Guide - Frontend Developer Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Key Components](#key-components)
5. [Content Management](#content-management)
6. [Authentication](#authentication)
7. [State Management](#state-management)
8. [AI Features](#ai-features)
9. [Styling](#styling)
10. [Updating Content](#updating-content)

## Introduction

Silicon Guide is a comprehensive learning platform for semiconductor technology. It provides a structured handbook, interactive features, and AI-assisted learning tools to help users understand semiconductor concepts from basic physics to advanced manufacturing techniques.

The platform includes:
- A structured handbook with chapters and sections
- Note-taking capabilities
- Annotation tools
- AI-powered tutoring and research assistance
- User progress tracking
- Personalized learning paths

## Technologies Used

The frontend is built with the following technologies:

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **UI Components**: 
  - shadcn/ui (based on Radix UI)
  - Tailwind CSS for styling
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Routing**: Next.js App Router
- **Dark Mode**: next-themes

## Project Structure

The project follows the Next.js App Router structure:

\`\`\`
silicon_guide/
├── app/                    # Application routes
│   ├── auth/               # Authentication routes
│   ├── handbook/           # Handbook routes
│   ├── notes/              # Notes routes
│   ├── annotations/        # Annotations routes
│   ├── profile/            # User profile routes
│   ├── glossary/           # Glossary route
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── ai/                 # AI-related components
│   ├── annotations/        # Annotation components
│   ├── auth/               # Authentication components
│   ├── chat/               # Chat components
│   ├── handbook/           # Handbook components
│   ├── icons/              # Custom icons
│   ├── layout/             # Layout components
│   ├── notes/              # Note-taking components
│   ├── profile/            # Profile components
│   ├── theme-provider.tsx  # Theme provider
│   └── ui/                 # UI components (shadcn)
├── hooks/                  # Custom hooks
├── lib/                    # Utility functions and data
│   ├── firebase.ts         # Firebase configuration
│   ├── handbook-data.ts    # Handbook content data
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
\`\`\`

## Key Components

### Layout Components

- **MainLayout (`components/layout/main-layout.tsx`)**: The main layout wrapper that includes the sidebar, header, and content area.
- **Sidebar (`components/layout/sidebar.tsx`)**: Navigation sidebar with collapsible sections for handbook chapters.

### Handbook Components

- **ChapterView (`components/handbook/chapter-view.tsx`)**: Displays chapter content with tabs for overview, key topics, and learning objectives.
- **ResourceList (`components/handbook/resource-list.tsx`)**: Displays resources related to a chapter.

### Note Components

- **NotesPage (`components/notes/notes-page.tsx`)**: Displays all user notes.
- **NoteEditor (`components/notes/note-editor.tsx`)**: Editor for creating and editing notes.
- **CreateNoteDialog (`components/notes/create-note-dialog.tsx`)**: Dialog for creating new notes.

### AI Components

- **ChatPanel (`components/chat/chat-panel.tsx`)**: AI chat interface for interacting with the tutor.
- **ChatButton (`components/chat/chat-button.tsx`)**: Floating button to open the chat panel.
- **ResearchAgent (`components/ai/research-agent.tsx`)**: AI tool for discovering resources.
- **LearningPathGenerator (`components/ai/learning-path-generator.tsx`)**: AI tool for generating personalized learning paths.
- **SessionSummarizer (`components/ai/session-summarizer.tsx`)**: AI tool for summarizing learning sessions.

### Authentication Components

- **AuthCheck (`components/auth/auth-check.tsx`)**: Component to check authentication status.
- **LoginForm (`components/auth/login-form.tsx`)**: Login form component.
- **SignupForm (`components/auth/signup-form.tsx`)**: Signup form component.

## Content Management

The handbook content is structured in the `lib/handbook-data.ts` file. It contains:

- **Chapters**: Individual chapters with titles, introductory text, key topics, learning objectives, and resources.
- **Sections**: Chapters are organized into sections (e.g., "Introduction", "Semiconductor Fundamentals").
- **Resources**: Each chapter has associated resources with metadata like title, URL, source, difficulty, etc.

The data is exported as TypeScript interfaces and objects:

\`\`\`typescript
export interface Resource {
  id: string;
  title: string;
  url: string;
  sourceName: string;
  summary: string;
  contentType: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  keywords: string[];
  accessNotes: string;
}

export interface Chapter {
  id: string;
  title: string;
  sectionTitle: string;
  introductoryText: string;
  keyTopics?: string[];
  learningObjectives?: string[];
  resources: Resource[];
}

export const handbookData: Record<string, Chapter> = {
  // Chapter data...
};
\`\`\`

## Authentication

Authentication is implemented using Firebase Authentication:

- **Login**: Email/password and Google authentication
- **Signup**: Email/password and Google authentication
- **Password Reset**: Email-based password reset
- **Auth Check**: Component to protect routes based on authentication status

The Firebase configuration is in `lib/firebase.ts`.

## State Management

State management is primarily handled through React hooks:

- **useState**: For component-level state
- **useEffect**: For side effects and data fetching
- **useContext**: For theme context (dark/light mode)

For more complex state like user progress, the application uses a combination of local state and mock data (to be replaced with Firestore in the final implementation).

## AI Features

The platform includes several AI-powered features:

- **AI Tutor**: Chat interface for asking questions about semiconductor topics
- **Research Agent**: Tool for discovering relevant resources
- **Learning Path Generator**: Tool for creating personalized learning paths
- **Session Summarizer**: Tool for summarizing learning sessions

These features are currently implemented with mock data and simulated responses, to be connected to real AI models in the final implementation.

## Styling

Styling is implemented using:

- **Tailwind CSS**: For utility-based styling
- **shadcn/ui**: For consistent UI components
- **Dark Mode**: Implemented using next-themes
- **Custom CSS**: Additional custom styles in globals.css

## Updating Content

### Modifying Handbook Content

To update the handbook content, modify the `handbookData` object in `lib/handbook-data.ts`:

#### Adding a New Chapter

1. Add a new entry to the `handbookData` object:

\`\`\`typescript
export const handbookData: Record<string, Chapter> = {
  // Existing chapters...
  
  chXX: {
    id: "chXX",
    title: "Your New Chapter Title",
    sectionTitle: "Section Title",
    introductoryText: "Introduction to the chapter...",
    keyTopics: [
      "Topic 1",
      "Topic 2",
      "Topic 3",
    ],
    learningObjectives: [
      "Objective 1",
      "Objective 2",
      "Objective 3",
    ],
    resources: [
      // Resources for this chapter
    ],
  },
};
\`\`\`

2. Update the sidebar component in `components/layout/sidebar.tsx` to include the new chapter in the appropriate section.

#### Modifying an Existing Chapter

1. Find the chapter in the `handbookData` object and update its properties:

\`\`\`typescript
ch3: {
  id: "ch3",
  title: "Updated Chapter Title",
  sectionTitle: "Section Title",
  introductoryText: "Updated introduction...",
  keyTopics: [
    "Updated Topic 1",
    "Updated Topic 2",
    "New Topic 3",
  ],
  // Other properties...
},
\`\`\`

#### Adding Resources to a Chapter

1. Add a new resource to the `resources` array of a chapter:

\`\`\`typescript
resources: [
  // Existing resources...
  {
    id: "resX_Y",
    title: "New Resource Title",
    url: "https://example.com/resource",
    sourceName: "Source Name",
    summary: "Resource summary...",
    contentType: "Article", // or "Video", "Course", etc.
    difficulty: "Intermediate", // or "Beginner", "Advanced"
    keywords: ["keyword1", "keyword2"],
    accessNotes: "Free access, no registration required",
  },
],
\`\`\`

### Updating the Glossary

To update the glossary, modify the `glossaryTerms` array in `app/glossary/page.tsx`:

\`\`\`typescript
const glossaryTerms = [
  {
    letter: "A",
    terms: [
      {
        term: "New Term",
        definition: "Definition of the new term...",
        relatedChapters: ["ch1", "ch3"],
      },
      // Other terms...
    ],
  },
  // Other letters...
];
\`\`\`

### Adding Images

To add new images for sections or other content:

1. Add the image file to the `public` directory
2. Reference it in the code using the path relative to `public`:

\`\`\`typescript
const handbookSections = [
  {
    title: "Section Title",
    image: "/your-new-image.png",
    // Other properties...
  },
  // Other sections...
];
\`\`\`

### Updating UI Components

To modify UI components:

1. Find the component in the `components` directory
2. Update the component code as needed
3. For shadcn/ui components, refer to the shadcn/ui documentation for customization options

### Adding New Features

To add new features:

1. Create new components in the appropriate subdirectory of `components`
2. Add new routes in the `app` directory if needed
3. Update existing components to reference the new features
