// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";   // ✅ import cors
import { Groq } from "groq-sdk";
import {fileURLToPath} from "url"
import path from "path";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// ✅ Enable CORS for all origins
app.use(cors());

// Middleware
app.use(express.json());

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


app.use(express.static(path.join(__dirname, "public")));

app.post("/api/check-message", async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const chatCompletion = await groq.chat.completions.create({
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.6,
      max_completion_tokens: 4096,
      top_p: 0.95,
      stream: false,
      response_format: { type: "json_object" },
      messages: [
        {
  role: "system",
  content: `You are an assistant that analyzes user messages to identify potentially harmful or emotionally hurtful phrases.
For each harmful phrase, return the results strictly in valid JSON format only.

Rules:

Detect the harmful phrase.

Rate its harmfulness on a scale from 1 (mildly hurtful) to 10 (extremely hurtful).

Explain briefly why the phrase is harmful (reason).

Suggest an alternate, non-harmful phrase with the same intent but in a kind and respectful way.

Finally, rewrite the entire message in a non-harmful way.

The output must be valid JSON matching this structure:
{
  "harmfulMessages": [
    {
      "phrase": "string",
      "level": number,
      "reason": "string",
      "alternatePhrase": "string"
    }
  ],
  "rewrittenMessage": "string"
}`
}
,
        {
          role: "user",
          content: JSON.stringify({ message }),
        },
      ],
    });

    const result = chatCompletion.choices[0].message.content;
    res.json(JSON.parse(result));
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
