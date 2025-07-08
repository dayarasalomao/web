# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional medical website for Dr. Dayara Salomão, a coloproctologist (specialist in diseases of the colon, rectum, and anus) based in Curitiba, Brazil. The website showcases her medical practice, treatments, and provides appointment booking information.

## Technology Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Fonts**: Google Fonts (Montserrat for sans-serif, Cinzel for serif)
- **Deployment**: Designed for Vercel

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Brand Design System

The website uses a sophisticated medical brand palette:

- **Primary Colors**:
  - Copper: `#A35442` (main brand color)
  - Teal: `#1D414C` (professional accent)
  - Beige: `#D7CBBF` (warm neutral)
  - Cream: `#F4F3F2` (light background)
  - Straw: `#D1AF8B` (warm accent)

- **Typography**:
  - Headlines: Cinzel (serif) - `font-serif`
  - Body text: Montserrat (sans-serif) - `font-sans`
  - Font variables: `--font-geist-sans` and `--font-cinzel`

## Architecture

### Component Structure

The website follows a single-page application structure with sections as components:

- **Header.tsx**: Navigation with logo, menu items, and mobile hamburger
- **Hero.tsx**: Main landing section with doctor's photo and introduction
- **About.tsx**: Personal introduction and credentials
- **WhenToSeek.tsx**: Symptoms that require specialist consultation
- **Diseases.tsx**: Conditions treated by the doctor
- **Treatments.tsx**: Available procedures and technologies
- **Testimonials.tsx**: Patient reviews and ratings
- **CV.tsx**: Educational background and qualifications
- **Contact.tsx**: Location details and appointment booking
- **Footer.tsx**: Site-wide footer with contact info and links

### Content Source

All medical content, contact information, and testimonials are sourced from `docs/website_content.md`. This file contains the authoritative content including:

- Medical conditions and descriptions
- Treatment procedures
- Patient testimonials
- Professional qualifications
- Contact details (Eco Medical Center, Curitiba)

### Assets Organization

```bash
public/
├── assets/           # Professional photos of Dr. Dayara
├── core/            # Logo and branding elements
└── temp/            # Temporary design assets
```

### Key Design Principles

1. **Medical Professionalism**: Clean, trustworthy design appropriate for healthcare
2. **Warm Approachability**: Color palette and imagery convey empathy and care
3. **Accessibility**: High contrast ratios, semantic HTML, proper focus states
4. **Mobile-First**: Responsive design optimized for all devices
5. **Performance**: Optimized images, efficient CSS, fast loading

### Font Configuration

Fonts are loaded via Next.js font optimization in `layout.tsx`:

- Montserrat mapped to `--font-geist-sans` variable
- Cinzel mapped to `--font-cinzel` variable
- Used in Tailwind config as `font-sans` and `font-serif`

### Important Notes

- All content should be in Portuguese (Brazilian)
- Medical terminology should be accurate and patient-friendly
- Contact information must match the practice location in Curitiba
- Maintain WCAG accessibility standards for medical websites
- The `@tailwindcss/typography` plugin is referenced in config but not currently needed
