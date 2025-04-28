import { type User } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface SidebarProps {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ user, isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "w-64 flex-shrink-0 flex flex-col bg-white border-r border-gray-200 h-screen sticky top-0",
          "transition-transform duration-300 ease-in-out z-50",
          "md:translate-x-0 md:static",
          isOpen ? "fixed inset-y-0 left-0 translate-x-0" : "fixed inset-y-0 left-0 -translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-4 flex items-center border-b border-gray-200">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white mr-3">
            <i className="fas fa-wallet"></i>
          </div>
          <h1 className="text-xl font-bold">FinanceApp</h1>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 flex-1">
          <div className="space-y-1">
            <Link href="/">
              <a className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary bg-opacity-10 text-primary">
                <i className="fas fa-home w-5 h-5 mr-3"></i>
                Dashboard
              </a>
            </Link>
            <Link href="#">
              <a className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
                <i className="fas fa-credit-card w-5 h-5 mr-3"></i>
                Cards
              </a>
            </Link>
            <Link href="#">
              <a className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
                <i className="fas fa-exchange-alt w-5 h-5 mr-3"></i>
                Transactions
              </a>
            </Link>
            <Link href="#">
              <a className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
                <i className="fas fa-chart-line w-5 h-5 mr-3"></i>
                Analytics
              </a>
            </Link>
            <Link href="#">
              <a className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
                <i className="fas fa-book w-5 h-5 mr-3"></i>
                Documentation
              </a>
            </Link>
          </div>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <i className="fas fa-user text-gray-500"></i>
            </div>
            <div>
              <p className="text-sm font-medium">{user?.fullName || "Loading..."}</p>
              <p className="text-xs text-gray-500">{user?.email || "Loading..."}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
