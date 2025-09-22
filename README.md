# AI-Powered Harmful Message Analyzer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A real-time AI-powered tool that analyzes your messages, identifies harmful phrases, suggests alternatives, and tracks your daily communication habits.

---

## Table of Contents
- [Problem](#problem)
- [Solution](#solution)
- [Features](#features)
- [Why It's Helpful](#why-its-helpful)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

---

## Problem

In today's digital world, people often send messages without realizing the emotional impact of their words. This can lead to:

- **Unintended harm:** Messages may unintentionally be rude, offensive, or hurtful.
- **Lack of awareness:** Users do not receive real-time feedback about the tone or harmfulness of their messages.
- **Difficulty in self-monitoring:** Users lack tools to track their use of harmful or insensitive words.
- **No historical tracking:** Long-term patterns of communication are hard to track, making self-improvement difficult.

These issues can cause conflicts, misunderstandings, and a toxic communication environment.

---

## Solution

This project provides a **real-time AI-powered harmful message analyzer** that helps users:

- Identify harmful phrases in their messages.
- Understand why a phrase is harmful.
- Get suggested alternative phrases.
- See a rewritten, non-harmful version of their message.
- Track daily and 30-day historical stats of harmful vs. total words.

---

## Features

1. **Real-Time Message Analysis:** AI detects potentially harmful phrases as the user types.
2. **Phrase-Level Feedback:**
   - Color-coded harmfulness scale (1–10).
   - Table showing harmful phrases, reasons, and suggested alternatives.
3. **Message Rewriting:** Provides a respectful version of the message while keeping the meaning.
4. **Daily Statistics Tracking:**
   - Counts total and harmful words per day.
   - Tracks trends over the last 30 days.
   - Displays stats in clean, animated cards.
5. **User-Friendly Design:**
   - Modern UI with animations.
   - Motivational slogan to encourage respectful communication.
   - Clean layout and responsive design.

---

## Why It's Helpful

- **Promotes Respectful Communication:** Helps users choose words carefully before sending.
- **Increases Awareness:** Teaches which words/phrases are harmful.
- **Supports Behavior Tracking:** Shows daily and monthly trends, encouraging improvement.
- **Reduces Conflicts:** Helps prevent misunderstandings or unintended offenses.
- **Educational:** Helps students, professionals, and community members develop better communication habits.

---

## Screenshots

![Screenshot1](link-to-your-screenshot1.png)  
![Screenshot2](link-to-your-screenshot2.png)

*(Replace links with actual screenshots from your app)*

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla JS + Bootstrap 5)  
- **Backend:** Node.js, Express.js  
- **AI:** Groq SDK for harmful phrase detection and message rewriting  
- **Storage:** Browser LocalStorage for daily stats tracking

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/harmful-message-analyzer.git
```

2. Navigate to the project folder:
```bash
cd harmful-message-analyzer
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file and add your Groq API key:
```env
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

5. Start the server:
```bash
npm run dev
```

6. Open `index.html` in your browser (or serve via `express.static`).

---

## Usage

1. Enter your message in the input box.
2. Hit **Enter** or click the **Send** icon.
3. View:
   - Color-coded harmful phrases with reasons.
   - Suggested alternative phrases.
   - Rewritten non-harmful message.
   - Daily and historical stats below the input section.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.