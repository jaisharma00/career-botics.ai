const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: "YOUR_OPENAI_API_KEY",  // <-- yahan apna API key daalo
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in OpenAI request");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

