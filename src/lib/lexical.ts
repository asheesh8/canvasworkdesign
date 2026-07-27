/**
 * Minimal plain-text ↔ Lexical editor-state helpers so the custom Studio
 * can edit Payload richText fields with a simple textarea.
 */

export function textToLexical(text: string) {
  const paragraphs = String(text || '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  const children = (paragraphs.length ? paragraphs : ['']).map((p) => ({
    type: 'paragraph',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    textFormat: 0,
    textStyle: '',
    children: [
      {
        type: 'text',
        version: 1,
        text: p,
        detail: 0,
        format: 0,
        mode: 'normal' as const,
        style: '',
      },
    ],
  }))

  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      children,
    },
  }
}

export function lexicalToText(state: any): string {
  const root = state?.root
  if (!root?.children?.length) return ''
  return root.children
    .map((node: any) => (node.children || []).map((c: any) => c.text || '').join(''))
    .join('\n\n')
    .trim()
}
