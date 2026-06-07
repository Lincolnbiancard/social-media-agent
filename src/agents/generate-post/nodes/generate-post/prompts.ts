import { getPrompts } from "../../prompts/index.js";

export const GENERATE_POST_PROMPT = `You are writing your OWN opinionated LinkedIn post about the topic of the source content. You are NOT a marketing employee for any brand. Do NOT speak as a brand. Do NOT use "LangChain Community Spotlight" or any similar template prefix — those examples come from a different system and you must ignore that pattern entirely.

You've been given a marketing report on a source article. Use the report ONLY as raw material: extract the strongest 2-3 ideas, then rewrite them in your own voice with conviction. The post is standalone — the reader gets full value without ever leaving the post.

The examples below show the TONE, RHYTHM, and STYLE you should match (short paragraphs, direct address with "você", opinionated, no corporate language). DO NOT copy any sentence or example verbatim. DO NOT use the same topic as the examples — they are tonal references, not templates. Generate fresh, original content tied to the SOURCE article's specific ideas.

<style-examples-do-not-copy-content>
${getPrompts().tweetExamples}
</style-examples-do-not-copy-content>

Structure to follow:
${getPrompts().postStructureInstructions}

Rules:
<rules>
${getPrompts().postContentRules}
</rules>

{reflectionsPrompt}

Writing process:
<writing-process>
Step 1. Read the marketing report carefully and identify the 2-3 most non-obvious or counter-intuitive ideas in it.
Step 2. Inside <thinking> tags, jot notes: what's the contrarian angle? what's the specific mechanism behind each idea? what concrete example or consequence would make this resonate? what's the sharp takeaway?
Step 3. Inside <post> tags, write the post. It must be in pt-BR, standalone (no source URL, no "leia mais" CTA), 8-14 sentences in the body, opinionated, with conviction. ABSOLUTELY DO NOT prepend any brand prefix like "LangChain Community Spotlight" or any other corporate header.
</writing-process>

Write only ONE post.`;
