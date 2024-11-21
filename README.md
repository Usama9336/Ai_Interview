ProQuest.ai: Your AI Interviewer 🤖💼

ProQuest.ai is an advanced AI-powered platform for conducting proctored, conversational interviews. It provides real-time evaluation and ensures interview integrity through proctoring, revolutionizing the hiring process.


Features ✨

AI-Driven Interviews: Leverages OpenAI's API to generate dynamic interview questions and evaluate responses in real time.
Proctoring with Object Detection: Ensures remote interview integrity using a YOLO pre-trained object detection model.
Resume Parsing: Extracts and processes data from uploaded resumes using PyPDF2.
Dynamic Frontend: Built with Next.js for fast and responsive UI.
Seamless User Experience: Intuitive design and real-time feedback for both candidates and recruiters.

Getting Started 🚀

Prerequisites
Python (3.x)
Node.js (16+)
MongoDB for backend storage.
OpenAI API key for natural language processing.
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/your-username/proquest-ai.git
cd proquest-ai
Frontend Setup

Navigate to the frontend directory:
bash
Copy code
cd frontend
npm install
npm run dev
Backend Setup

Navigate to the backend directory:
bash
Copy code
cd backend
pip install -r requirements.txt
python app.py
Configure Environment Variables

Set up your .env files with the following:
plaintext
Copy code
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_uri
Access the Application

Open http://localhost:3000 to interact with the frontend.

Technologies Used 🛠️

Frontend: Next.js, Tailwind CSS
Backend: Flask, Python
Database: MongoDB
AI Models: OpenAI APIs (for NLP), YOLO (for object detection)
File Parsing: PyPDF2 for extracting data from resumes

Screenshots 📸

Homepage:

![image](https://github.com/user-attachments/assets/d93b92dc-f289-44e1-9a5b-57efa0a7b502)

Domains Page: 

![image](https://github.com/user-attachments/assets/7ddd9e8c-f9b0-47d0-904c-a5e201ec4fc3)

Interview Page:

![image](https://github.com/user-attachments/assets/54153da0-5873-40bf-bca4-c741296ce4f5)


How It Works 🛡️

Upload Resume: Candidates upload their resumes for analysis and pre-interview preparation.
Start Interview: AI generates and evaluates responses in real time.
Proctoring: The system monitors the interview environment using YOLO to detect objects and ensure compliance.
Feedback: Recruiters receive comprehensive evaluations and interview summaries.
Future Improvements 🔮
Enhanced analytics dashboard for recruiters.
Multilingual support for global candidates.
Integration with ATS (Applicant Tracking Systems).

Contributing 🤝
Contributions are welcome! Follow these steps to contribute:

Fork the repository.
Create a feature branch:
bash
Copy code
git checkout -b feature-name
Commit changes:
bash
Copy code
git commit -m "Added feature or fixed bug"
Push your branch:
bash
Copy code
git push origin feature-name
Submit a pull request.

Acknowledgments 🙌

Thanks to OpenAI for providing the NLP API.
Inspired by the need to make recruiting smarter and more efficient.
