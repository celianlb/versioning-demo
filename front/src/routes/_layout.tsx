import { Outlet } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

type VersionInfo = { appVersion: string; dbVersion: string }

export default function Layout() {
  const [info, setInfo] = useState<VersionInfo | null>(null)

  useEffect(() => {
    fetch('/api/version')
      .then((r) => r.json())
      .then(setInfo)
      .catch(() => setInfo(null))
  }, [])

  return (
    <main style={{ fontFamily: 'system-ui', padding: 24, lineHeight: 1.5 }}>
      <h1>versioning-demo</h1>
      <p>Démo versioning front/back/db + TanStack Router</p>
      {info ? (
        <ul>
          <li><b>App version:</b> {info.appVersion}</li>
          <li><b>DB version:</b> {info.dbVersion}</li>
        </ul>
      ) : (
        <p>Chargement…</p>
      )}
      <hr />
      <Outlet />
    </main>
  )
}