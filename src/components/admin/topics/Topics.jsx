import React, { useState, useEffect } from "react";
import AddTopicModal from "./AddTopicModal";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { apiClient } from "../../../api/client";
import EditTopicModal from "./EditTopicModal";
import { X, Pencil } from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

function Topics() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(true)
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setSuccess] = useState("");

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleEditClick = (topic) => {
    setSelectedTopic(topic);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (topic) => {
    setSelectedTopic(topic);
    setDeleteModalOpen(true)
  }

  const getTopics = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const topicsData = await apiClient.get("/topics/all-topics");
      if (topicsData) {
        setTopics(topicsData);
      }
    } catch (err) {
      console.error("Error loading topics:", err);
      setError("Failed to load topics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Topics</h2>
            <button
              onClick={openModal}
              className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition text-sm"
            >
              Add Topic
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            {loading ? (
              <p className="text-gray-500">Loading topics...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : topics.length > 0 ? (
              <ul className="space-y-2">
                {topics.map((topic) => (
                  <li
                    key={topic.id}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-3 shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="font-medium text-gray-900">
                      {topic.topic_name}
                    </h3>
                    <div>
                      <button
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-black transition"
                      title="Edit Topic"
                      onClick={() => handleEditClick(topic)}
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600 hover:text-red-800 transition"
                        title="Delete Topic"
                        onClick={() => handleDeleteClick(topic)} 
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                No topics yet. Add your first topic!
              </p>
            )}
          </div>

          <AddTopicModal modalOpen={modalOpen} closeModal={closeModal} />
          <EditTopicModal
            modalOpen={editModalOpen}
            closeModal={() => setEditModalOpen(false)}
            topicData={selectedTopic}
            refreshTopics={getTopics}
          />
          <DeleteConfirmationModal
            modalOpen={deleteModalOpen}
            closeModal={() => setDeleteModalOpen(false)}
            selectedTopic={selectedTopic}
            refreshTopics={getTopics}
          />
        </main>
      </div>
    </div>
  );
}

export default Topics;
