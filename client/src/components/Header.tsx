interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header = ({ title, onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-2 text-gray-500"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700" aria-label="Notifications">
          <i className="fas fa-bell"></i>
        </button>
        <button className="text-gray-500 hover:text-gray-700" aria-label="Settings">
          <i className="fas fa-cog"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
