const openai = require("openai");

openai.apiKey = process.env.OPENAI_API_KEY;
openai.organization = process.env.OPENAI_ORGANIZATION;

module.exports = async (req, res) => {
    if (req.method === "POST") {
        const { bookName } = req.body;
        try {
            const completion = await openai.ChatCompletion.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: bookName }
                ]
            });
            const summary = completion.choices[0].message.content.strip();
            res.status(200).json({ summary });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Failed to get summary." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed." });
    }
};
