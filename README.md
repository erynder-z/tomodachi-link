# Tomodachi-Link

A social network built with React and TypeScript powered by a RESTful API backend.

## Live

[https://tomodachi-link.netlify.app/](https://tomodachi-link.netlify.app/).

## Features

-   Connect with friends and find new ones
-   Share and interact with posts
-   Create and visualize polls
-   Realtime chat messenger
-   Easy-to-use type-ahead search
-   Fully responsive layout

## Backend API

The source code for the backend API can be found at [https://erynder-z.github.io/tomodachi-link-backend/](https://erynder-z.github.io/tomodachi-link-backend/).

## Installation

1.  Clone the repository to your local machine: `git clone https://github.com/erynder-z/tomodachi-link-frontend.git`
2.  Navigate to the project directory: `cd tomodachi-link-frontend`
3.  Install the required dependencies: `npm install`
4.  Start the development server: `npm run dev`

## Usage

### 1. Setup Environment Variables

Before running the application, ensure you have set up the following environment variables in a `.env` file:

```shell
VITE_SERVER_URL=<URL_of_the_Server_running_the_backend>
VITE_STORAGE_ENCRYPTION_KEY=<secret_key_for_the_encrypted_localstorage>
VITE_DEFAULT_FRIEND_ID=<MongoDB_objectID_of_a_user_that_is_automatically_added_to_new_users>
```

### 2. Install Tomodachi-Link Backend

The backend for Tomodachi-Link is a separate repo, so you need to install and run the [Tomodachi-Link Backend](https://github.com/erynder-z/tomodachi-link-backend).

## Acknowledgments

-   [vite](https://vitejs.dev/) - Next generation frontend tooling.
-   [typescript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
-   [tailwindcss](https://tailwindcss.com/) - Utility-first CSS framework.
-   [d3](https://d3js.org/) - A JavaScript library for manipulating documents based on data.
-   [date-fns](https://date-fns.org/) - Modern JavaScript date utility library.
-   [emoji-picker-react](https://github.com/missive/emoji-picker-react) - React component for picking emojis.
-   [encrypt-storage](https://www.npmjs.com/package/encrypt-storage) - Library for encrypting local storage data.
-   [extract-colors](https://www.npmjs.com/package/extract-colors) - Library to extract colors from images.
-   [framer-motion](https://www.framer.com/motion/) - Animation library for React.
-   [gif-picker-react](https://www.npmjs.com/package/gif-picker-react) - React component for picking GIFs.
-   [react](https://reactjs.org/) - A JavaScript library for building user interfaces.
-   [react-avatar-editor](https://github.com/mosch/react-avatar-editor) - React component for editing avatars.
-   [react-icons](https://react-icons.github.io/react-icons/) - Library for icons in React.
-   [react-image-file-resizer](https://www.npmjs.com/package/react-image-file-resizer) - React component to resize image files.
-   [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner) - Loader spinner component for React.
-   [react-markdown](https://www.npmjs.com/package/react-markdown) - Markdown component for React.
-   [react-router-dom](https://reactrouter.com/web/guides/quick-start) - DOM bindings for React Router.
-   [react-tooltip](https://www.npmjs.com/package/react-tooltip) - Tooltip library for React.
-   [socket.io-client](https://socket.io/docs/v4/client-api/) - Client-side library for Socket.IO.
-   [tinycolor2](https://www.npmjs.com/package/tinycolor2) - Library for color manipulation and conversion in JavaScript.
