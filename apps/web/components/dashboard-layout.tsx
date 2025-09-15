"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Determine active tab based on pathname
  const getActiveTab = () => {
    if (pathname?.includes("/dashboard/workflows") || 
        pathname?.includes("/dashboard/credentials") || 
        pathname?.includes("/dashboard/executions")) {
      return "personal";
    }
    return "overview";
  };
  
  // Determine active sub-tab based on pathname
  const getActiveSubTab = () => {
    if (pathname?.includes("/dashboard/workflows")) return "workflows";
    if (pathname?.includes("/dashboard/credentials")) return "credentials";
    if (pathname?.includes("/dashboard/executions")) return "execution";
    return "workflows";
  };

  const activeTab = getActiveTab();
  const activeSubTab = getActiveSubTab();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">n8n Clone</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Main tabs */}
          <div className="p-2">
            <Link href="/dashboard">
              <button
                className={`w-full text-left px-4 py-2 rounded mb-1 ${
                  activeTab === "overview"
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                Overview
              </button>
            </Link>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "personal"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                // We'll navigate to the default personal tab (workflows)
                if (activeTab !== "personal") {
                  window.location.href = "/dashboard/workflows";
                }
              }}
            >
              Personal
            </button>
          </div>

          {/* Personal sub-tabs */}
          {activeTab === "personal" && (
            <div className="px-2 mt-4">
              <div className="flex border-b border-gray-200">
                <Link href="/dashboard/workflows">
                  <button
                    className={`px-4 py-2 text-sm ${
                      activeSubTab === "workflows"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    Workflows
                  </button>
                </Link>
                <Link href="/dashboard/credentials">
                  <button
                    className={`px-4 py-2 text-sm ${
                      activeSubTab === "credentials"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    Credentials
                  </button>
                </Link>
                <Link href="/dashboard/executions">
                  <button
                    className={`px-4 py-2 text-sm ${
                      activeSubTab === "execution"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    Execution
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Projects section */}
          <div className="p-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-700">Projects</h2>
              <button className="text-blue-500 hover:text-blue-700 text-sm">
                + New
              </button>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                <div className="font-medium">Project 1</div>
                <div className="text-xs text-gray-500">3 workflows</div>
              </div>
              <div className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                <div className="font-medium">Project 2</div>
                <div className="text-xs text-gray-500">1 workflow</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            {activeTab === "overview" ? "Overview" : "Personal"}
            {activeTab === "personal" && ` / ${activeSubTab}`}
          </h1>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">+ Create Credential</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  Form Trigger
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Telegram
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Resend
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/workflow/new">
              <Button>+ Create Workflow</Button>
            </Link>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}