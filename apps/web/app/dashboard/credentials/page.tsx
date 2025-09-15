export default function CredentialsPage() {
  // Mock data for credentials
  const credentials = [
    {
      id: 1,
      name: "Telegram Bot Token",
      type: "Telegram",
      createdAt: "2023-05-01",
      usedBy: 2,
    },
    {
      id: 2,
      name: "Resend API Key",
      type: "Resend",
      createdAt: "2023-05-03",
      usedBy: 1,
    },
    {
      id: 3,
      name: "Form Webhook",
      type: "Form Trigger",
      createdAt: "2023-05-10",
      usedBy: 3,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold">Credentials</h2>
        <p className="text-gray-600">Manage your service credentials</p>
      </div>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Your Credentials</h3>
            <p className="text-gray-500 text-sm">List of all your credentials</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {credentials.map((credential) => (
            <div key={credential.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{credential.name}</h4>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {credential.type}
                    </span>
                    <span className="text-sm text-gray-500">Created: {credential.createdAt}</span>
                    <span className="text-sm text-gray-500">Used by {credential.usedBy} workflows</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    Edit
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