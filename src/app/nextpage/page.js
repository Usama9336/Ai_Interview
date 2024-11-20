'use client';
import { useEffect } from 'react';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
const JobButton = ({ title, onClick }) => (
  <button
    className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-purple-500 transition-colors text-gray-700 hover:text-purple-600"
    onClick={onClick}
  >
    {title}
  </button>
);

const InterviewPage = () => {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState('');
  const router = useRouter();
  const [domains, setDomains] = useState(null);
  const storedDomains = JSON.parse(localStorage.getItem("domains"));
  console.log('Stored Domains:', storedDomains);
  const domainData = storedDomains.data; // Access the `data` object

  // Extract domain names as an array
  const domainNames = Object.entries(domainData).map(([key, value]) => ({
    domain: value.domain,
    skills: value.skills,
  }));
  // useEffect(() => {
  //   // Parse domains from query string
  //   if (router.query.domains) {
  //     try {
  //       const parsedDomains = JSON.parse(router.query.domains);
  //       setDomains(parsedDomains);
  //     } catch (error) {
  //       console.error('Error parsing domains:', error);
  //     }
  //   }
  // }, [router.query]);

  // if (!domains) {
  //   return <div>Loading domains...</div>;
  // }
  // Parse the `domain` query parameter
  {/* const domainParam = searchParams.get('domain');
  const parsedData = domainParam ? JSON.parse(domainParam) : {};
  const domains = parsedData?.data || {};

  // Extract domain names
  const domainNames = Object.values(domains).map((domainObj) => domainObj?.domain || 'Unknown Domain');*/}


  const handledomainskills = () => {
    localStorage.setItem("skills",)
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Section */}
      <div className="w-1/2 relative">
        <div className="absolute w-full h-full bg-pink-300 overflow-hidden">
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
            You can select a practice interview from popular roles, or just
            create an interview for any job title you wish to practice for.
          </p>

          {/* Dynamic Job Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {domainNames.map((item, index) => (
              <Link
              href={{
                pathname: '/interviewpage',
              }}
              key={index}
            >
              
              <JobButton
                key={index}
                title={item.domain} // Use domain name as title
                onClick={() => {
                  setSelected(item.domain); // Save the selected domain in state
                  localStorage.setItem("skills", JSON.stringify(item.skills)); // Save skills in localStorage
                  console.log(`Skills for ${item.domain} saved:`, item.skills);
                  router.push('/interviewpage')
                }}
              />
               </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
