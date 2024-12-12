import '@/styles/globals.css'

export const metadata = {
  title: 'TV Guide EPG',
  description: 'TV Channel Guide and EPG',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}
