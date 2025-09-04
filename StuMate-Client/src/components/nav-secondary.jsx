
import { ChevronRight, LogOut } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
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
  const { signOutUser } = useContext(AuthContext);


  const handleLogout = () => {
    if (signOutUser) {
      signOutUser();
    } else {
      console.log("Logging out...");
    }
  };
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url} className="flex items-center justify-between  py-4.5 pr-2 pl-4  rounded-[8px]
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
          <button className="flex items-center gap-3.5  p-2.5 pl-4.5  rounded-[8px]
                      transition-colors duration-150" onClick={handleLogout}>
            <LogOut className="w-4.5 h-4.5 flex-shrink-0 transition-transform duration-200" /><span className="font-medium">Log Out</span>
          </button>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
