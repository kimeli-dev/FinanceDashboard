import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/types";
import { 
  Home, 
  CreditCard, 
  FileText, 
  PlusCircle, 
  Settings,
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [location] = useLocation();
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user']
  });

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Cards", href: "/cards", icon: CreditCard },
    { name: "Transactions", href: "/transactions", icon: FileText },
    { name: "Payments", href: "/payments", icon: PlusCircle },
    { name: "Documentation", href: "/documentation", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar for mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
            <h1 className="text-xl font-bold text-primary">FinancePortal</h1>
            <button
              className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto pt-5 pb-4">
            <div className="px-2 space-y-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      location === item.href
                        ? "bg-primary-50 text-primary"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-6 w-6",
                        location === item.href
                          ? "text-primary"
                          : "text-gray-400 group-hover:text-gray-500"
                      )}
                    />
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </nav>

          {user && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.avatarUrl || "https://via.placeholder.com/40"}
                    alt="User profile"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs font-medium text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
              <h1 className="text-xl font-bold text-primary">FinancePortal</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={cn(
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                        location === item.href
                          ? "bg-primary-50 text-primary"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 h-6 w-6",
                          location === item.href
                            ? "text-primary"
                            : "text-gray-400 group-hover:text-gray-500"
                        )}
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
            {user && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatarUrl || "https://via.placeholder.com/40"}
                      alt="User profile"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs font-medium text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
