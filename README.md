# AI ROI Calculator

A comprehensive ROI calculator designed for law firms to compare the costs and benefits of implementing AI systems versus hiring additional staff.

## Features

- **Cost Comparison**: Compare total cost of ownership between AI implementation and hiring employees
- **Dynamic Pricing**: Tiered pricing models based on firm size (Small, Medium, Large, Enterprise)
- **Comprehensive Calculations**: Includes implementation costs, training costs, and ongoing expenses
- **Real-time Animations**: Smooth number animations for immediate visual feedback
- **Professional UI**: Clean, responsive design suitable for executive decision-making
- **Detailed Metrics**: ROI, payback period, profit increases, and savings analysis

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```sh
git clone <YOUR_GIT_URL>
cd ai-roi-calculator
```

2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Technologies Used

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library with hooks
- **shadcn/ui** - Modern component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── ROICalculator.tsx  # Main calculator component
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── pages/            # Application pages
```

## Deployment

Build the project for production:

```sh
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.
