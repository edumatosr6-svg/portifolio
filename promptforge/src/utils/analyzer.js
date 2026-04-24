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
      message: 'Adicione mais detalhes descritivos para melhorar a clareza',
    })
  }
  if (scores.specificity < 70) {
    if (!/\b(format|output|formato|saída)\b/i.test(text)) {
      suggestions.push({
        type: 'specificity',
        severity: 'high',
        message: 'Especifique o formato de saída desejado (ex: JSON, lista, markdown)',
      })
    }
    if (!/\b(example|e\.g\.|exemplo|por exemplo)\b/i.test(text)) {
      suggestions.push({
        type: 'specificity',
        severity: 'medium',
        message: 'Considere adicionar exemplos concretos',
      })
    }
  }
  if (scores.context < 70) {
    if (!/\b(you are|act as|você é|você é um)\b/i.test(text)) {
      suggestions.push({
        type: 'context',
        severity: 'high',
        message: 'Defina um papel para a IA (ex: "Você é um especialista em...")',
      })
    }
  }
  if (scores.structure < 70 && text.length > 100) {
    suggestions.push({
      type: 'structure',
      severity: 'low',
      message: 'Divida em seções usando listas ou títulos',
    })
  }
  if (/\[[A-Z\s]+\]/.test(text)) {
    suggestions.push({
      type: 'completeness',
      severity: 'high',
      message: 'Substitua os marcadores ([COLCHETES]) por conteúdo real',
    })
  }

  return suggestions
}

export function optimizePrompt(text) {
  let optimized = text.trim()

  if (!/\b(you are|act as|você é)\b/i.test(optimized)) {
    optimized = `Você é um assistente especialista.\n\n${optimized}`
  }

  if (optimized.length > 20 && !optimized.includes('específico')) {
    if (!optimized.endsWith('.')) optimized += '.'
    optimized += ' Seja específico e detalhado na resposta.'
  }

  if (!/\b(format|output|markdown|JSON|lista|formato)\b/i.test(optimized)) {
    optimized += '\n\nFormate sua resposta de forma clara, usando títulos e tópicos quando apropriado.'
  }

  return optimized
}
