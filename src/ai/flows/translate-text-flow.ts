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
  output: { schema: TranslateTextOutputSchema },
  prompt: `You are an expert multilingual translator. Translate each text value in the following JSON object into {{{targetLanguage}}}.
Do not translate proper nouns, brand names, or HTML tags. Preserve the HTML structure if present.
The 'postContent' value is a large block of HTML; translate the text within the tags but keep the tags themselves.
Return a JSON object with the identical keys as the input, but with the translated text as values.

Texts to translate:
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
    const {output} = await translatePrompt(input);
    
    if (!output?.translations) {
        throw new Error('Failed to translate texts.');
    }

    return {
      translations: output.translations,
    };
  }
);
