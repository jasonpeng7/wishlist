import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider 
    signInForceRedirectUrl="/groups"
    signInFallbackRedirectUrl="/groups"
    signUpFallbackRedirectUrl="/groups"
    afterSignOutUrl="/"
    >
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
        </head>
        <body className='bg-slate_gray'>
          <header>
            <SignedOut>
            </SignedOut>
            <div className='user_button'>
              <SignedIn>
              </SignedIn>
            </div>
          </header>
          <main>
            {children}
            <Analytics/>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}