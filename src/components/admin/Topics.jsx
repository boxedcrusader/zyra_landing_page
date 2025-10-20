import React from "react";
import { useState } from 'react';
import { X } from 'lucide-react';

function Topics() {
    const [modalOpen, setModalOpen] = useState(false)
    const [topic, setTopic] = useState(" ")

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    return (
        <>
            <section>
                <div>
                    <h2>Topics</h2>
                </div>
                <div>
                    <button
                    onClick={openModal}
                    >
                        Add Topic
                    </button>
                </div>

                {modalOpen && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <div>
                            <h2>Add a Topic</h2>
                            <button onClick={closeModal}>
                                <X size={24} />
                            </button>
                            <div>
                                <label>
                                    Topic Title
                                </label>
                                <input 
                                    type="text"
                                    placeholder="Enter Topic Title"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                                <div>
                                    <button onClick={closeModal}>
                                        Discard
                                    </button>
                                    <button onClick={closeModal}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
  );
}

export default Topics;
