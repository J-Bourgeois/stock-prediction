import { Home, ChartCandlestick, LogIn, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppNavbarProps {
  userId: string | null;
}

const AppNavbar = ({ userId }: AppNavbarProps) => {
  const defaultMenuItems = [
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

  const menuItems = [...defaultMenuItems, authMenuItems];

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
    </Sidebar>
  );
};

export default AppNavbar;
