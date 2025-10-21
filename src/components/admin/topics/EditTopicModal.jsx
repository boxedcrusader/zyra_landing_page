import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { apiClient } from "../../../api/client";

function EditTopicModal({ modalOpen, closeModal, topicData, refreshTopics }) {
  const [topic, setTopic] = useState(topicData?.topic_name || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!modalOpen) return null;

  const modalRoot = document.getElementById("modal-root") || document.body;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiClient.patch(
        `/topics/${topicData.id}/edit-topic`,
        { topicName: topic },
      );

      setSuccess("Topic updated successfully!");
      setTopic(response.topic_name || topic);
      refreshTopics();
      setTimeout(() => closeModal(), 1000);
    } catch (err) {
      console.error("Error editing topic:", err);
      setError("Failed to update topic");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Edit Topic
          </h2>
          <button
            onClick={closeModal}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
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
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter Topic Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition text-sm"
              required
              disabled={loading}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm disabled:opacity-50"
              disabled={loading}
            >
              Cancel
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

export default EditTopicModal;
