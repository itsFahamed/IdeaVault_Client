# IdeaVault — Startup Idea Sharing & Validation Platform

Welcome to **IdeaVault**, a comprehensive web-based platform designed for entrepreneurs and innovators to share, discuss, and validate startup ideas through community collaboration and structured engagement.

### Live Site URL
- **Client Application:** [https://ideavault-client.vercel.app](https://ideavault-client.vercel.app)
- **Backend API:** [https://ideavault-server.onrender.com](https://ideavault-server.onrender.com)

---

## Key Features

- 💡 **Interactive Startup Idea Submission:** Seamlessly post innovative concepts, detailing the problem statement, proposed solution, estimated budget, target audience, category, tags, and media.
- ⚡ **Global Dark / Light Theme:** Instantly toggle the interface appearance globally from the navigation bar, with local persistence to maintain user preferences across sessions.
- 🔐 **Robust Authentication via Better Auth:** Integrated authentication flow supporting secure Email/Password registration (with server-side password validation) and Google OAuth login.
- 🔍 **Advanced Search & Category Filtering:** Easily discover relevant startup ideas with a case-insensitive, live search engine and filtering options for categories and date ranges.
- 💬 **Real-time Discussions & Feedback:** A nested interaction system allowing authenticated users to comment, edit, or delete their feedback to help authors validate and refine their concepts.
- 📊 **Personalized Dashboards:** Dedicated private dashboards for users to track their posted ideas ("My Ideas") and monitor their community engagement history ("My Interactions").

---

## Technology Stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, React Icons, React Hot Toast, Better Auth Client
- **Backend:** Node.js, Express, MongoDB (Official Driver), Better Auth Server Core
- **Database:** MongoDB Atlas

---

## Installation & Setup

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed.

### Setup Server
1. Navigate to the server directory:
   ```bash
   cd IdeaVault_server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   MongoDB_URI=your_mongodb_connection_string
   ```
4. Run sample seed data:
   ```bash
   npm run seed
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Setup Client
1. Navigate to the client directory:
   ```bash
   cd IdeaVault_Client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=http://localhost:3000/
   MongoDB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
4. Start the client application:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to access the platform.
