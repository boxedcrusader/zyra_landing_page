import React, { useState } from 'react'
import { apiClient } from '../../../api/client';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

function DeleteConfirmationModal({modalOpen, closeModal, selectedTopic, refreshTopics}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    if (!modalOpen || !selectedTopic) return null;

    const deleteTopic = async () => {
        setError("");
        setSuccess("");
        setLoading(true);

        try {
        await apiClient.delete(`/topics/${selectedTopic.id}`);
        setSuccess("Topic Deleted Succesfully!")
        refreshTopics()
        setTimeout(() => closeModal(), 1000);
        } catch (err) {
        console.error("Error Deleting topic:", err);
        setError("Failed to Delete topics");
        } finally {
        setLoading(false);
        }
    }
  return createPortal(
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Delete Topic</h2>
          <button
            onClick={closeModal}
            className="p-1 rounded-md hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 p-2 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
            {success}
          </div>
        )}

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">"{selectedTopic.topic_name}"</span>?
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={closeModal}
            className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={deleteTopic}
            className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default DeleteConfirmationModal