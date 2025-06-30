'use server';
/**
 * @fileOverview A flow to generate a blog post with a title and a featured image.
 * - generatePost - A function that generates post content and an image.
 * - GeneratePostInput - The input type for the generatePost function.
 * - GeneratePostOutput - The return type for the generatePost function.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GeneratePostInputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
});
export type GeneratePostInput = z.infer<typeof GeneratePostInputSchema>;

export const GeneratePostOutputSchema = z.object({
  content: z.string().describe('The generated blog post content in Markdown format.'),
  imageUrl: z.string().describe('A data URI for the generated featured image.'),
});
export type GeneratePostOutput = z.infer<typeof GeneratePostOutputSchema>;

export async function generatePost(input: GeneratePostInput): Promise<GeneratePostOutput> {
  return generatePostFlow(input);
}

// Prompt to generate the blog post content
const contentPrompt = ai.definePrompt({
  name: 'postContentPrompt',
  input: { schema: GeneratePostInputSchema },
  output: { schema: z.object({ content: z.string() }) },
  prompt: `You are an expert content writer. Write a blog post based on the following title.
The post should be engaging, well-structured, and formatted in Markdown.
Include headings, lists, and bold text where appropriate.

Title: {{{title}}}`,
});

const generatePostFlow = ai.defineFlow(
  {
    name: 'generatePostFlow',
    inputSchema: GeneratePostInputSchema,
    outputSchema: GeneratePostOutputSchema,
  },
  async (input) => {
    // Generate content and image in parallel
    const [contentResponse, imageResponse] = await Promise.all([
      contentPrompt(input),
      ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `A professional, high-quality featured image for a blog post titled: "${input.title}". The image should be visually appealing and relevant to the topic.`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      }),
    ]);

    const content = contentResponse.output?.content || '';
    const imageUrl = imageResponse.media?.url || '';

    if (!content || !imageUrl) {
      throw new Error('Failed to generate post content or image.');
    }

    return {
      content,
      imageUrl,
    };
  }
);
