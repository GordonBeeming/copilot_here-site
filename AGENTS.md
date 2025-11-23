# Copilot Here - Marketing Site

This is a single-page marketing site for the `copilot_here` project, built with React, Vite, and Tailwind CSS.

## Project Overview

The site promotes a secure, Dockerized wrapper for the GitHub Copilot CLI. It highlights key features like security isolation, auto-authentication, and cross-platform support.

### Key Features Implemented

1.  **Platform Detection**: The site automatically detects if the user is on Windows and switches the install command tab accordingly.
2.  **Copy to Clipboard**: A one-click button to copy the complex install commands.
3.  **Dark Mode Theme**: Styled to match the GitHub/Copilot CLI aesthetic using Tailwind CSS variables.
4.  **Responsive Design**: Works on mobile and desktop.

## SEO & External Links

We have implemented specific rules for external links to preserve SEO value ("juice") while maintaining security.

### Link Rules

*   **Internal Links**: Standard anchor tags or React Router links (if applicable).
*   **External Links (General)**: Must use `target="_blank"` and `rel="noopener noreferrer nofollow"`. This prevents passing PageRank to external sites.
*   **External Links (Trusted)**: Links to `gordonbeeming.com` must use `target="_blank"` and `rel="noopener noreferrer"`. We **do not** use `nofollow` here to allow SEO value to pass to the blog.

### Implementation

A helper component `ExternalLink` in `src/App.jsx` handles this logic automatically:

```jsx
const ExternalLink = ({ href, children, className }) => {
  const isTrusted = href.includes('gordonbeeming.com');
  const rel = isTrusted ? "noopener noreferrer" : "noopener noreferrer nofollow";
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel={rel}
      className={className}
    >
      {children}
    </a>
  );
};
```

## Content Sources

The site features testimonials and content derived from the following blog posts:

1.  **November 2025 Update**: Native ARM64, .NET 10, Flexible Mounts
2.  **October 2025 Update**: Auto-updates, Windows Support
3.  **Original Release**: Taming the AI (Security focus)

## Build & Deploy

*   **Dev**: `npm run dev`
*   **Build**: `npm run build` (Output: `dist/`)
*   **Test**: `npx playwright test` (Generates `screenshot.png`)

## Git & GPG Signing

This repository is configured to require GPG signing for commits. However, the AI agent environment does not have access to the user's private GPG keys or 1Password integration.

**Agent Instructions:**
*   **DO NOT** disable `commit.gpgsign` in the git configuration.
*   When making commits as the agent, use the `--no-gpg-sign` flag to bypass signing for that specific commit.
*   Example: `git commit -m "Update files" --no-gpg-sign`
