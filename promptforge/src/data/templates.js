export const TEMPLATES = [
  {
    id: 'code-review',
    category: 'Código',
    name: 'Revisão de Código',
    icon: '🔍',
    prompt: `Você é um revisor de código especialista. Revise o código abaixo buscando:
- Bugs e problemas potenciais
- Melhorias de performance
- Boas práticas e padrões de design
- Vulnerabilidades de segurança

Código:
\`\`\`
[COLE O CÓDIGO AQUI]
\`\`\`

Forneça feedback específico e acionável.`,
  },
  {
    id: 'blog-writer',
    category: 'Conteúdo',
    name: 'Escritor de Blog',
    icon: '✍️',
    prompt: `Escreva um artigo completo sobre [TÓPICO].

Público-alvo: [PÚBLICO]
Tom: [profissional/casual/técnico]
Tamanho: 1000-1500 palavras

Estrutura:
1. Introdução envolvente com gancho
2. Pontos principais com exemplos
3. Conclusões práticas
4. Conclusão clara

Inclua subtítulos relevantes e evite enrolação.`,
  },
  {
    id: 'bug-explainer',
    category: 'Código',
    name: 'Explicador de Bugs',
    icon: '🐛',
    prompt: `Explique esta mensagem de erro de forma clara:

Erro: [COLE O ERRO]

Forneça:
1. O que o erro significa (linguagem simples)
2. Causas comuns
3. Solução passo a passo
4. Como prevenir no futuro`,
  },
  {
    id: 'summarizer',
    category: 'Análise',
    name: 'Resumidor de Documentos',
    icon: '📄',
    prompt: `Resuma o texto abaixo de forma concisa:

[COLE O TEXTO]

Formato de saída:
- Tese principal (1 frase)
- Pontos-chave (3-5 tópicos)
- Dados ou insights relevantes
- Conclusão

Máximo de 200 palavras no total.`,
  },
  {
    id: 'brainstorm',
    category: 'Criativo',
    name: 'Brainstorm de Ideias',
    icon: '💡',
    prompt: `Gere 10 ideias criativas para [TÓPICO].

Restrições:
- Devem ser práticas e executáveis
- Varie a complexidade (simples a avançada)
- Evite sugestões genéricas

Para cada ideia, forneça:
1. Título
2. Descrição em uma frase
3. Por que funciona`,
  },
  {
    id: 'tutor',
    category: 'Aprendizado',
    name: 'Tutor de Conceitos',
    icon: '🎓',
    prompt: `Explique [CONCEITO] como se eu fosse um aluno [iniciante/intermediário/avançado].

Inclua:
1. Definição simples
2. Analogia do mundo real
3. Exemplo concreto
4. Conceitos errôneos comuns
5. Como se conecta a tópicos mais amplos

Use markdown para formatação.`,
  },
  {
    id: 'email',
    category: 'Conteúdo',
    name: 'E-mail Profissional',
    icon: '📧',
    prompt: `Escreva um e-mail profissional com os seguintes detalhes:

Para: [DESTINATÁRIO]
Objetivo: [SOLICITAÇÃO/FOLLOW-UP/PROPOSTA/etc]
Pontos principais: [LISTE OS PONTOS]
Tom: [formal/amigável/urgente]

Inclua assunto claro, saudação adequada e chamada para ação.`,
  },
  {
    id: 'seo',
    category: 'Marketing',
    name: 'Otimizador SEO',
    icon: '🎯',
    prompt: `Otimize este conteúdo para SEO:

[COLE O CONTEÚDO]

Palavra-chave alvo: [PALAVRA-CHAVE]

Forneça:
1. Título otimizado (máx. 60 caracteres)
2. Meta descrição (máx. 160 caracteres)
3. 5 palavras-chave relacionadas para incluir
4. Introdução reescrita com a palavra-chave
5. Estrutura sugerida de H2/H3`,
  },
]

export const CATEGORIES = [
  { id: 'all', name: 'Todos', icon: '📚' },
  { id: 'Código', name: 'Código', icon: '💻' },
  { id: 'Conteúdo', name: 'Conteúdo', icon: '📝' },
  { id: 'Análise', name: 'Análise', icon: '📊' },
  { id: 'Criativo', name: 'Criativo', icon: '🎨' },
  { id: 'Aprendizado', name: 'Aprendizado', icon: '🎓' },
  { id: 'Marketing', name: 'Marketing', icon: '📈' },
]
