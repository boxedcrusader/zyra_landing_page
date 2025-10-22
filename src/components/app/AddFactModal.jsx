import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { apiClient } from "../../api/client";

function AddFactModal({ modalOpen, closeModal, onFactAdded }) {
  const [fact, setFact] = useState("");
  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getTopics = async () => {
    setError("");
    setLoading(true);

    try {
      const data = await apiClient.get("/topics/all-topics");
      setTopics(data);
    } catch (err) {
      console.error("Error loading topics:", err);
      setError("Failed to load topics");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFact = async (e) => {
    e.preventDefault();
    if (!fact.trim() || !topicId) {
      setError("Please enter a fact and select a topic.");
      return;
    }

    try {
      setLoading(true);
      await apiClient.post("/fact/add-fact", {
        content: fact,
        topic_id: topicId,
      });
      setFact("");
      setTopicId("");
      closeModal();

      if (onFactAdded) onFactAdded();
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || "Failed to add fact");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalOpen) getTopics();
  }, [modalOpen]);

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative animate-fadeIn cursor-default">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Fact</h2>

        <form onSubmit={handleAddFact} className="space-y-4">
          {/* Topic Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topic
            </label>
            <select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a topic</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.topic_name}
                </option>
              ))}
            </select>
          </div>

          {/* Fact Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fact
            </label>
            <textarea
              value={fact}
              onChange={(e) => setFact(e.target.value)}
              placeholder="Enter your fact..."
              className="w-full border border-gray-300 rounded-lg p-3 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Fact"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFactModal;
