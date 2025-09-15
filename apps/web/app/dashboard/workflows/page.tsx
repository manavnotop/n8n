export default function WorkflowsPage() {
  // Mock data for workflows
  const workflows = [
    {
      id: 1,
      name: "Contact Form to Telegram",
      status: "active",
      lastRun: "2023-05-15 14:30",
      nodes: 3,
    },
    {
      id: 2,
      name: "Newsletter Signup",
      status: "inactive",
      lastRun: "2023-05-10 09:15",
      nodes: 4,
    },
    {
      id: 3,
      name: "Support Ticket Notification",
      status: "active",
      lastRun: "2023-05-18 16:45",
      nodes: 5,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold">Workflows</h2>
        <p className="text-gray-600">Manage your automation workflows</p>
      </div>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Your Workflows</h3>
            <p className="text-gray-500 text-sm">List of all your workflows</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{workflow.name}</h4>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      workflow.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {workflow.status}
                    </span>
                    <span className="text-sm text-gray-500">{workflow.nodes} nodes</span>
                    <span className="text-sm text-gray-500">Last run: {workflow.lastRun}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    Edit
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    Duplicate
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    Delete
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