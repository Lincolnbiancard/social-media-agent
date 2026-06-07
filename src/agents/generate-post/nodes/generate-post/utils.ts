import { filterLinksForPostContent } from "../../../utils.js";

/**
 * Parse the LLM generation to extract the report from inside the <report> tag.
 * If the report can not be parsed, the original generation is returned.
 * @param generation The text generation to parse
 * @returns The parsed generation, or the unmodified generation if it cannot be parsed
 */
export function parseGeneration(generation: string): string {
  const reportMatch = generation.match(/<post>([\s\S]*?)<\/post>/);
  if (!reportMatch) {
    console.warn(
      "Could not parse post from generation:\nSTART OF POST GENERATION\n\n",
      generation,
      "\n\nEND OF POST GENERATION",
    );
  }
  return reportMatch ? reportMatch[1].trim() : generation;
}

export function formatPrompt(report: string, relevantLinks: string[]): string {
  return `Here is the report I wrote on the source content used as inspiration for this standalone original post:
<report>
${report}
</report>

These are the source links used to build the report. They are CONTEXT ONLY — DO NOT INCLUDE THESE URLS IN THE POST. The post must be standalone original content; the reader should never be sent away to read the source.
<source-context-only-do-not-include>
${filterLinksForPostContent(relevantLinks)}
</source-context-only-do-not-include>`;
}
