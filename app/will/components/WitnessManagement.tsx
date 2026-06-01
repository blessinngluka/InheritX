"use client";

import { useState } from "react";

interface Witness {
  id: string;
  name: string;
  email: string;
  status: "pending" | "signed";
}

interface WitnessManagementProps {
  planId: string;
}

export default function WitnessManagement({ planId }: WitnessManagementProps) {
  const [witnesses, setWitnesses] = useState<Witness[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inviteWitness = async () => {
    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/witness/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, plan_id: planId }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setWitnesses((prev) => [...prev, data]);
      setSuccess(name + " invited successfully!");
      setName("");
      setEmail("");
    } catch {
      setError("Failed to invite witness.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Witness Management</h2>
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Invite a Witness</h3>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-500 mb-3">{success}</p>}
        <input
          className="w-full border rounded p-2 mb-3"
          placeholder="Witness Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border rounded p-2 mb-3"
          placeholder="Witness Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={inviteWitness}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Invitation"}
        </button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Witnesses ({witnesses.length})</h3>
        {witnesses.length === 0 ? (
          <p className="text-gray-400">No witnesses invited yet.</p>
        ) : (
          witnesses.map((w) => (
            <div key={w.id} className="border-b py-3 flex justify-between">
              <div>
                <p className="font-medium">{w.name}</p>
                <p className="text-sm text-gray-500">{w.email}</p>
              </div>
              <span className={w.status === "signed" ? "text-green-500 font-semibold" : "text-yellow-500 font-semibold"}>
                {w.status === "signed" ? "Signed" : "Pending"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}