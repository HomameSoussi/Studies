const openai = require("openai");

openai.apiKey = process.env.OPENAI_API_KEY;
openai.organization = process.env.OPENAI_ORGANIZATION;

module.exports = async (req, res) => {
    if (req.method === "POST") {
        const { bookName } = req.body;
        const prompt = `Write a thorough yet concise summary of **${bookName}**. Concentrate on only the most important takeaways and primary points from the book that together will give me a solid overview and understanding of the book and its topic. \n\nInclude all of the following in your summary: \n\n- Main topic or theme of the book\n- Key ideas or arguments presented\n- Chapter titles or main sections of the book with a paragraph on each\n- Key takeaways or conclusions\n- Author's background and qualifications\n- Comparison to other books on the same subject\n- Target audience or intended readership\n- Reception or critical response to the book\n- Publisher and First Published Date\n- Recommendations [Other similar books on the same topic]\n\nTo sum up:  **The book's biggest takeaway and point in a singular sentence**\n\n## Main topic or theme\n\n- \n\n## Key ideas or arguments presented\n\n- \n\n## Chapter titles or main sections of the book\n\n### \n\n- \n\n## Key takeaways or conclusions\n\n- \n\n## Author's background and qualifications\n\n- \n\n## Comparison to other books on the same subject\n\n- \n\n## Target audience or intended readership\n\n- \n\n## Reception or critical response to the book\n\n- \n\n## Publisher and First Published Date\n\n- \n\n## Recommendations\n\n- `;
        try {
            const completion = await openai.ChatCompletion.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: prompt }
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
