# 🎯 YouTube Productivity Extension

A Chrome Extension designed to help users stay focused and productive while watching YouTube. It combines distraction blocking, time management, and transcript summarization to enhance learning and reduce wasted time.

## 🚀 Features

- 🧹 **Distraction Blocker**  
  Hides YouTube's recommended videos, Shorts section, and comments using DOM manipulation. Settings persist across sessions via Chrome Storage API.

- ⏱️ **Pomodoro Timer**  
  Displays a 25-minute countdown overlay on YouTube pages to help users apply the Pomodoro Technique for focused work sessions.

- 🧠 **Auto Summarizer**  
  Connects to a Flask backend that uses the YouTube Transcript API to fetch transcripts and generate concise summaries of video content.

- 🔍 **Transcript Highlighter**  
  Automatically highlights key terms like “important”, “definition”, and “steps” in video transcripts to support better note-taking and retention.

## 🛠️ Tech Stack

| Layer      | Technologies Used                     |
|------------|----------------------------------------|
| Frontend   | HTML, CSS, JavaScript (Manifest V3)    |
| Backend    | Python Flask, YouTube Transcript API   |
| Storage    | Chrome Storage API                     |
| Integration| RESTful API, Asynchronous JS           |

## 📦 Installation Guide

### 🔧 Load the Extension
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer Mode** (top right).
4. Click **Load unpacked** and select the project folder.

### 🧪 Run the Backend
1. Navigate to the `python-backend` folder.
2. Install dependencies:
   pip install -r requirements.txt
3. Start the Flask server:
   python app.py

## 📁 Folder Structure

YouTube-Productivity-Extension/
├── python-backend/
│   ├── app.py
│   └── requirements.txt
├── content.css
├── content.js
├── manifest.json
├── popup.css
├── popup.html
├── popup.js

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Author

**Srikanth**  
3rd Year Engineering Student | Embedded Systems & Productivity Tools  
Passionate about real-world impact, affordability, and clean technical presentation.
