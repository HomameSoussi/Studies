const openai = require('openai');
const apiKey = process.env.openai_api_key;

const GetSummary = async (bookTitle) => {
  const prompt = `Write a thorough yet concise summary of ${bookTitle}. Concentrate on only the most important takeaways and primary points from the book that together will give me a solid overview and understanding of the book and its topic. Include all of the following in your summary:

  - Main topic or theme of the book
  - Key ideas or arguments presented
  - Chapter titles or main sections of the book with a paragraph on each
  - Key takeaways or conclusions
  - Author's background and qualifications
  - Comparison to other books on the same subject
  - Target audience or intended readership
  - Reception or critical response to the book
  - Publisher and First Published Date
  - Recommendations [Other similar books on the same topic]

  To sum up: The book's biggest takeaway and point in a singular sentence

  ## Main topic or theme

  -

  ## Key ideas or arguments presented

  -

  ## Chapter titles or main sections of the book

  ### 

  -

  ## Key takeaways or conclusions

  -

  ## Author's background and qualifications

  -

  ## Comparison to other books on the same subject

  -

  ## Target audience or intended readership

  -

  ## Reception or critical response to the book

  -

  ## Publisher and First Published Date

  -

  ## Recommendations

  - `;

  const completion = await openai.Completion.create({
    engine: 'text-davinci-002',
    prompt,
    maxTokens: 1024,
    n: 1,
    stop: '##'
  });

  const summary = completion.choices[0].text.trim();
  return summary;
};

module.exports = { GetSummary };
