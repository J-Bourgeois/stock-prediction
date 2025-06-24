<div align="center">
  <h1>AI STOCK-PREDICTION</h1>
  <p><em>Use local LLM's to predict market trends & advise user if they should Buy, Hold or Sell</em></p>

  <!-- Repository Metadata Badges (optional: replace with actual public badge URLs if available) -->
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
