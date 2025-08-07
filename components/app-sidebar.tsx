import {
  Home,
  ChartCandlestick,
  LogIn,
  LogOut,
  User2,
  ChevronUp,
} from "lucide-react";
import { logOut } from "@/actions";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface AppNavbarProps {
  userId: string | null,
  userName: string | null
}

/**
 * Main navigation sidebar component that handles the application's primary navigation.
 * 
 * Features:
 * - Responsive design with mobile support
 * - Dynamic menu items based on authentication state
 * - Navigation to Home and Portfolio pages
 * - User authentication actions (login/logout)
 * - User profile management
 * 
 * Props:
 * @param {string} userId - Current user's ID, used for conditional rendering and portfolio link
 * @param {string} userName - Current user's name for display purposes
 */
const AppNavbar = ({ userId, userName }: AppNavbarProps) => {
  // Dynamic menu items based on authentication state
  const menuItems = userId ? [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "My Portfolio",
      url: `/${userId}/portfolio`,
      icon: ChartCandlestick,
    }
  ] : [
    {
      title: "Home",
      url: "/",
      icon: Home
    }
  ]

  const authMenuItems = userId
    ? {
        title: "Log Out",
        url: "/",
        icon: LogOut,
      }
    : {
        title: "Log In",
        url: "/login",
        icon: LogIn,
      };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Stock Predicition Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="pb-1">
            {userId ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {userName}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <SidebarMenuButton asChild>
                      <a href={`/${userId}`}>
                        <User2 />
                        <span>Account</span>
                      </a>
                    </SidebarMenuButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SidebarMenuButton asChild>
                      <a onClick={logOut}>
                        <authMenuItems.icon />
                        <span>{authMenuItems.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SidebarMenuButton>
                <a href="/login" className="flex flex-row w-full">
                  <authMenuItems.icon className="pr-1"/>
                  <span className="pl-1">{authMenuItems.title}</span>
                </a>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppNavbar;
