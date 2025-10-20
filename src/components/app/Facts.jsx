import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { apiClient } from "../../api/client";

function Facts() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFacts();
  }, []);

  const fetchFacts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/facts");
      setFacts(response);
    } catch (err) {
      setError(err.message || "Failed to fetch facts");
      console.error("Error fetching facts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (factId, voteType) => {
    try {
      await apiClient.post(`/facts/${factId}/vote`, { voteType });
      fetchFacts();
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  if (loading) {
    return (
      <section className="p-8">
        <h1 className="text-3xl font-bold mb-6">Facts</h1>
        <p className="text-gray-600">Loading facts...</p>
      </section>
    );
  }

  return (
    <section className="p-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Facts</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {facts.length === 0 ? (
          <p className="text-gray-600">No facts yet. Be the first to share!</p>
        ) : (
          facts.map((fact) => (
            <div
              key={fact.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {fact.topic} - {fact.subtopic}
                  </h3>
                  <p className="text-sm text-gray-500">
                    by {fact.user?.first_name || "Anonymous"}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(fact.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-4">{fact.content}</p>

              {/* Voting Section */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleVote(fact.id, "upvote")}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                >
                  <ThumbsUp size={18} />
                  <span>Upvote</span>
                </button>
                <button
                  onClick={() => handleVote(fact.id, "downvote")}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                >
                  <ThumbsDown size={18} />
                  <span>Downvote</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Facts;
