import { useEffect, useRef, useState } from 'react'
import API from '../api/axios'
import { unwrap } from '../utils/property'

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const [unread, setUnread] = useState(0)
  const boxRef = useRef(null)

  const loadUnread = () => {
    API.get('/api/notifications/unread-count')
      .then((res) => setUnread(Number(unwrap(res)) || 0))
      .catch(() => {})
  }

  useEffect(() => {
    loadUnread()
    const interval = setInterval(loadUnread, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const toggleOpen = () => {
    const next = !open
    setOpen(next)
    if (next) {
      API.get('/api/notifications')
        .then((res) => {
          const d = unwrap(res)
          setItems(d?.content ?? d ?? [])
        })
        .catch(() => {})
    }
  }

  const markAllRead = async () => {
    try {
      await API.put('/api/notifications/read-all')
      setUnread(0)
      setItems((prev) => prev.map((n) => ({ ...n, read: true })))
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative" ref={boxRef}>
      <button onClick={toggleOpen} className="relative text-lg" style={{ color: '#23262B' }}>
        🔔
        {unread > 0 && (
          <span
            className="absolute -top-1 -right-1 text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center"
            style={{ backgroundColor: '#B5563A' }}
          >
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border z-50"
          style={{ borderColor: '#DEDACF' }}
        >
          <div
            className="flex items-center justify-between px-4 py-2 border-b"
            style={{ borderColor: '#DEDACF' }}
          >
            <p className="text-sm font-medium" style={{ color: '#23262B' }}>Notifications</p>
            <button onClick={markAllRead} className="text-xs" style={{ color: '#2F4538' }}>
              Mark all read
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-sm p-4" style={{ color: '#8A877E' }}>No notifications.</p>
            ) : (
              items.map((n, i) => (
                <div
                  key={n.id ?? i}
                  className="px-4 py-3 text-sm border-b last:border-0"
                  style={{
                    borderColor: '#F0EEE8',
                    backgroundColor: n.read ? '#fff' : '#F6F3ED',
                    color: '#5C5A54',
                  }}
                >
                  {n.message || n.title || JSON.stringify(n)}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}