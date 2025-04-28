const Documentation = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Documentation & Help</h2>
        <button className="text-sm text-primary hover:text-secondary transition-colors">
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary mr-3">
              <i className="fas fa-book"></i>
            </div>
            <div>
              <h3 className="font-medium text-sm">Getting Started Guide</h3>
              <p className="text-xs text-gray-500 mt-1">Learn the basics of your account and card management.</p>
              <a href="#" className="text-xs text-primary font-medium mt-2 inline-block">Read Guide →</a>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary mr-3">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div>
              <h3 className="font-medium text-sm">Security & Privacy</h3>
              <p className="text-xs text-gray-500 mt-1">Understand how we protect your financial information.</p>
              <a href="#" className="text-xs text-primary font-medium mt-2 inline-block">Read More →</a>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary mr-3">
              <i className="fas fa-credit-card"></i>
            </div>
            <div>
              <h3 className="font-medium text-sm">Card Usage Guidelines</h3>
              <p className="text-xs text-gray-500 mt-1">Tips for secure and effective card usage worldwide.</p>
              <a href="#" className="text-xs text-primary font-medium mt-2 inline-block">Read Guide →</a>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary mr-3">
              <i className="fas fa-question-circle"></i>
            </div>
            <div>
              <h3 className="font-medium text-sm">Frequently Asked Questions</h3>
              <p className="text-xs text-gray-500 mt-1">Answers to common questions about your account.</p>
              <a href="#" className="text-xs text-primary font-medium mt-2 inline-block">View FAQs →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
