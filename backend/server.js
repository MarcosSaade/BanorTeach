const express = require('express');
const cors = require('cors');
const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(cors({
    origin: '*', // Allow all origins for development purposes
    methods: ['GET', 'POST'], // Specify allowed methods
  }));
  
app.use(express.json());

const vertex_ai = new VertexAI({
  project: 'gcp-banorte-hackaton-team-9',
  location: 'us-central1',
  credentials: { api_key: API_KEY }
});

const model = 'gemini-1.5-pro-002';

app.post('/generate-content', async (req, res) => {
  const message = req.body.message;
  console.log('Received message:', message);

  try {
    const generativeModel = vertex_ai.preview.getGenerativeModel({
      model: model,
      generationConfig: {
        'maxOutputTokens': 8192,
        'temperature': 1,
        'topP': 0.95,
      },
      safetySettings: [
        { 'category': 'HARM_CATEGORY_HATE_SPEECH', 'threshold': 'OFF' },
        { 'category': 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold': 'OFF' },
        { 'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold': 'OFF' },
        { 'category': 'HARM_CATEGORY_HARASSMENT', 'threshold': 'OFF' },
      ],
    });

    const chat = generativeModel.startChat({});
    const streamResult = await chat.sendMessageStream([{ text: message }]);
    const responseText = (await streamResult.response).candidates[0].content;

    console.log('Text:', responseText['parts'][0].text);

    const resText = responseText['parts'][0].text // This the part I want to render in the component, the string

    res.json({ responseText });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Ocurrió un error, por favor intentalo más tarde', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
