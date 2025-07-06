# ✨ Git-Glance: A Modern GitHub Profile Viewer

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ui.shadcn.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Git-Glance is a beautifully designed web application that allows you to instantly view any GitHub user's profile information and their latest repositories. Built with Next.js and styled with the stunning `shadcn/ui` component library, it offers a seamless, animated, and professional user experience.

## 📸 Screenshots

<details>
<summary><strong>Click to view screenshots</strong></summary>

| Light Mode                                     | Dark Mode                                    |
| ---------------------------------------------- | -------------------------------------------- |
| ![Light Mode Screenshot](./docs/light-mode.png) | ![Dark Mode Screenshot](./docs/dark-mode.png) |

| Loading State (Skeletons)                            | Animated Landing Page                              |
| ---------------------------------------------------- | -------------------------------------------------- |
| ![Loading State Screenshot](./docs/loading-state.png) | ![Landing Page Screenshot](./docs/landing-page.png) |

</details>

## 🎨 Features

-   **GitHub API Integration**: Fetches user profile data and repositories in real-time.
-   **Elegant & Professional UI**: Clean, modern interface built with the highly-acclaimed `shadcn/ui`.
-   **Stunning Animations**: Smooth page transitions and element animations powered by `Framer Motion`.
-   **Responsive Design**: Flawless experience across desktop, tablet, and mobile devices.
-   **Dual-Theme Support**: A beautiful, automatic light and dark mode toggle.
-   **Robust User Experience**:
    -   **Skeleton Loaders**: Polished loading states prevent content layout shifts.
    -   **Clear Error Handling**: Informative alerts for user-not-found or API errors.
    -   **Empty States**: Gracefully handles users with no public repositories.
-   **Optimized Fetching**: Concurrent API calls for user and repo data to minimize load times.
-   **Detailed Repository Cards**: Displays language, description, and key stats (stars, forks, watchers) for each repo.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) 14 (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **API**: [GitHub REST API](https://docs.github.com/en/rest)

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

Make sure you have the following installed:
-   [Node.js](https://nodejs.org/) (v18 or later)
-   `npm`, `yarn`, or `pnpm`

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/github-profile-viewer.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd github-profile-viewer
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    The GitHub API has a low rate limit for unauthenticated requests. To avoid this, you should generate a Personal Access Token (PAT).

    -   Go to your [GitHub Developer Settings](https://github.com/settings/tokens) to generate a new token. Select the `public_repo` scope.
    -   Create a file named `.env.local` in the root of your project.
    -   Add your token to this file:
        ```
        NEXT_PUBLIC_GITHUB_API_TOKEN=your_personal_access_token_here
        ```
    > **Note:** The `NEXT_PUBLIC_` prefix is used here for simplicity in this client-side focused project. For a production application, it's highly recommended to use a Next.js API route as a proxy to keep your token secure on the server-side.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🗺️ Project Roadmap

This project is a solid foundation. Here are some ideas for future improvements:

-   [ ] **API Route Proxy**: Implement a server-side API route to securely handle the GitHub token, removing the need for `NEXT_PUBLIC_`.
-   [ ] **Data Caching with SWR/React Query**: Implement caching to reduce redundant API calls and improve performance.
-   [ ] **Pagination**: Add a "Load More" button or pagination for users with more than 12 repositories.
-   [ ] **Zod Validation**: Use `zod` to validate API responses and ensure data integrity.
-   [ ] **Advanced Stats**: Display more user statistics like contribution graphs or top languages.

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information.