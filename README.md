# Visualizing Legal Analysis (IRAC Visualizer)

A modern, interactive legal analysis tool designed for law students to bridge the gap between complex fact patterns and formal IRAC (Issue, Rule, Application, Conclusion) structure.

## 🚀 Overview

This application provides a step-by-step visual workflow to help students:
- Identify the "Call of the Question"
- Perform "Semantic Chunking" of legal rules
- Map specific facts to rule elements
- Draft high-quality analysis using the "Because" formula

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

## 📂 Project Structure

```
├── src/
│   ├── App.jsx         # Main application logic and UI
│   ├── main.jsx        # Entry point
│   └── index.css       # Tailwind directives
├── public/             # Static assets
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # Tailwind configuration
```

## 🌟 Features

- **Progressive Disclosure:** Four distinct stages of legal analysis.
- **Interactive Fact Mapping:** Select facts from the hypothetical and see how they relate to specific rule elements.
- **Comparison Views:** Contrast strong analytical writing with common "conclusory traps."
- **Responsive Design:** Optimized for both desktop and mobile use.

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 🎓 Academic Goal

Legal analysis is often treated as storytelling, but for many students (especially those from technical backgrounds), it is more effectively understood as:
**Input (Facts) + Logic Gate (Rules) = Output (Conclusion)**.

This tool reinforces the mechanical advantage of focusing on the "Because" connection.
