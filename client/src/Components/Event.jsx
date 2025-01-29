import React, { useEffect, useState } from "react";
import supabase from "../supabase.js";
import toast from "react-hot-toast";

const Event = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        location: "",
        created_by: "",
    });
    const [formError, setFormError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch events from Supabase
    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase.from("events").select("*").order("start_time");
            if (error) throw error;

            if (Array.isArray(data)) {
                setEvents(data);
            } else {
                setEvents([]);
            }
        } catch (error) {
            console.error("Error fetching events:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch events initially when the component mounts
    useEffect(() => {
        fetchEvents();
    }, []);

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission to add a new event
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.start_time || !formData.end_time || !formData.location) {
            setFormError("Please fill out all required fields.");
            return;
        }
        setFormError("");

        try {
            const formDataToInsert = {
                ...formData,
                created_by: formData.created_by || crypto.randomUUID(),
            };

            const { data, error } = await supabase.from("events").insert([formDataToInsert]);
            if (error) throw error;

            // Show success toast
            toast.success("Event added successfully!");

            // Refetch events to update the table
            fetchEvents();

            // Clear the form and close modal
            setFormData({
                title: "",
                description: "",
                start_time: "",
                end_time: "",
                location: "",
                created_by: "",
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding event:", error.message);
            toast.error("Error adding event. Please try again.");
        }
    };

    return (
        <div className="event-container">
            <h1 className="event-header">Event Management</h1>

            {/* Button to open Modal */}
            <button className="add-event-btn" onClick={() => setIsModalOpen(true)}>
                <span className="plus-icon">+</span> Add Event
            </button>

            {/* Events Table */}
            <h2 className="event-header">Upcoming Events</h2>
            {loading ? (
                <p>Loading events...</p>
            ) : events.length > 0 ? (
                <table className="event-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Location</th>
                            <th>Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.title}</td>
                                <td>{event.description}</td>
                                <td>{new Date(event.start_time).toLocaleString()}</td>
                                <td>{new Date(event.end_time).toLocaleString()}</td>
                                <td>{event.location}</td>
                                <td>{event.created_by || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No events found.</p>
            )}

            {/* Modal for Adding Event */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={() => setIsModalOpen(false)}>
                            &times;
                        </span>
                        <h2>Add a New Event</h2>
                        {formError && <p className="form-error">{formError}</p>}
                        <form onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Event Title *"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Event Description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                            <input
                                type="datetime-local"
                                name="start_time"
                                value={formData.start_time}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="datetime-local"
                                name="end_time"
                                value={formData.end_time}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location *"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="created_by"
                                placeholder="Created By (Optional)"
                                value={formData.created_by}
                                onChange={handleInputChange}
                            />
                            <button type="submit">Add Event</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Event;
