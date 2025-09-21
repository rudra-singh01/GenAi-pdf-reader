# AI Document Analyzer Frontend Setup

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Clerk account for authentication

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Clerk Authentication:**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com/)
   - Create a new application
   - Copy your publishable key
   - Update `.env.local` with your Clerk publishable key:
     ```
     VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
     ```

3. **Configure API endpoint:**
   - Update `.env.local` with your backend URL:
     ```
     VITE_API_BASE_URL=http://localhost:3000
     ```

## Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   - Navigate to `http://localhost:5173`
   - Sign in with Clerk authentication
   - Upload a PDF and start analyzing!

## Features

- **Clerk Authentication**: Secure user authentication and management
- **File Upload**: Drag & drop or click to upload PDF files
- **AI Analysis**: Get AI-powered insights using Google Gemini
- **Formatted Response**: Beautiful markdown rendering with syntax highlighting
- **Professional UI**: Modern, responsive design with Tailwind CSS
- **Toast Notifications**: User-friendly feedback for all actions
- **Document Access**: View original PDF and preview images

## Tech Stack

- **React 19**: Latest React with modern features
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Clerk**: Authentication and user management
- **Axios**: HTTP client for API calls
- **React Markdown**: Markdown rendering
- **React Syntax Highlighter**: Code syntax highlighting
- **Lucide React**: Beautiful icons
- **React Hot Toast**: Toast notifications

## Project Structure

```
src/
├── components/
│   ├── DocumentAnalyzer.jsx    # Main upload and analysis component
│   ├── ResponseDisplay.jsx     # Formatted response display
│   └── LoadingSpinner.jsx      # Loading component
├── utils/
│   └── api.js                  # API utility functions
├── App.jsx                     # Main app component
├── main.jsx                    # App entry point
└── index.css                   # Global styles
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Configuration
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# API Configuration
VITE_API_BASE_URL=http://localhost:3000
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Troubleshooting

1. **Clerk Authentication Issues:**
   - Ensure your publishable key is correct
   - Check that your domain is added to Clerk's allowed origins

2. **API Connection Issues:**
   - Verify the backend is running on the correct port
   - Check CORS settings in your backend
   - Ensure the API base URL is correct

3. **File Upload Issues:**
   - Only PDF files are supported
   - Check file size limits (default: no limit set)
   - Verify the backend can handle multipart/form-data

## Support

For issues or questions, please check:
- Clerk documentation: https://clerk.com/docs
- React documentation: https://react.dev
- Tailwind CSS documentation: https://tailwindcss.com/docs
