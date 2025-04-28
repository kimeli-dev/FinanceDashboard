const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary mb-2">
            <i className="fas fa-exchange-alt"></i>
          </div>
          <span className="text-xs font-medium">Transfer</span>
        </button>
        
        <button className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary mb-2">
            <i className="fas fa-qrcode"></i>
          </div>
          <span className="text-xs font-medium">Pay</span>
        </button>
        
        <button className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary mb-2">
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <span className="text-xs font-medium">Withdraw</span>
        </button>
        
        <button className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary mb-2">
            <i className="fas fa-history"></i>
          </div>
          <span className="text-xs font-medium">History</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
