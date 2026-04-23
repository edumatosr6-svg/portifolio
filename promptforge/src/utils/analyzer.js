// Prompt quality analyzer
export function analyzePrompt(prompt) {
  const text = prompt.trim()
  const wordCount = text.split(/\s+/).filter(Boolean).length
  const charCount = text.length
  const lineCount = text.split('\n').length

  const scores = {
    clarity: analyzeClarity(text),
    specificity: analyzeSpecificity(text),
    structure: analyzeStructure(text),
    context: analyzeContext(text),
  }

  const overall = Math.round(
    (scores.clarity + scores.specificity + scores.structure + scores.context) / 4
  )

  const suggestions = generateSuggestions(text, scores)

  return {
    scores,
    overall,
    suggestions,
    stats: { wordCount, charCount, lineCount },
  }
}

function analyzeClarity(text) {
  let score = 50
  if (text.length > 50) score += 15
  if (/\b(please|kindly)\b/i.test(text)) score += 5
  if (text.split('.').length > 2) score += 10
  if (/[?:]/g.test(text)) score += 10
  // Penalize ambiguity
  if (/\b(maybe|might|perhaps|possibly)\b/i.test(text)) score -= 10
  if (text.length < 30) score -= 20
  return Math.max(0, Math.min(100, score))
}

function analyzeSpecificity(text) {
  let score = 40
  // Concrete requirements
  if (/\b(must|should|need|require)\b/i.test(text)) score += 15
  // Numbers / constraints
  if (/\b\d+\b/.test(text)) score += 10
  // Examples
  if (/\b(example|for instance|such as|e\.g\.)\b/i.test(text)) score += 15
  // Format specification
  if (/\b(format|structure|output|JSON|markdown|list)\b/i.test(text)) score += 15
  // Placeholders (uncustomized)
  if (/\[[A-Z\s]+\]/.test(text)) score -= 15
  return Math.max(0, Math.min(100, score))
}

function analyzeStructure(text) {
  let score = 40
  const lines = text.split('\n').filter((l) => l.trim())
  if (lines.length >= 3) score += 15
  if (/^\d+\.|\*|-/m.test(text)) score += 20 // lists
  if (/^#{1,6}\s/m.test(text) || /:$/m.test(text)) score += 15 // headings
  if (/```/.test(text)) score += 10 // code blocks
  return Math.max(0, Math.min(100, score))
}

function analyzeContext(text) {
  let score = 40
  if (/\b(you are|act as|role)\b/i.test(text)) score += 20
  if (/\b(audience|target|for)\b/i.test(text)) score += 15
  if (/\b(context|background|given)\b/i.test(text)) score += 15
  if (/\b(tone|style|voice)\b/i.test(text)) score += 10
  return Math.max(0, Math.min(100, score))
}

function generateSuggestions(text, scores) {
  const suggestions = []

  if (scores.clarity < 70) {
    suggestions.push({
      type: 'clarity',
      severity: 'medium',
      message: 'Add more descriptive details to improve clarity',
    })
  }
  if (scores.specificity < 70) {
    if (!/\b(format|output)\b/i.test(text)) {
      suggestions.push({
        type: 'specificity',
        severity: 'high',
        message: 'Specify desired output format (e.g., JSON, bullet list, markdown)',
      })
    }
    if (!/\b(example|e\.g\.)\b/i.test(text)) {
      suggestions.push({
        type: 'specificity',
        severity: 'medium',
        message: 'Consider adding concrete examples',
      })
    }
  }
  if (scores.context < 70) {
    if (!/\b(you are|act as)\b/i.test(text)) {
      suggestions.push({
        type: 'context',
        severity: 'high',
        message: 'Define a role for the AI (e.g., "You are an expert...")',
      })
    }
  }
  if (scores.structure < 70 && text.length > 100) {
    suggestions.push({
      type: 'structure',
      severity: 'low',
      message: 'Break into sections using lists or headings',
    })
  }
  if (/\[[A-Z\s]+\]/.test(text)) {
    suggestions.push({
      type: 'completeness',
      severity: 'high',
      message: 'Replace placeholders ([BRACKETS]) with real content',
    })
  }

  return suggestions
}

export function optimizePrompt(text) {
  let optimized = text.trim()

  // Add role if missing
  if (!/\b(you are|act as)\b/i.test(optimized)) {
    optimized = `You are an expert assistant. ${optimized}`
  }

  // Add clarity markers
  if (!/\b(please|kindly)\b/i.test(optimized) && optimized.length > 20) {
    optimized = optimized.replace(/\.$/, '. Please be specific and thorough.')
    if (!optimized.endsWith('.')) {
      optimized += '. Please be specific and thorough.'
    }
  }

  // Add output format hint
  if (!/\b(format|output|markdown|JSON|list)\b/i.test(optimized)) {
    optimized += '\n\nFormat your response clearly with headings and bullet points where appropriate.'
  }

  return optimized
}
