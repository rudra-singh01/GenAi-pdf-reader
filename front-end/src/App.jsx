import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'
import DocumentAnalyzer from './components/DocumentAnalyzer'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
          }
        }}
      />

      {/* Header */}
      <header className="backdrop-blur-md bg-white/70 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 lg:h-16">
            <div className="flex items-center">
              <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center mr-2 lg:mr-3">
                <span className="text-white text-xs lg:text-sm font-bold">AI</span>
              </div>
              <h1 className="text-lg lg:text-xl font-semibold text-slate-800">
                <span className="hidden sm:inline">Document Analyzer</span>
                <span className="sm:hidden">AI Analyzer</span>
              </h1>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <SignedOut>
                <SignInButton>
                  <button className="bg-slate-800 hover:bg-slate-900 text-white px-3 lg:px-4 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm text-sm lg:text-base">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 lg:w-10 lg:h-10 ring-2 ring-slate-200"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-3.5rem)] lg:min-h-[calc(100vh-4rem)]">
        <SignedOut>
          <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] lg:min-h-[calc(100vh-4rem)] px-4">
            <div className="max-w-sm lg:max-w-md mx-auto text-center">
              <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 lg:p-8 shadow-xl">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <span className="text-white text-lg lg:text-2xl font-bold">AI</span>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3 lg:mb-4">
                  Welcome to Document Analyzer
                </h2>
                <p className="text-slate-600 mb-6 lg:mb-8 leading-relaxed text-sm lg:text-base">
                  Upload your PDF documents and get AI-powered insights, summaries, and answers to your questions.
                </p>
                <SignInButton>
                  <button className="bg-slate-800 hover:bg-slate-900 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm shadow-lg text-sm lg:text-base">
                    Get Started
                  </button>
                </SignInButton>
              </div>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <DocumentAnalyzer />
        </SignedIn>
      </main>
    </div>
  )
}

export default App