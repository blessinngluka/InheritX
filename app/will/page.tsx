"use client";

import WitnessManagement from "./components/WitnessManagement";

export default function WillPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">My Will</h1>
      <WitnessManagement planId="test-plan-123" />
    </div>
  );
}