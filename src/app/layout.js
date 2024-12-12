import '@/styles/globals.css'

export const metadata = {
  title: 'TV Guide EPG',
  description: 'TV Channel Guide and EPG',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
