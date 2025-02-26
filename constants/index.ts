import {
  Code, ImageIcon, LayoutDashboard, LucideNewspaper, MessageSquare,
  Settings,
  UsersRound
} from "lucide-react";

export const MAX_FREE_COUNTS =100

export function absoluteUrl(path: string){
return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const NAVBAR = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    about: "Monitor and manage your AI-driven dashboard.",
    color: "sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    path: "/chat",
    about: "Engage in real-time AI-powered conversations.",
    color: "violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    path: "/image",
    about: "Generate stunning AI-driven images from text.",
    color: "pink-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    path: "/code",
    about: "Instantly generate AI-assisted code snippets.",
    color: "green-500",
  },
  {
    label: "AI Companions",
    icon:  UsersRound,
    color: "orange-700",
    about: "Engage in real-time news and info conversations.",
    path: "/companions",
  },

  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
    about: "Customize your AI app settings and preferences.",
    color: "zinc-200",
  },
]

export const TOOLS = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/chat",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
    href: "/image",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
  {
    label: "AI Companions",
    icon:  UsersRound,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/companions",
  },

  {
    label: "Coming Soon",
    icon: LucideNewspaper,
    color: "text-sky-700",
    bgColor: "bg-sky-700/10",
    href: "/soon",
  },
]
