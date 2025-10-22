import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, PlusCircle } from "lucide-react";
import { apiClient } from "../../api/client";
import AddFactModal from "./AddFactModal";

function Facts() {
  const [facts, setFacts] = useState([]);
  const [openAddFactModal, setOpenAddFactModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch facts when component mounts
  useEffect(() => {
    fetchFacts();
  }, []);

  const fetchFacts = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get("/fact/all-facts");
      setFacts(data);
    } catch (err) {
      setError(err.message || "Failed to fetch facts");
      console.error("Error fetching facts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers for modal
  const handleAddFactOpen = () => setOpenAddFactModal(true);
  const handleAddFactClose = () => setOpenAddFactModal(false);

  // Re-fetch facts after adding new one
  const handleFactAdded = () => {
    handleAddFactClose();
    fetchFacts();
  };

  if (loading) {
    return (
      <section className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Facts</h1>
        <p className="text-gray-600">Loading facts...</p>
      </section>
    );
  }

  return (
  <section className="p-8">
    {/* Header */}
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
      <h1 className="text-3xl text-[#e2a9f1] font-bold">Facts</h1>
      <button
        onClick={handleAddFactOpen}
        className="flex items-center gap-2 px-4 py-2 bg-[#e2a9f1] text-black rounded-lg transition hover:bg-[#f3bafc]"
      >
        <PlusCircle size={18} />
        Add Fact
      </button>
    </div>

    {/* Error */}
    {error && (
      <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {error}
      </div>
    )}

    {/* Facts List */}
    {facts.length === 0 ? (
      <p className="text-gray-600 text-center">
        No facts yet. Be the first to share!
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {facts.map((fact) => (
          <div
            key={fact.id}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Content */}
            <p className="text-gray-200 text-lg leading-relaxed mb-5">
              {fact.content}
            </p>

            {/* Divider */}
            <hr className="border-gray-700 mb-4" />

            {/* Voting Section */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 border border-green-400/30 rounded-lg hover:bg-green-500/20 transition-all">
                <ThumbsUp size={18} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-400/30 rounded-lg hover:bg-red-500/20 transition-all">
                <ThumbsDown size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Add Fact Modal */}
    <AddFactModal
      modalOpen={openAddFactModal}
      closeModal={handleAddFactClose}
      onFactAdded={handleFactAdded}
    />
  </section>

  );
}

export default Facts;
