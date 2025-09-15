export default function ExecutionsPage() {
  // Mock data for executions
  const executions = [
    {
      id: 1,
      workflow: "Contact Form to Telegram",
      status: "success",
      startedAt: "2023-05-18 16:45:22",
      duration: "2.3s",
    },
    {
      id: 2,
      workflow: "Newsletter Signup",
      status: "failed",
      startedAt: "2023-05-18 15:30:10",
      duration: "1.1s",
    },
    {
      id: 3,
      workflow: "Support Ticket Notification",
      status: "success",
      startedAt: "2023-05-18 14:22:45",
      duration: "3.7s",
    },
    {
      id: 4,
      workflow: "Contact Form to Telegram",
      status: "success",
      startedAt: "2023-05-18 12:10:33",
      duration: "2.1s",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold">Executions</h2>
        <p className="text-gray-600">View workflow execution history</p>
      </div>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Recent Executions</h3>
            <p className="text-gray-500 text-sm">List of recent workflow executions</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {executions.map((execution) => (
            <div key={execution.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{execution.workflow}</h4>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      execution.status === "success" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {execution.status}
                    </span>
                    <span className="text-sm text-gray-500">Started: {execution.startedAt}</span>
                    <span className="text-sm text-gray-500">Duration: {execution.duration}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}