# TinyURL

## Overview

TinyURL is a URL shortening application built using React for the frontend and Node.js with Express for the backend. The app allows users to shorten long URLs, track the number of clicks on the shortened URLs, and view all created shortened URLs.

## Features

-   **Shorten long URLs**
-   **Track the number of clicks on each shortened URL**
-   **View all shortened URLs**

## Technologies Used

-   **Frontend**: React, Vite, Redux Toolkit, TypeScript, Tailwind CSS
-   **Backend**: Node.js, Express, MongoDB
-   **Styling**: Tailwind CSS
-   **State Management**: Redux Toolkit
-   **Form Handling**: react-hook-form, zod

## Setup and Installation

### Backend

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-repo/tinyurl.git
    cd short-url-back/
    ```

2. **Create a `.env` file**:

    ```env
    NODE_TLS_REJECT_UNAUTHORIZED='0'
    MONGODB_CONNECTION_STRING='mongodb://127.0.0.1:27017/shortenedUrlDB'
    PORT=5000
    ```

3. **Install dependencies and start the server**:
    ```bash
    npm install
    npm run dev
    ```

### Frontend

1. **Navigate to the frontend directory**:

    ```bash
    cd short-url-client/
    ```

2. **Create a `.env` file**:

    ```env
    VITE_PORT=3000
    ```

3. **Install dependencies and start the development server**:
    ```bash
    npm install
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Enter a long URL in the input field and click the "Shorten" button.
3. The shortened URL will be displayed along with the number of clicks.
4. Click on the shortened URL to increase the click count.

## Project Structure
