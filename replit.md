# IRAC Visualizer

## Overview
IRAC Visualizer is a web application designed for law students to structure and visualize their legal analysis using the IRAC framework (Issue, Rule, Application, Conclusion).

## Project Structure
```
├── src/
│   └── server.js       # Express server
├── public/
│   ├── index.html      # Main HTML page
│   ├── styles.css      # Styling
│   └── app.js          # Frontend JavaScript
├── package.json        # Node.js dependencies
└── .gitignore          # Git ignore file
```

## Tech Stack
- **Backend**: Node.js with Express
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Port**: 5000

## Features
- Four-section IRAC input form (Issue, Rule, Application, Conclusion)
- Live preview of the analysis
- Local storage persistence
- Export analysis to text file
- Responsive design

## Running the Application
The application runs via the "IRAC Visualizer" workflow which executes `npm start` and serves on port 5000.

## Recent Changes
- January 30, 2026: Initial setup - Created IRAC Visualizer web application
