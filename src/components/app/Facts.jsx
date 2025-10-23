import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, PlusCircle } from "lucide-react";
import { apiClient } from "../../api/client";
import AddFactModal from "./AddFactModal";

function Facts() {
  const [facts, setFacts] = useState([]);
  const [voteCounts, setVoteCounts] = useState({});
  const [userVotes, setUserVotes] = useState({});
  const [openAddFactModal, setOpenAddFactModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFacts();
  }, []);

  const fetchFacts = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get("/fact/all-facts");
      setFacts(data);
      
      // Fetch votes for each fact
      await Promise.all(data.map(fact => fetchVotesForFact(fact.id)));
    } catch (err) {
      setError(err.message || "Failed to fetch facts");
      console.error("Error fetching facts:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVotesForFact = async (factId) => {
    try {
      const [voteCounts, userVote] = await Promise.all([
        apiClient.get(`/vote/fact/${factId}`),
        apiClient.get(`/vote/user-vote/${factId}`)
      ]);
      
      setVoteCounts(prev => ({ ...prev, [factId]: voteCounts }));
      setUserVotes(prev => ({ ...prev, [factId]: userVote?.voteType || null }));
    } catch (err) {
      console.error(`Error fetching votes for fact ${factId}:`, err);
    }
  };

  const handleVote = async (factId, voteType) => {
  try {
    const currentVote = userVotes[factId];
    const oldVotes = voteCounts[factId] || { upvotes: 0, downvotes: 0 };
    
    // Optimistic update - UI updates immediately
    if (currentVote === voteType) {
      // Remove vote
      setUserVotes(prev => ({ ...prev, [factId]: null }));
      setVoteCounts(prev => ({
        ...prev,
        [factId]: {
          upvotes: oldVotes.upvotes - (voteType === "UPVOTE" ? 1 : 0),
          downvotes: oldVotes.downvotes - (voteType === "DOWNVOTE" ? 1 : 0),
        }
      }));
      await apiClient.delete(`/vote/remove-vote/${factId}`);
    } else {
      // Add or change vote
      setUserVotes(prev => ({ ...prev, [factId]: voteType }));
      setVoteCounts(prev => ({
        ...prev,
        [factId]: {
          upvotes: oldVotes.upvotes + (voteType === "UPVOTE" ? 1 : 0) - (currentVote === "UPVOTE" ? 1 : 0),
          downvotes: oldVotes.downvotes + (voteType === "DOWNVOTE" ? 1 : 0) - (currentVote === "DOWNVOTE" ? 1 : 0),
        }
      }));
      await apiClient.post("/vote/add-vote", {
        fact_id: factId,
        voteType: voteType
      });
    }
  } catch (err) {
    setError(err.message || "Failed to vote");
    // Revert on error
    await fetchFacts();
  }
};

  const handleAddFactOpen = () => setOpenAddFactModal(true);
  const handleAddFactClose = () => setOpenAddFactModal(false);

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
          {facts.map((fact) => {
            const votes = voteCounts[fact.id] || { upvotes: 0, downvotes: 0 };
            const userVote = userVotes[fact.id];

            return (
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
                  <button
                    onClick={() => handleVote(fact.id, "UPVOTE")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      userVote === "UPVOTE"
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-green-500/10 text-green-400 border border-green-400/30 hover:bg-green-500/20"
                    }`}
                  >
                    <ThumbsUp size={18} />
                    <span className="font-semibold">{votes.upvotes}</span>
                  </button>
                  <button
                    onClick={() => handleVote(fact.id, "DOWNVOTE")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      userVote === "DOWNVOTE"
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-red-500/10 text-red-400 border border-red-400/30 hover:bg-red-500/20"
                    }`}
                  >
                    <ThumbsDown size={18} />
                    <span className="font-semibold">{votes.downvotes}</span>
                  </button>
                </div>
              </div>
            );
          })}
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