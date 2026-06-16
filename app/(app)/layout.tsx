'use client'

import './app.css'
import { AppProvider } from '@/lib/store'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import ToolDrawer from '@/components/ToolDrawer'
import RegisterDrawer from '@/components/RegisterDrawer'
import Toast from '@/components/Toast'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="app-shell">
        <Sidebar />
        <div className="main">
          <Topbar />
          <div className="content">{children}</div>
        </div>
      </div>
      <ToolDrawer />
      <RegisterDrawer />
      <Toast />
    </AppProvider>
  )
}
