import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export function NavMain({ items, pathname }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              pathname === item.url ||
              (item.url !== "/" && pathname.startsWith(item.url + "/"));

            return (
              <SidebarMenuItem key={item.title}>
                <Link to={item.url} id={item.id}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`flex items-center justify-between gap-2 py-4.5 pr-2 pl-4 rounded-[8px]
                      transition-colors duration-150  
                      ${isActive
                        ? "bg-primary text-white font-semibold hover:bg-primary hover:text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white dark:hover:bg-gray-800"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <item.icon
                          className="w-5 h-5 flex-shrink-0"
                        />
                      )}
                      <span className="font-medium ">{item.title}</span>
                    </div>
                    <ChevronRight className="w-5 h-5" />
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
