<div align="center">

  # This project was originally created prior to my enrollment in CS50x.
  # I am submitting it as my final project because it solves a real-world problem and draws upon many of the lessons and concepts taught in the course.
  # No part of this project was submitted for any other course or academic credit.
  # Portions of the code were written with the assistance of GitHub Copilot / ChatGPT. These sections are clearly marked in the code where applicable.

  <br>

  <h1>AI STOCK-PREDICTION</h1>
  <p><em>Use local LLM's to predict market trends & advise user if they should Buy, Hold or Sell</em></p>

  <!-- Repository Metadata Badges -->
  <img alt="last-commit" src="https://img.shields.io/github/last-commit/J-Bourgeois/stock-predicition" />
  <img alt="repo-top-language" src="https://img.shields.io/github/languages/top/J-Bourgeois/stock-predicition" />
  <img alt="repo-language-count" src="https://img.shields.io/github/languages/count/J-Bourgeois/stock-predicition" />

  <p><em>Built with:</em></p>
  <img alt="JSON" src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" />
  <img alt="Markdown" src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white" />
  <img alt="npm" src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img alt="Ollama" src="https://img.shields.io/badge/Ollama-FFFFFF?style=for-the-badge&logo=ollama&logoColor=black" />
  <img alt="git" src="https://img.shields.io/badge/git-CB3837?style=for-the-badge&logo=git&logoColor=white" />
  <img alt="next" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="shadCN" src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"/>
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="redux" src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img alt="Sqlite" src="https://img.shields.io/badge/SQlite-3E67B1?style=for-the-badge&logo=SQlite&logoColor=white" />
  <img alt="ts-node" src="https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img alt="Zod" src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logoColor=white" />
</div>

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)

---

## Overview

**Stock-predicition** is a developer toolset built for real-time stock analysis and portfolio management. It combines data pipelines, UI components, and authentication for full-stack financial applications.

### Why use this?

- 🧩 **Data Integration:** Real-time prices, history, news.
- 🔐 **User Management:** Secure authentication and sessions.
- 📊 **Rich UI:** Interactive charts and modals.
- ⚙️ **State Management:** Efficient Redux-based state handling.
- 🎨 **Responsive Design:** Mobile-ready and theme-aware.

### Description of Project

This AI powered Stock-Prediciton app helps the user make valid investment insight into current trends of various stocks. Using a `Next.js` & `Node.js`tech stack for modern-fast development, `Typescript` for type validation to catch errors in development time instead of runtime & `Tailwind CSS` for quick styling, this tech stack is a new favorite among lots of front-end developers in 2025.

At the core of the application lies the [`app/api/LLM/route.ts`](app/api/LLM/route.ts), which serves as the bridge between user queries and AI-powered stock analysis. This component leverages Ollama's local LLM infrastructure to process complex market data and generate actionable trading recommendations. The system analyzes multiple data points, including technical indicators, news sentiment, and historical price patterns, to provide users with informed `Buy`, `Hold`, or `Avoid` recommendations.

The application's database architecture, defined in [`prisma/schema.prisma`](prisma/schema.prisma), implements a relational model using SQLite. This schema establishes crucial relationships between Users, Portfolios, and Stocks, enabling efficient data management and quick query responses. The decision to use SQLite was driven by its lightweight nature and excellent development workflow integration, while still maintaining the ability to scale to production databases if needed.

User interface components are organized in the [`components/`](components/) directory, following a modular architecture. Key components include the [`PortfolioPage.tsx`](components/PortfolioPage.tsx), which provides a comprehensive view of user investments, and [`HomeClientPage.tsx`](components/HomeClientPage.tsx), serving as the main dashboard for market overview. The [`ChangeUserInfoForm.tsx`](components/ChangeUserInfoForm.tsx) component handles user profile management with secure update mechanisms. Each component is built with reusability and maintainability in mind, utilizing TypeScript for type safety and error prevention.

State management is handled through Redux, with the store configuration in [`store/store.ts`](store/store.ts). This centralizes the application's state handling, managing everything from user authentication status to real-time stock data updates. The Redux implementation follows best practices for action creators, reducers, and selectors, ensuring predictable state updates and optimal performance.

The [`lib/`](lib/) directory houses utility functions and shared logic, including the crucial [`fetchStocks.ts`](lib/fetchStocks.ts) module that manages API interactions with external data providers. This module implements sophisticated error handling and rate limiting to ensure reliable data retrieval while respecting API constraints.

Authentication and security are implemented through the [`middleware.ts`](middleware.ts) file, which provides JWT-based authentication and route protection. The system includes secure session management and protection against common web vulnerabilities, ensuring user data remains private and secure.

The application's routing logic is managed through Next.js 14's App Router, with the main layout defined in [`app/layout.tsx`](app/layout.tsx). This setup enables efficient server-side rendering where beneficial while maintaining interactive client-side features where needed. The routing structure supports dynamic user routes and API endpoints, all protected by appropriate authentication checks.

Technical analysis capabilities are implemented in the LLM route, which calculates various market indicators including:
- Moving averages (30-day and 180-day periods)
- Price volatility metrics
- Trend analysis using linear regression
- News sentiment analysis with scoring algorithms

The UI components leverage ShadcN UI and Tailwind CSS for a responsive, modern interface. Dark and light theme support is implemented through a theme provider, ensuring a consistent user experience across different viewing preferences. The responsive design adapts seamlessly from mobile to desktop viewports.

Data visualization is handled through custom chart components that display stock price trends, technical indicators, and prediction overlays. These components are optimized for performance, using efficient rendering techniques and data memoization to handle real-time updates without compromising user experience.

The application's error handling strategy is comprehensive, with custom error boundaries and fallback components ensuring graceful degradation when issues occur. API errors, network failures, and data inconsistencies are all handled appropriately, with user-friendly error messages and recovery options.

Testing infrastructure is set up with Jest and React Testing Library, enabling comprehensive unit and integration testing of components and business logic. The project maintains high test coverage, ensuring reliability and making future modifications safer.

Environment configuration is managed through multiple `.env` files, following security best practices for handling sensitive credentials and API keys. The project includes templates and clear documentation for setting up development environments.

All these components work together to create a robust financial analysis platform that combines the power of AI with modern web technologies, providing users with sophisticated tools for making informed investment decisions. The architecture's modularity and clear separation of concerns make it both maintainable and extensible, ready for future enhancements and scaling requirements.

---

This project uses API's from <a href="www.stockdata.org/">stockdata.org</a> for Closing prices for last 180 days & news data for stock relevance.
<img alt="stockdata.org" src="https://www.stockdata.org/website_assets/img/stockdata.org-logo-dark-2.svg"></img>

---

## Getting Started

### Prerequisites

Ensure the following are installed:

- **Node.js** (v18+)
- **npm**
- **Ollama** (installed and running)
> **Note**: App is setup to use the default <code>localhost:11434/api/generate</code> path. If your Ollama instance uses a diffrent path, adjust <code>app/api/LLM/route.ts</code> to target your Ollama endpoint.
<h3>Installation</h3>
<p>Build stock-predicition from the source and install dependencies:</p>
<ol>
<li class="my-0">
<p><strong>Clone the repository:</strong></p>
<pre><code class="language-sh">❯ git clone https://github.com/J-Bourgeois/stock-predicition
</code></pre>
</li>
<li class="my-0">
<p><strong>Create <code>.env</code> file at project root following <code>.env.template</code> to create SQlite Database. </strong></p>
</li>
<li class="my-0">
<p><strong>Create <code>.env.local</code> file at project route following <code>.env.template</code>, insert <a href="https://www.stockdata.org/">stockdata.org</a> API Key inside <code>.env.local</code> file as <code>STOCKDATA_API_KEY</code>, along with your <code>JWT_SECRET</code> which is used to sign the users JWT.</strong></p>
</li>
<li class="my-0">
<p><strong>Install the dependencies:</strong></p>
</li>
</ol>
<p><strong>Using <a href="https://www.npmjs.com/">npm</a>:</strong></p>
<pre><code class="language-sh">❯ npm run dev:setup
</code></pre>

> **Note**: The above command is a custom script that will install all dependecies, perform prisma migration, generate prisma client & seed the database with the 3 default stocks: <code>NVDA</code>, <code>AAPL</code> & <code>MSFT</code>.

<h3>Usage</h3>
<p>Run the project with:</p>
<p><strong>Using <a href="https://www.npmjs.com/">npm</a>:</strong></p>
<pre><code class="language-sh">npm run dev
</code></pre>

</div></div></div></div><div data-state="inactive" data-orientation="horizontal" role="tabpanel" aria-labelledby="radix-:r15:-trigger-edit" hidden="" id="radix-:r15:-content-edit" tabindex="0" class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"></div></div></div></div></div></div></main></div><section aria-label="Notifications alt+T" tabindex="-1" aria-live="polite" aria-relevant="additions text" aria-atomic="false"></section></div>
