import { Code, ImageIcon, LayoutDashboard, MessageSquare, 
    // Music, VideoIcon 
} from "lucide-react";

export const NAVBAR = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
        color: "text-sky-500",
      },
      {
        label: "Conversation",
        icon: MessageSquare,
        path: "/chat",
        color: "text-yellow-500",
      },
      {
        label: "Image Generation",
        icon: ImageIcon,
        path: "/image",
        color: "text-pink-500",
      },
    //   {
    //     label: "Video Generation",
    //     icon: VideoIcon,
    //     path: "/video",
    //     color: "text-orange-500",
    //   },
    //   {
    //     label: "Music Generation",
    //     icon: Music,
    //     path: "/music",
    //     color: "text-emerald-500",
    //   },
      {
        label: "Code Generation",
        icon: Code,
        path: "/code",
        color: "text-green-500",
      },
]