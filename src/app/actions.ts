"use server";

import { suggestTags, type SuggestTagsInput, type SuggestTagsOutput } from "@/ai/flows/suggest-tags";

export async function getTagSuggestions(input: SuggestTagsInput): Promise<SuggestTagsOutput> {
  try {
    const result = await suggestTags(input);
    return result;
  } catch (error) {
    console.error("Error suggesting tags:", error);
    return { tags: [] };
  }
}
