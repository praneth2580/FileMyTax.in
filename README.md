# 🧾 FileMyTax.in

A guided Indian Income Tax Return (ITR) filing assistant that helps users calculate tax liability, compare regimes, manage deductions, and file returns for multiple taxpayers under one account.

<div align="center">
  <img src="./public/logo.png" alt="FileMyTax.in Logo" width="200" />
</div>

## 🚀 Core Features

*   **Multi-Taxpayer Management**: One account to manage tax returns for multiple individuals (e.g., family members).
*   **Guided ITR Wizard**: A simple 5-step process (Personal Details -> Income -> Deductions -> Regime Comparison -> Review).
*   **Smart Tax Regime Comparison**: Side-by-side comparison of Old vs. New tax regimes to maximize savings.
*   **Comprehensive Income Sources**: Support for Salary, House Property, Business, Capital Gains, and Other Sources.
*   **Document Management**: Upload and track Form 16, 26AS, AIS, and investment proofs.

## 🛠️ Technology Stack

This project is built with modern, high-performance web technologies:

*   **React 19**: Frontend UI library
*   **TypeScript**: Static typing
*   **Vite**: Build tool and dev server
*   **Lucide React**: Iconography
*   **React Router**: Navigation

## 📖 UX Architecture

The application is structured around 7 core pages designed for clarity and ease of use:

1.  **Dashboard**: Instant clarity on filing status, pending actions, and estimated tax/refund.
2.  **My Taxpayers**: Manage profiles, add new taxpayers with PAN validation and income type selection.
3.  **Start Filing (Wizard)**: The core 5-step guided process with auto-save functionality.
4.  **Documents**: Centralized upload area for all tax-related documents.
5.  **Tax Summary**: A transparent breakdown of income, deductions, and tax computation.
6.  **Submit & Track**: E-verification guidance and submission tracking timeline.
7.  **Settings**: Account management and data export controls.

### Design Philosophy
*   **Aesthetics**: Professional fintech tone (Deep blue primary accent, modern typography).
*   **Usability**: Card-based UI structure, strong numeric hierarchy, and clear validation states.
*   **Trust**: Designed to feel calm, structured, and trustworthy—like a digital tax advisor.

## 💻 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm

### Installation

1.  Clone the repository (if applicable) or navigate to the project directory:
    ```bash
    cd FileMyTax.in
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

Start the development server:
```bash
npm run dev
```

### Building for Production

Create a production build:
```bash
npm run build
```

## 📝 Scripts

*   `npm run dev`: Starts the Vite development server.
*   `npm run build`: Compiles TypeScript and builds the application for production.
*   `npm run lint`: Runs ESLint to check for code quality and style issues.
*   `npm run preview`: Locally previews the production build.
