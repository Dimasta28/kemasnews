'use server';
/**
 * @fileOverview A flow to generate a blog post description from its content.
 * - generateDescription - A function that generates a post description.
 * - GenerateDescriptionInput - The input type for the generateDescription function.
 * - GenerateDescriptionOutput - The return type for the generateDescription function.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDescriptionInputSchema = z.object({
  content: z.string().describe('The full content of the blog post in Markdown format.'),
});
export type GenerateDescriptionInput = z.infer<typeof GenerateDescriptionInputSchema>;

const GenerateDescriptionOutputSchema = z.object({
  description: z.string().describe('A short, compelling summary of the blog post, around 1-2 sentences.'),
});
export type GenerateDescriptionOutput = z.infer<typeof GenerateDescriptionOutputSchema>;

export async function generateDescription(input: GenerateDescriptionInput): Promise<GenerateDescriptionOutput> {
  return generateDescriptionFlow(input);
}

// Prompt to generate the blog post description
const descriptionPrompt = ai.definePrompt({
  name: 'postDescriptionPrompt',
  input: { schema: GenerateDescriptionInputSchema },
  output: { schema: GenerateDescriptionOutputSchema },
  prompt: `You are an expert content writer. Based on the following blog post content, write a short, compelling summary (description) of the blog post, around 1-2 sentences.

The description should entice readers to click and read the full article.

Post Content:
---
{{{content}}}
---
`,
});

const generateDescriptionFlow = ai.defineFlow(
  {
    name: 'generateDescriptionFlow',
    inputSchema: GenerateDescriptionInputSchema,
    outputSchema: GenerateDescriptionOutputSchema,
  },
  async (input) => {
    const {output} = await descriptionPrompt(input);
    
    if (!output?.description) {
        throw new Error('Failed to generate post description.');
    }

    return {
      description: output.description,
    };
  }
);
