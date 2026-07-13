import Navigation from "@/components/Navigation"
import { ReactNode } from "react"

interface UserLayoutProps{
  children:ReactNode
}


export default function RootLAyout({ children }:UserLayoutProps) {
  return (

    <div className="min-h-screen ">

      {children}
    </div>

  )
}