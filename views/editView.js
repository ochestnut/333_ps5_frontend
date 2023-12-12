import axios from "axios";
import React, { useState } from 'react';

const EditView = ({ song, onSongEdit }) => {
    const { id, user, title: oldTitle, artist: oldArtist, rating: oldRating } = song;

    // State variables for the form inputs
    const [updatedTitle, setTitle] = useState(oldTitle);
    const [updatedArtist, setArtist] = useState(oldArtist);
    const [updatedRating, setRating] = useState(oldRating);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put("http://localhost/index.php/song/edit", {
                id: id,
                user: user,
                title: updatedTitle,
                artist: updatedArtist,
                rating: updatedRating
            });

            if (response.status === 200) {
                console.log("Song updated successfully", response.data);

                // After a successful update, call the onSongEdit function
                // with the edited song details
                onSongEdit({
                    id: id,
                    user: user,
                    title: updatedTitle,
                    artist: updatedArtist,
                    rating: updatedRating
                });
            } else {
                console.error("Error updating song", response.data.error);
            }
        } catch (error) {
            console.error("Error during request:", error);
        }
    };

    return (
        <div className="edit-song-container">
            <h3>Edit Song</h3>
            <form onSubmit={handleSubmit}>
                <div className="edit-song-entries">
                    <label htmlFor="updatedTitle">Title</label>
                    <input type="text" className="edit-song-form-control" id="updatedTitle" value={updatedTitle} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="edit-song-entries">
                    <label htmlFor="updatedArtist">Artist</label>
                    <input type="text" className="edit-song-form-control" id="updatedArtist" value={updatedArtist} onChange={e => setArtist(e.target.value)} />
                </div>
                <div className="edit-song-entries">
                    <label htmlFor="updatedRating">Rating</label>
                    <input type="text" className="edit-song-form-control" id="updatedRating" value={updatedRating} onChange={e => setRating(e.target.value)} />
                </div>
                <button type="submit" className="edit-song-submit-button">Update Song</button>
            </form>
        </div>
    );
}

export default EditView;
