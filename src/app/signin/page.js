import Image from 'next/image';
import goog from '../fonts/goog.png'
export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section (Login Form) */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
        {/* Logo */}
        <Image src="https://interview.talently.ai/images/landing/talently-logo-header-new.svg" alt="Talent.ly Logo" width={200} height={100} />

        {/* Title */}
        <h1 className="text-3xl font-bold mt-8 mb-2">Log in to Talently.ai</h1>
        <p className="text-gray-600 mb-6">Enter your account credentials</p>

        {/* Form */}
        <form className="w-full max-w-sm">
          <label className="block text-gray-700 mb-2">Company Email</label>
          <input
            type="email"
            placeholder="e.g. mike@company.com"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded"
          />

          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 mb-6 border border-gray-300 rounded"
          />

          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded hover:from-blue-700 hover:to-purple-700 transition">
            Proceed
          </button>
        </form>

        {/* Google Sign In */}
        <button className="w-[55%] py-3 mt-4 flex items-center justify-center border border-gray-300 rounded">
          <Image src={goog} alt="Google Icon" width={30} height={20} className="mr-2" />
          Sign In With Google
        </button>

        {/* Links */}
        <div className="mt-6 text-sm">
          <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          <p className="mt-2">
            Don't have an account? <a href="#" className="text-blue-500 hover:underline">Book a Demo</a>
          </p>
        </div>
      </div>

      {/* Right Section (Features and Testimonials) */}
      <div className="w-1/2 bg-black text-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold mb-4">Experience The Power Of AI Recruiting</h2>
        <ul className="text-lg space-y-4">
          <li>✅ Job Creation Process</li>
          <li>✅ Enhanced Candidate Experience</li>
          <li>✅ Adding Custom Questions</li>
          <li>✅ AI Sourcing of Candidates</li>
          <li>✅ Technical Interviews</li>
        </ul>

        {/* Testimonial */}
        <div className="mt-12 flex flex-col items-center">
         {/*<Image src="/testimonial-user.png" alt="Mayson Allen" width={80} height={80} className="rounded-full mb-4" />*/}
          <p className="text-center text-sm">
            <strong>Mayson Allen</strong> <br />
            Clinic Manager at London Care
          </p>
          <p className="mt-2 text-center max-w-sm text-gray-400">
            Thanks to Talently.ai, our home healthcare agency found highly qualified candidates faster than ever.
          </p>
        </div>
      </div>
    </div>
  );
}
