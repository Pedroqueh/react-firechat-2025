import { useAuthActions } from "@/hooks/use-auth-actions";
import {
  LayoutDashboard,
  LogOut,
  MessageCircle,
  User,
  ClipboardCheck,
} from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

//Listado de URL a utilizar
const navigation = [
  { name: "Dashboard", href: "/admin/", icon: LayoutDashboard },
  { name: "Chat", href: "/admin/chat", icon: MessageCircle },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Tasks", href: "/admin/tasks", icon: ClipboardCheck },
];

const Navbar = () => {
  const { logout } = useAuthActions();

  return (
    <header className="shadow-md border-b">
      <nav className="p-4 flex gap-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              //cn para utilizar varias clases con operador ternario por ejemplo
              cn(
                "text-gray-600 hover:text-blue-800 flex items-center gap-2",
                isActive ? "text-black font-semibold" : "text-gray-600"
              )
            }
            //Para indicar que la ruta tiene que ser exacta
            end
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
        <Button onClick={logout} className="ml-auto">
          Logout
          <LogOut className="w-5 h-5" />
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
