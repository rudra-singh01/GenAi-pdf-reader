# AI Document Analyzer

A full-stack web application that leverages AI to analyze PDF documents and provide intelligent insights. Upload any PDF document, ask questions about its content, and receive detailed AI-powered responses with beautiful formatting.

## 🚀 Features

- **🔐 Secure Authentication**: User authentication and management powered by Clerk
- **📄 PDF Upload**: Drag & drop or click to upload PDF files with real-time feedback
- **🤖 AI-Powered Analysis**: Advanced document analysis using Google Gemini AI
- **💬 Interactive Q&A**: Ask specific questions about your documents
- **📝 Formatted Responses**: Beautiful markdown rendering with syntax highlighting
- **📱 Responsive Design**: Modern, professional UI that works on all devices
- **🔄 Real-time Processing**: Live feedback during document processing
- **📋 Copy & Download**: Easy copying and downloading of AI responses
- **🖼️ Document Preview**: View original PDF and preview images
- **🔔 Toast Notifications**: User-friendly feedback for all actions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Clerk** - Authentication and user management
- **React Markdown** - Markdown rendering with syntax highlighting
- **React Hot Toast** - Beautiful toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Multer** - File upload handling
- **Cloudinary** - Cloud-based image and video management
- **Google Gemini AI** - Advanced AI for document analysis
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed and configured:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control system

### Required Accounts
- **Clerk Account** - For authentication ([Sign up here](https://clerk.com))
- **Google AI Studio Account** - For Gemini AI API ([Get API key](https://makersuite.google.com/app/apikey))
- **Cloudinary Account** - For file storage ([Sign up here](https://cloudinary.com))

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-document-analyzer.git
cd ai-document-analyzer
```

### 2. Backend Setup

```bash
cd back-end
npm install
```

Create a `.env` file in the `back-end` directory:

```env
# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../front-end
npm install
```

Create a `.env.local` file in the `front-end` directory:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# API Configuration
VITE_API_BASE_URL=http://localhost:3000
```

## ⚙️ Configuration

### Clerk Authentication Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your **Publishable Key** from the dashboard
4. Add your domain to the allowed origins in Clerk settings
5. Update the `VITE_CLERK_PUBLISHABLE_KEY` in your `.env.local` file

### Google Gemini AI Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Update the `GEMINI_API_KEY` in your backend `.env` file

### Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Get your cloud name, API key, and API secret from the dashboard
3. Update the Cloudinary variables in your backend `.env` file

## 🚀 Usage

### Starting the Application

1. **Start the Backend Server:**
   ```bash
   cd back-end
   npm start
   ```
   The backend will run on `http://localhost:3000`

2. **Start the Frontend Development Server:**
   ```bash
   cd front-end
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Using the Application

1. **Sign In**: Navigate to `http://localhost:5173` and sign in with Clerk
2. **Upload Document**: Drag & drop or click to upload a PDF file
3. **Ask Questions**: Enter prompts like:
   - "Summarize this document"
   - "What are the key points?"
   - "Extract important information"
   - "What is this document about?"
4. **Analyze**: Click "Analyze Document" and wait for the AI response
5. **View Results**: See formatted responses with options to copy, download, or view the original PDF

## 📁 Project Structure

```
ai-document-analyzer/
├── front-end/                 # React frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── DocumentAnalyzer.jsx
│   │   │   ├── ResponseDisplay.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── utils/
│   │   │   └── api.js         # API utility functions
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # App entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Static assets
│   ├── .env.local             # Frontend environment variables
│   └── package.json           # Frontend dependencies
├── back-end/                  # Node.js backend application
│   ├── routes/                # API routes
│   ├── middleware/            # Custom middleware
│   ├── utils/                 # Utility functions
│   ├── .env                   # Backend environment variables
│   ├── server.js              # Main server file
│   └── package.json           # Backend dependencies
└── README.md                  # Project documentation
```

## 🔌 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### POST `/api/analyze`
Analyze a PDF document with AI

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `file`: PDF file (required)
  - `prompt`: Analysis prompt (required)

**Response:**
```json
{
  "success": true,
  "analysis": "AI-generated analysis text",
  "fileUrl": "https://cloudinary-url.com/file.pdf",
  "previewImages": ["image1.jpg", "image2.jpg"]
}
```

## 🤝 Contributing

We welcome contributions to the AI Document Analyzer! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

### Reporting Issues

If you find a bug or have a feature request:

1. Check if the issue already exists in the [Issues](https://github.com/yourusername/ai-document-analyzer/issues) section
2. If not, create a new issue with:
   - Clear description of the problem or feature
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Contact

### Getting Help

- **Documentation**: Check this README and the setup guides in each directory
- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/yourusername/ai-document-analyzer/issues)
- **Discussions**: Join the conversation in [GitHub Discussions](https://github.com/yourusername/ai-document-analyzer/discussions)

### Troubleshooting

#### Common Issues

1. **Clerk Authentication Problems:**
   - Verify your publishable key is correct
   - Check that your domain is added to Clerk's allowed origins
   - Ensure you're using the correct environment (development/production)

2. **API Connection Issues:**
   - Verify the backend is running on the correct port (3000)
   - Check CORS settings in your backend
   - Ensure the API base URL is correct in frontend `.env.local`

3. **File Upload Problems:**
   - Only PDF files are supported
   - Check your Cloudinary configuration
   - Verify the backend can handle multipart/form-data

4. **AI Analysis Issues:**
   - Verify your Gemini API key is valid and has sufficient quota
   - Check that the API key has the necessary permissions
   - Ensure your document is readable and not corrupted

### Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)

---

**Made with ❤️ by Rudra**

⭐ If you found this project helpful, please give it a star!
