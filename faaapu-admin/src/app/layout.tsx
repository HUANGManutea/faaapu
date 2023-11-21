import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './components/footer'
import { UserProvider } from './contexts/user-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Fa'a'apu admin",
  description: "Administration de l'application Fa'a'apu",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="faaapu-favicon-32x32.png"/>
      </head>
      <body className={inter.className}>
        <UserProvider>
          {children}
          <Footer></Footer>
        </UserProvider>
      </body>
    </html>
  )
}
