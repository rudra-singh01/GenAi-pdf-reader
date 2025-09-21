# Quick Start Guide

## 🚀 Getting Started

### 1. Set up Clerk Authentication

1. Go to [https://clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy your **Publishable Key** from the dashboard
4. Update `.env.local`:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   ```

### 2. Start the Development Server

```bash
npm run dev
```

### 3. Open Your Browser

Navigate to: `http://localhost:5173`

## 🎯 How to Use

1. **Sign In**: Click "Sign In" and create an account or log in
2. **Upload PDF**: Drag & drop or click to upload a PDF file
3. **Enter Prompt**: Ask questions like:
   - "Summarize this document"
   - "What are the key points?"
   - "Extract important information"
   - "What is this document about?"
4. **Analyze**: Click "Analyze Document" and wait for AI response
5. **View Results**: See formatted response with options to copy, download, or view original PDF

## 🔧 Backend Setup Required

Make sure your backend is running on `http://localhost:3000` with:
- Cloudinary configured for file uploads
- Gemini AI configured for document analysis
- CORS enabled for frontend requests

## 📱 Features

- ✅ Secure authentication with Clerk
- ✅ Drag & drop file upload
- ✅ Real-time processing feedback
- ✅ Formatted AI responses with markdown
- ✅ Copy/download responses
- ✅ View original PDF and preview images
- ✅ Professional, responsive design
- ✅ Toast notifications for user feedback

## 🎨 UI Components

- **Modern Design**: Clean, professional interface
- **Responsive**: Works on desktop, tablet, and mobile
- **Accessible**: Keyboard navigation and screen reader friendly
- **Interactive**: Smooth animations and transitions
