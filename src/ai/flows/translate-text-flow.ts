'use server';
/**
 * @fileOverview A flow to translate a batch of texts into a specified language.
 * - translateText - A function that handles the text translation.
 * - TranslateTextInput - The input type for the translateText function.
 * - TranslateTextOutput - The return type for the translateText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateTextInputSchema = z.object({
  texts: z.record(z.string()).describe('A JSON object where keys are identifiers and values are the texts to be translated.'),
  targetLanguage: z.string().describe('The target language for translation (e.g., "Indonesian", "English", "Chinese", "Japanese").'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translations: z.record(z.string()).describe('A JSON object with the same keys as the input, but with the translated text as values.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

export async function translateText(input: TranslateTextInput): Promise<TranslateTextOutput> {
  return translateTextFlow(input);
}

const translatePrompt = ai.definePrompt({
  name: 'translateBatchPrompt',
  input: { schema: TranslateTextInputSchema },
  // Use the strict output schema. This encourages the model to return the correct format.
  output: { schema: TranslateTextOutputSchema },
  prompt: `You are an expert multilingual translator. Your task is to translate the text values in the provided data into **{{{targetLanguage}}}**.

**CRITICAL Instructions:**
- Your response MUST be a valid JSON object that conforms to the specified output schema.
- The JSON object must have a single root key called "translations".
- The value of "translations" must be another JSON object containing all the original keys from the input, but with their string values translated.
- Preserve all HTML tags within the 'postContent' value; only translate the text content inside them.
- Do not translate proper nouns or brand names unless appropriate for the target language.

**Data to Translate (Key-Value pairs):**
{{#each texts}}
- "{{@key}}": "{{this}}"
{{/each}}
`,
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async (input) => {
    // The prompt now directly returns the structure we need.
    const {output} = await translatePrompt(input);
    
    if (!output?.translations) {
        throw new Error('Failed to translate texts or the response was empty.');
    }

    // The output from the prompt already matches the flow's output schema.
    return output;
  }
);
