
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";



export function NavSecondary({
  items,
  ...props
}) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url} className="flex items-center justify-between  py-4.5 pr-2 pl-4  rounded-[8px]
                      transition-colors duration-150" id={item.id}>
                  <div className="flex items-center gap-2">
                    <item.icon className="w-5 h-5 flex-shrink-0 transition-transform duration-200" />
                    <span className="font-medium">{item.title}</span>
                  </div>


                  <ChevronRight />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
