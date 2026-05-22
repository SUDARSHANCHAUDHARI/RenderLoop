'use client'

import { useCallback, useEffect, useState } from 'react'
import { SKETCHES } from '@/lib/sketches'
import Gallery from '@/components/Gallery'
import Viewer from '@/components/Viewer'
import PlaylistPanel from '@/components/PlaylistPanel'
import { useGallery } from '@/hooks/useGallery'
import { useViewer } from '@/hooks/useViewer'
import { usePlaylist, PLAYLIST_DURATION_MS } from '@/hooks/usePlaylist'
import { useKeyboard } from '@/hooks/useKeyboard'
import type { SketchMeta } from '@/types'

export default function Home() {
  const gallery = useGallery()
  const viewer = useViewer()
  const playlist = usePlaylist()
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)

  const openRandom = useCallback(() => {
    const idx = Math.floor(Math.random() * SKETCHES.length)
    viewer.open(SKETCHES[idx])
  }, [viewer])

  const handleAddToPlaylist = useCallback((sketch: SketchMeta) => {
    playlist.add(sketch)
    setIsPlaylistOpen(true)
  }, [playlist])

  // Playlist auto-advance: when playing, open current sketch and schedule next
  useEffect(() => {
    if (!playlist.isPlaying || playlist.items.length === 0) return

    const current = playlist.items[playlist.index]
    if (current) viewer.open(current)

    const timer = setTimeout(() => {
      playlist.next(playlist.items.length)
    }, PLAYLIST_DURATION_MS)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist.isPlaying, playlist.index, playlist.items.length])

  useKeyboard({
    onSurprise: openRandom,
    onTogglePlaylist: () => setIsPlaylistOpen(p => !p),
    onClose: () => {
      if (viewer.isOpen) {
        viewer.close()
      } else {
        setIsPlaylistOpen(false)
      }
    },
    onNext: () => {
      playlist.next(playlist.items.length)
      if (playlist.isPlaying && playlist.items.length > 0) {
        viewer.open(playlist.items[(playlist.index + 1) % playlist.items.length])
      }
    },
    onPrev: () => {
      playlist.prev(playlist.items.length)
      if (playlist.isPlaying && playlist.items.length > 0) {
        const prevIdx = (playlist.index - 1 + playlist.items.length) % playlist.items.length
        viewer.open(playlist.items[prevIdx])
      }
    },
    onPause: playlist.togglePlay,
  })

  return (
    <>
      <Gallery
        sketches={gallery.sketches}
        sort={gallery.sort}
        search={gallery.search}
        activeTag={gallery.activeTag}
        totalCount={SKETCHES.length}
        onSort={gallery.setSort}
        onSearch={gallery.setSearch}
        onTagToggle={gallery.toggleTag}
        onOpen={viewer.open}
        onAddToPlaylist={handleAddToPlaylist}
        onSurprise={openRandom}
        onTogglePlaylist={() => setIsPlaylistOpen(p => !p)}
        playlistCount={playlist.items.length}
      />

      {viewer.isOpen && viewer.current && (
        <Viewer
          sketch={viewer.current}
          onClose={viewer.close}
          onAddToPlaylist={handleAddToPlaylist}
        />
      )}

      <PlaylistPanel
        items={playlist.items}
        currentIndex={playlist.index}
        isPlaying={playlist.isPlaying}
        isShuffled={playlist.isShuffled}
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        onRemove={playlist.remove}
        onClear={playlist.clear}
        onPlay={playlist.togglePlay}
        onShuffle={playlist.toggleShuffle}
        onSelect={sketch => {
          viewer.open(sketch)
          setIsPlaylistOpen(false)
        }}
      />
    </>
  )
}
