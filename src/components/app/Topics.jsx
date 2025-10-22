import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "../../api/client";

function Topics() {
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);
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

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <section>
      <div className="px-8 mb-5">
        <h2 className="text-3xl text-[#e2a9f1] font-bold mb-6">Trending topics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p className="text-gray-500">Loading topics...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : topics.length > 0 ? (
            topics.map((topic) => (
              <Link
                key={topic.id}
                className="p-6 bg-gray-600 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-gray-200">
                  {topic.topic_name}
                </h3>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No topics found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Topics;
