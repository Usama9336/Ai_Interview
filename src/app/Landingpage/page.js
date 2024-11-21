'use client'
import React from 'react';
import { AlertCircle, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Upload } from 'lucide-react';
const CompanyLogo = ({ children, className = "" }) => (
  <div className={`flex items-center justify-center space-x-2 text-gray-600 ${className}`}>
    {children}
  </div>
);
import { useState } from 'react';
import axios from 'axios';
// import { useRouter } from 'next/navigation'

const LandingPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [extractedDomains, setExtractedDomains] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter()

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setUploadError('Please select a PDF file');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setUploadError('');
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a PDF file first');
      return;
    }
  
    setIsUploading(true);
    setUploadError('');
  
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      const response = await axios.post('https://4310-45-115-190-109.ngrok-free.app/api/v1/resume/extract_domains', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setExtractedDomains(response.data);
      console.log('Extracted Domains:', response.data);
      localStorage.setItem("domains",JSON.stringify(response.data));
      router.push('/nextpage')
    } catch (error) {
      console.error('API Error:', error);
      
      if (error.response && error.response.status === 422) {
        // Specific handling for 422 Unprocessable Entity error
        setUploadError('The resume could not be processed. Please check the file format and try again.');
      } else {
        // Fallback error handling
        setUploadError(error.response?.data?.message || 'Error processing resume');
        router.push('/nextpage')
      }
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center">
         {/* <img src="https://interview.talently.ai/images/landing/talently-logo-header-white-new.svg" alt="Talently.ai logo" className="mr-2 h-10" />
          */}
        </div>

        <div className="flex items-center space-x-8">
          <a href="#pricing" className="hover:text-gray-300">Pricing</a>
          <a href="#features" className="hover:text-gray-300">Features</a>
          <div className="relative group">
            <a href="#use-cases" className="hover:text-gray-300 flex items-center">
              Use Cases
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
          <a href="#demo" className="text-white hover:text-gray-300">Book a Demo</a>
          <Link href="/signin">
          <button className="px-4 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors">
            Sign in
          </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-8 mt-20 h-screen">
        <div className="flex grid-cols-12 gap-8 items-center justify-center">
          <div className="col-span-12 lg:col-span-6 relative flex flex-col items-center justify-center">
            <div className="absolute -left-20 top-0 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-20" />

            <h1 className="text-6xl font-bold mb-6">
              ProQuest.ai: Your AI Interviewer
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              An AI interviewer that conducts live, conversational interviews and gives real-time
              evaluations to effortlessly identify top performers. Say goodbye to manual
              screening and hello to smarter recruiting.
            </p>

            {/* Updated file upload section */}
            <div className="flex flex-col space-y-4 w-full max-w-md">
              <div className="flex space-x-4">
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isUploading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Upload className="w-5 h-5 mr-2" />
                  )}
                  {selectedFile ? 'Change Resume' : 'Upload Resume'}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf"
                  disabled={isUploading}
                />
{/*                   
                <Link  href={extractedDomains?({
                pathname: '/nextpage',
              query: { domains: JSON.stringify(extractedDomains) // Pass domain as a query parameter
            }}):({pathname: '/'})}> */}
                <button
                  onClick={handleFileUpload}
                  disabled={!selectedFile || isUploading}
                  className={`px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors flex items-center ${(!selectedFile || isUploading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Attempt Interview
                </button>
                {/* </Link> */}
              </div>

               {selectedFile && (
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{selectedFile.name}</span>
                </div>
              )}

              {uploadError && (
                <div className="flex items-center space-x-2 text-sm text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>{uploadError}</span>
                </div>
              )}


              {extractedDomains && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Extracted Domains:</h3>
                  <pre className="text-sm text-gray-300 overflow-auto">
                    {JSON.stringify(extractedDomains, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

            {/* Right Side */}
            <div className="col-span-12 lg:col-span-6 relative">
            

            {/* Floating Profile Images */}
            
            
          </div>
          <div className="absolute left-0 top-[120px] sm:top-[199px] laptopSm::top-3 bg-[#FFBD00] w-[40px] h-[24px] md:w-[84px] md:h-[55px] rounded-r-[40px] pointer-events-none"></div>
        </div>
         <div className="absolute -left-8 mt-4 ">
              <img
                src="https://interview.talently.ai/_next/image?url=%2Fimages%2Flanding%2Fhero-img-demo-2.png&w=256&q=100"
                alt="Profile"
                className="rounded-full border-4 border-[#1a1a1a] h-[20rem]"
              />
            </div>
            <div className="rounded-lg flex overflow-hidden justify-center items-center shadow-2xl">
              <img
                src="https://interview.talently.ai/_next/image?url=%2Fimages%2Flanding%2Fhero-img-demo.png&w=640&q=100"
                alt="Interview Interface Preview"
                className="w-[45rem] h-[29rem] "
              />
            </div>
      </main>

      {/* Chat Widget */}
      <div className="fixed bottom-8 right-8">
        <button className="p-4 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2A2550]">
              Experience the power of Talently
            </h1>
            <p className="text-lg text-gray-600">
              Move beyond manual screening with AI recruiting solutions. Experience the advantages firsthand with our free demo.
            </p>
            <Link href="/nextpage">
            <button 
              className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors text-lg font-medium"
            >
              Try AI Interview
            </button>
            </Link>
          </div>

          {/* Right Column - Chat Interface */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-500">🤖</span>
                </div>
                <div className="flex-1 bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-700">
                    Hi There Cynthia. Trust your day is fine. Just sit and relax. Your Interview starts shortly
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1 bg-blue-50 p-3 rounded-lg shadow-sm max-w-xs">
                  <p className="text-sm text-gray-700">
                    Ok, Sounds Great
                  </p>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <div className="bg-gray-50 py-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-gray-600 mb-12">
            Companies worldwide who have tested our product
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 items-center">
            {/* RotaShow Logo */}
            <CompanyLogo>
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2"/>
                <path d="M15 15 L25 20 L15 25 Z" fill="currentColor"/>
              </svg>
              <span className="font-semibold">RotaShow</span>
            </CompanyLogo>

            {/* Waves Logo */}
            <CompanyLogo>
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20 Q10 10 20 20 Q30 30 35 20" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M5 25 Q10 15 20 25 Q30 35 35 25" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <span className="font-semibold">Waves</span>
            </CompanyLogo>

            {/* Travelers Logo */}
            <CompanyLogo>
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5 L35 35 L20 28 L5 35 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <span className="font-semibold">Travelers</span>
            </CompanyLogo>

            {/* Velocity9 Logo */}
            <CompanyLogo>
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20 L20 5 L35 20 L20 35 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <text x="16" y="25" fill="currentColor" fontSize="12">9</text>
              </svg>
              <span className="font-semibold">Velocity9</span>
            </CompanyLogo>

            {/* Goldlines Logo */}
            <CompanyLogo>
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="5" y1="15" x2="35" y2="15" stroke="currentColor" strokeWidth="2"/>
                <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="2"/>
                <line x1="5" y1="25" x2="35" y2="25" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="font-semibold">Goldlines</span>
            </CompanyLogo>
          </div>
        </div>
      </div>

     
      {/* Testimonials Section */}
      <div className="bg-gray-50 py-8">
        {/* ... Testimonials section content ... */}
      </div>

      {/* CTA Section */}
      <div className="bg-[#2A2550] text-white py-16">
        {/* ... CTA section content ... */}
      </div>
    </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#2A2550] mb-12">
            Why Choose Our AI Interview Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl text-[black] font-semibold mb-4">Smart Screening</h3>
              <p className="text-gray-600">
                Advanced AI algorithms assess candidates' responses in real-time, providing deeper insights into their capabilities.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl text-[black] font-semibold mb-4">Time Efficiency</h3>
              <p className="text-gray-600">
                Reduce hiring time by 75% with automated initial screenings and intelligent candidate ranking.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-[black]">Unbiased Evaluation</h3>
              <p className="text-gray-600">
                Ensure fair assessment with standardized questions and objective AI-powered analysis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#2A2550] mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">
                "The AI interview platform has revolutionized our hiring process. We've reduced our time-to-hire by 60% while improving candidate quality."
              </p>
              <p className="font-semibold">- Sarah Johnson, HR Director</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">
                "As a tech startup, we needed a solution that could scale with our rapid growth. This platform delivered beyond our expectations."
              </p>
              <p className="font-semibold">- Michael Chen, CTO</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#2A2550] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of companies using AI to make better hiring decisions.
          </p>
          <button 
            className="bg-white text-[#2A2550] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors text-lg font-medium"
          >
            Schedule a Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;