import { Link } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

// Highlight active nav item based on current route
export function NavMain({ items, pathname }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            // Determine if nav item is active
            const isActive =
              pathname === item.url ||
              (item.url !== "/" && pathname.startsWith(item.url + "/"));

            return (
              <SidebarMenuItem key={item.title}>
                <Link to={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg
                      transition-colors duration-150
                      ${isActive
                        ? "bg-primary text-white font-semibold"
                        : "hover:bg-primary dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-white"
                      }
                    `}
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}