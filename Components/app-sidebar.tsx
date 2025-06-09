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

const AppNavbar = ({ userId, userName }: AppNavbarProps) => {
  const menuItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "My Portfolio",
      url: `/${userId}/portfolio`,
      icon: ChartCandlestick,
    },
  ];

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
                      <a href={authMenuItems.url}>
                        <authMenuItems.icon />
                        <span>{authMenuItems.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SidebarMenuButton>
                <a href="/login">
                  <authMenuItems.icon />
                  <span>{authMenuItems.title}</span>
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
