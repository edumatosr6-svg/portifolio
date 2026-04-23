export const TEMPLATES = [
  {
    id: 'code-review',
    category: 'Code',
    name: 'Code Review',
    icon: '🔍',
    prompt: `You are an expert code reviewer. Review the following code for:
- Bugs and potential issues
- Performance improvements
- Best practices and design patterns
- Security vulnerabilities

Code:
\`\`\`
[PASTE CODE HERE]
\`\`\`

Provide specific, actionable feedback.`,
  },
  {
    id: 'blog-writer',
    category: 'Content',
    name: 'Blog Post Writer',
    icon: '✍️',
    prompt: `Write a comprehensive blog post about [TOPIC].

Target audience: [AUDIENCE]
Tone: [professional/casual/technical]
Length: 1000-1500 words

Structure:
1. Engaging intro with a hook
2. Main points with examples
3. Practical takeaways
4. Clear conclusion

Include relevant subheadings and avoid fluff.`,
  },
  {
    id: 'bug-explainer',
    category: 'Code',
    name: 'Bug Explainer',
    icon: '🐛',
    prompt: `Explain this error message clearly:

Error: [PASTE ERROR]

Provide:
1. What the error means (plain language)
2. Common causes
3. Step-by-step solution
4. How to prevent it in the future`,
  },
  {
    id: 'summarizer',
    category: 'Analysis',
    name: 'Document Summarizer',
    icon: '📄',
    prompt: `Summarize the following text concisely:

[PASTE TEXT]

Output format:
- Main thesis (1 sentence)
- Key points (3-5 bullets)
- Notable insights or data
- Conclusion

Keep it under 200 words total.`,
  },
  {
    id: 'brainstorm',
    category: 'Creative',
    name: 'Idea Brainstorm',
    icon: '💡',
    prompt: `Generate 10 creative ideas for [TOPIC].

Constraints:
- Must be practical and actionable
- Vary in complexity (simple to advanced)
- Avoid generic suggestions

For each idea, provide:
1. Title
2. One-sentence description
3. Why it works`,
  },
  {
    id: 'tutor',
    category: 'Learning',
    name: 'Concept Tutor',
    icon: '🎓',
    prompt: `Explain [CONCEPT] to me as if I'm a [beginner/intermediate/advanced] learner.

Include:
1. Simple definition
2. Real-world analogy
3. A concrete example
4. Common misconceptions
5. How it connects to broader topics

Use markdown for formatting.`,
  },
  {
    id: 'email',
    category: 'Content',
    name: 'Professional Email',
    icon: '📧',
    prompt: `Write a professional email with these details:

To: [RECIPIENT]
Purpose: [REQUEST/FOLLOW-UP/PROPOSAL/etc]
Key points: [LIST MAIN POINTS]
Tone: [formal/friendly/urgent]

Include clear subject line, appropriate greeting, and a call-to-action.`,
  },
  {
    id: 'seo',
    category: 'Marketing',
    name: 'SEO Optimizer',
    icon: '🎯',
    prompt: `Optimize this content for SEO:

[PASTE CONTENT]

Target keyword: [KEYWORD]

Provide:
1. Optimized title (max 60 chars)
2. Meta description (max 160 chars)
3. 5 related keywords to include
4. Rewritten intro with keyword
5. Suggested H2/H3 structure`,
  },
]

export const CATEGORIES = [
  { id: 'all', name: 'All', icon: '📚' },
  { id: 'Code', name: 'Code', icon: '💻' },
  { id: 'Content', name: 'Content', icon: '📝' },
  { id: 'Analysis', name: 'Analysis', icon: '📊' },
  { id: 'Creative', name: 'Creative', icon: '🎨' },
  { id: 'Learning', name: 'Learning', icon: '🎓' },
  { id: 'Marketing', name: 'Marketing', icon: '📈' },
]
