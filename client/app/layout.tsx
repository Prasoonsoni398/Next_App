import "./globals.css"
import Navigation from "@/components/Navigation"
import {Roboto} from "next/font/google" 
import {Work_Sans} from "next/font/google"
import { ReactNode } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto"
})

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans"
})

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps){
  return(
    <html lang="en">
      <body className={` ${roboto.className} ${workSans.className}`}>
        <Navigation/>
        {children}
      </body>
    </html>
  )
}