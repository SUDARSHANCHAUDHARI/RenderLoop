'use client'

import { useEffect } from 'react'

interface KeyBindings {
  onSurprise?: () => void
  onTogglePlaylist?: () => void
  onClose?: () => void
  onNext?: () => void
  onPrev?: () => void
  onPause?: () => void
}

export function useKeyboard(bindings: KeyBindings) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return

      switch (e.key.toLowerCase()) {
        case 's': bindings.onSurprise?.(); break
        case 'p': bindings.onTogglePlaylist?.(); break
        case 'escape': bindings.onClose?.(); break
        case 'arrowright': bindings.onNext?.(); break
        case 'arrowleft': bindings.onPrev?.(); break
        case ' ':
          e.preventDefault()
          bindings.onPause?.()
          break
      }
    }

    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [bindings])
}
