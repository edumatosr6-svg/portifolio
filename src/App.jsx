import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

const STANDALONE_URL = '/standalone-portfolio.html'
const STANDALONE_ROOT_ID = 'standalone-root'
const STANDALONE_STYLE_ID = 'standalone-base-style'

function patchRootTarget(scriptText) {
  return scriptText
    .replaceAll("document.getElementById('root')", `document.getElementById('${STANDALONE_ROOT_ID}')`)
    .replaceAll('document.getElementById("root")', `document.getElementById("${STANDALONE_ROOT_ID}")`)
}

function copyStandaloneHeadLinks(sourceDoc) {
  const links = Array.from(sourceDoc.querySelectorAll('head link[rel]'))
  const existingStandaloneLinks = Array.from(document.head.querySelectorAll('link[data-standalone-key]'))

  for (const sourceLink of links) {
    const href = sourceLink.getAttribute('href')
    if (!href) continue

    const rel = sourceLink.getAttribute('rel') || 'stylesheet'
    const key = `${rel}:${href}`
    const exists = existingStandaloneLinks.some((link) => link.getAttribute('data-standalone-key') === key)

    if (exists) continue

    const newLink = document.createElement('link')
    for (const attr of sourceLink.getAttributeNames()) {
      newLink.setAttribute(attr, sourceLink.getAttribute(attr) || '')
    }
    newLink.setAttribute('data-standalone-key', key)
    document.head.appendChild(newLink)
  }
}

function copyStandaloneBaseStyle(sourceDoc) {
  const sourceStyle = sourceDoc.querySelector('head style')
  if (!sourceStyle) return

  let targetStyle = document.getElementById(STANDALONE_STYLE_ID)
  if (!targetStyle) {
    targetStyle = document.createElement('style')
    targetStyle.id = STANDALONE_STYLE_ID
    document.head.appendChild(targetStyle)
  }

  targetStyle.textContent = sourceStyle.textContent
}

function getTranspiledStandaloneScripts(sourceDoc) {
  return Array.from(sourceDoc.querySelectorAll('head > script:not([src]):not([type])'))
    .map((script) => script.textContent || '')
    .filter(Boolean)
}

function runInlineScript(scriptText) {
  // eslint-disable-next-line no-new-func
  new Function(scriptText)()
}

export default function App() {
  const bootedRef = useRef(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (bootedRef.current || window.__standalonePortfolioBooted) return

    bootedRef.current = true
    window.__standalonePortfolioBooted = true

    let canceled = false

    const boot = async () => {
      try {
        const response = await fetch(STANDALONE_URL)
        if (!response.ok) {
          throw new Error(`Failed to load standalone portfolio (${response.status})`)
        }

        const html = await response.text()
        if (canceled) return

        const sourceDoc = new DOMParser().parseFromString(html, 'text/html')

        const pageTitle = sourceDoc.querySelector('title')?.textContent?.trim()
        if (pageTitle) {
          document.title = pageTitle
        }

        const htmlStyle = sourceDoc.documentElement.getAttribute('style')
        if (htmlStyle) {
          document.documentElement.setAttribute('style', htmlStyle)
        }

        copyStandaloneHeadLinks(sourceDoc)
        copyStandaloneBaseStyle(sourceDoc)

        // The standalone scripts are UMD-style and expect globals.
        window.React = React
        window.ReactDOM = { createRoot }
        const THREE = await import('three')
        window.THREE = THREE

        const mountNode = document.getElementById(STANDALONE_ROOT_ID)
        if (!mountNode) {
          throw new Error('Standalone mount node not found')
        }

        mountNode.replaceChildren()

        const inlineScripts = getTranspiledStandaloneScripts(sourceDoc)
        for (const scriptText of inlineScripts) {
          runInlineScript(patchRootTarget(scriptText))
        }
      } catch (err) {
        if (!canceled) {
          const message = err instanceof Error ? err.message : 'Unknown error loading standalone portfolio'
          setError(message)
        }
      }
    }

    boot()

    return () => {
      canceled = true
    }
  }, [])

  if (error) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#080810', color: '#f1f5f9' }}>
        <p style={{ fontFamily: 'monospace', fontSize: 14 }}>Erro ao carregar o portfolio: {error}</p>
      </main>
    )
  }

  return (
    <main style={{ width: '100%', minHeight: '100vh', background: '#080810' }}>
      <div id={STANDALONE_ROOT_ID} />
    </main>
  )
}
