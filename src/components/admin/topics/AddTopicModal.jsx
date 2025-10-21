import React, { useState } from "react";
import { X } from "lucide-react";
import { apiClient } from "../../../api/client";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root") || document.body;

function AddTopicModal({ modalOpen, closeModal }) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCloseModal = () => {
    setTopic("");
    setError("");
    setSuccess("");
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await apiClient.post("/topics/add-topic", {
        topicName: topic,
      });

      if (response) {
        setSuccess("Topic added successfully!");
        setTopic("");
        setTimeout(() => handleCloseModal(), 1500);
      }
    } catch (err) {
      console.error("Topic error:", err);
      setError(err.message || "Failed to add topic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!modalOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Add a Topic
          </h2>
          <button
            onClick={handleCloseModal}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
              {success}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2 text-sm">
              Topic Title
            </label>
            <input
              type="text"
              placeholder="Enter Topic Title"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition text-sm"
              required
              disabled={loading}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm disabled:opacity-50"
              disabled={loading}
            >
              Discard
            </button>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition active:bg-gray-900 text-sm disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot,
  );
}

export default AddTopicModal;
