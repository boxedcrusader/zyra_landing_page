import React from "react";
import { Link } from "react-router-dom";
import { Utensils, Car, Code, Heart, Trophy, BookOpen } from "lucide-react";

function Topics() {
  const topics = [
    { id: 1, name: "Food", icon: Utensils },
    { id: 2, name: "Transportation", icon: Car },
    { id: 3, name: "Technology", icon: Code },
    { id: 4, name: "Health", icon: Heart },
    { id: 5, name: "Sports", icon: Trophy },
    { id: 6, name: "Education", icon: BookOpen },
  ];

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-3xl font-bold mb-6">Topics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => {
            const IconComponent = topic.icon;
            return (
              <Link
                key={topic.id}
                to={`/topic/${topic.name.toLowerCase()}`}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="text-4xl mb-2">
                  <IconComponent size={48} className="text-gray-800" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {topic.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Topics;
