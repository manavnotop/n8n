import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to your dashboard</h2>
      <p className="text-gray-600 mb-6">
        This is your n8n clone dashboard. You can manage your workflows, credentials, and executions from here.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/workflows">
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <h3 className="font-semibold text-lg mb-2">Workflows</h3>
            <p className="text-gray-600">Manage your automation workflows</p>
          </div>
        </Link>
        <Link href="/dashboard/credentials">
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <h3 className="font-semibold text-lg mb-2">Credentials</h3>
            <p className="text-gray-600">Manage your service credentials</p>
          </div>
        </Link>
        <Link href="/dashboard/executions">
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <h3 className="font-semibold text-lg mb-2">Executions</h3>
            <p className="text-gray-600">View workflow execution history</p>
          </div>
        </Link>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Getting Started</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-2">1. Create a Credential</h4>
            <p className="text-gray-600 text-sm">Set up your service credentials to connect to external services.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-2">2. Build a Workflow</h4>
            <p className="text-gray-600 text-sm">Create a new workflow by connecting nodes in the visual editor.</p>
          </div>
        </div>
      </div>
    </div>
  );
}