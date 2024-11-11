import React from 'react';

const JobButton = ({ title }) => (
  <button className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-purple-500 transition-colors text-gray-700 hover:text-purple-600">
    {title}
  </button>
);

const TestimonialCard = () => (
  <div className="absolute bottom-12 left-12 bg-black text-white p-6 rounded-lg max-w-md">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center">
        <img 
          src="/api/placeholder/48/48"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div>
        <h3 className="font-semibold">Carolina Jenna</h3>
        <p className="text-gray-400">Intern</p>
      </div>
    </div>
    <p className="text-gray-200">
      I love the fact that i am able to practice well. This helped me land my first Job ever after so many trials. Thanks so much to talently. Highly recommended
    </p>
  </div>
);

export default function InterviewPage() {
  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Section */}
      <div className="w-1/2 relative ">
        
        {/* Pink rounded rectangle with image */}
        <div className="absolute w-full h-full bg-pink-300  overflow-hidden">
          <img
            src="https://interview.talently.ai/_next/image?url=%2Fimages%2Fmock_bg.png&w=1920&q=75"
            alt="Interview preparation"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white p-12 flex flex-col">
        <div className="max-w-xl mx-auto w-full pt-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Practice giving live, conversational interviews for free.
          </h1>
          <p className="text-gray-600 text-center mb-12">
            You can select a practice interview from popular roles, or just create an interview for any job title you wish to practice for.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <JobButton title="Full Stack Developer" />
            <JobButton title="Front End Developer" />
            <JobButton title="Business Development Manager" />
            <JobButton title="Lead Product Designer" />
          </div>

          <button className="w-full py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            I want to create my custom interview
          </button>
        </div>
      </div>
    </div>
  );
}