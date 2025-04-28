import { Link } from "wouter";

const MobileNavigation = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 z-30">
      <div className="flex justify-between items-center">
        <Link href="/">
          <a className="flex flex-col items-center text-primary">
            <i className="fas fa-home text-xl"></i>
            <span className="text-xs mt-1">Home</span>
          </a>
        </Link>
        <Link href="#">
          <a className="flex flex-col items-center text-gray-500">
            <i className="fas fa-credit-card text-xl"></i>
            <span className="text-xs mt-1">Cards</span>
          </a>
        </Link>
        <Link href="#">
          <a className="flex flex-col items-center text-gray-500">
            <i className="fas fa-exchange-alt text-xl"></i>
            <span className="text-xs mt-1">Transfer</span>
          </a>
        </Link>
        <Link href="#">
          <a className="flex flex-col items-center text-gray-500">
            <i className="fas fa-book text-xl"></i>
            <span className="text-xs mt-1">Docs</span>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavigation;
