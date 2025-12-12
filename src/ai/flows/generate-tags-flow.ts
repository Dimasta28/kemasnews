'use server';
/**
 * @fileOverview A flow to generate relevant tags for a blog post.
 * - generateTags - A function that suggests tags based on post content.
 * - GenerateTagsInput - The input type for the generateTags function.
 * - GenerateTagsOutput - The return type for the generateTags function.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTagsInputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  content: z.string().describe('The full content of the blog post in HTML or text format.'),
});
export type GenerateTagsInput = z.infer<typeof GenerateTagsInputSchema>;

const GenerateTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of 5-7 relevant keywords or short phrases for the blog post.'),
});
export type GenerateTagsOutput = z.infer<typeof GenerateTagsOutputSchema>;

export async function generateTags(input: GenerateTagsInput): Promise<GenerateTagsOutput> {
  return generateTagsFlow(input);
}

const tagsPrompt = ai.definePrompt({
  name: 'postTagsPrompt',
  input: { schema: GenerateTagsInputSchema },
  output: { schema: GenerateTagsOutputSchema },
  prompt: `You are an expert SEO and content strategist. Based on the following blog post title and content, generate an array of 5-7 relevant tags. The tags should be short keywords or two-word phrases that accurately represent the main topics of the post.

Post Title: {{{title}}}

Post Content:
---
{{{content}}}
---
`,
});

const generateTagsFlow = ai.defineFlow(
  {
    name: 'generateTagsFlow',
    inputSchema: GenerateTagsInputSchema,
    outputSchema: GenerateTagsOutputSchema,
  },
  async (input) => {
    const {output} = await tagsPrompt(input);
    
    if (!output?.tags) {
        throw new Error('Failed to generate post tags.');
    }

    return {
      tags: output.tags,
    };
  }
);
