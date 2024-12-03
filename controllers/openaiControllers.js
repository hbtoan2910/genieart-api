const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Invalid or empty prompt",
    });
  }

  try {
    const response = await openai.createImage({
      prompt,
      n: 2,
      size: "512x512",
    });
    const image_result = response.data.data;
    res.status(200).json({
      success: true,
      data: image_result,
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error:
        error.response?.data?.error?.message || "An unexpected error occurred",
    });
  }
};

module.exports = { generateImage };
