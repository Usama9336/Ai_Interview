'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ArrowLeft, Mic, Camera, CameraOff, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function InterviewPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]); // Dynamic questions state
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [time, setTime] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Fetch questions based on skills stored in local storage
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const skills = JSON.parse(localStorage.getItem('skills')) || [];
        if (skills.length === 0) {
          console.error('No skills found in local storage.');
          return;
        }

        const response = await axios.post(
          'https://9bca-2409-40d0-100a-302b-70ac-7334-48b9-6ddd.ngrok-free.app/api/v1/resume/generate_questions',
          { skills }, // Pass the skills array
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        // Assuming API response structure { questions: [...] }
        setQuestions(response.data.questions || []);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Initialize and manage camera feed
  useEffect(() => {
    const enableCamera = async () => {
      if (isCameraOn && videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      } else if (videoRef.current) {
        const tracks = videoRef.current.srcObject?.getTracks();
        tracks?.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    enableCamera();

    return () => {
      // Clean up camera stream on unmount
      const tracks = videoRef.current?.srcObject?.getTracks();
      tracks?.forEach((track) => track.stop());
    };
  }, [isCameraOn]);

  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTime(0);
      setIsRecording(false);
      setInputValue('');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setTime(0);
      setIsRecording(false);
      setInputValue('');
    }
  };

  const handleEndReview = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
      <div className="flex gap-6">
        {/* Left side - Question Interface */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePreviousQuestion}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Question
            </button>

            <div className="flex items-center space-x-4">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentQuestionIndex
                      ? 'bg-purple-600'
                      : index < currentQuestionIndex
                      ? 'bg-gray-400'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {isLastQuestion ? (
              <button
                onClick={handleEndReview}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                End & Review
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                Next Question
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-xl text-center font-semibold mb-8">
              {questions[currentQuestionIndex] || 'Loading question...'}
            </h2>

            <div className="text-center text-gray-400 text-xl mb-8">
              {formatTime(time)} / 2:00
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-4 rounded-full ${
                  isRecording ? 'bg-red-500' : 'bg-red-100'
                }`}
              >
                <Mic
                  className={`w-6 h-6 ${
                    isRecording ? 'text-white' : 'text-red-500'
                  }`}
                />
              </button>
            </div>

            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Or type your answer"
              className="w-full p-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />

            <div className="flex justify-between mt-6 border-t pt-4">
              <button className="text-gray-400 hover:text-gray-600">
                Feedback
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                Sample Response
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Right side - Camera */}
        <div className="w-64 flex flex-col items-end">
          <div className="fixed bottom-6 right-6">
            <div className="bg-black rounded-lg overflow-hidden shadow-lg">
              <div className="w-64 h-48 bg-gray-900 flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className="absolute bottom-4 right-4 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
              >
                {isCameraOn ? (
                  <CameraOff className="w-5 h-5" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
