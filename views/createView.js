import axios from 'axios';
import React, { useState } from 'react';

const CreateView = ({ loggedInUsername, onSongAddition }) => {  // <-- Added the onSongAddition prop here
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost/index.php/song/create", {
                user: loggedInUsername,
                title: title,
                artist: artist,
                rating: rating
            });

            if (response.status === 201) {
                console.log("Song added successfully", response.data);
                alert("Successfully Added Song :".title);

                // After a successful addition, call the onSongAddition function
                // with the new song details
                onSongAddition({
                    user: loggedInUsername,
                    title: title,
                    artist: artist,
                    rating: rating
                });

            } else {
                console.error("Error adding song", response.data.error);
                alert("Error!");
            }
        } catch (error) {
            console.error("Error during request:", error);
            alert("Error!");
        }
    };

    return (
        <div className="add-song-container">
            <h3>Add Song</h3>
            <form onSubmit={handleSubmit}>
                <div className="add-song-entries">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="add-song-form-control" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="add-song-entries">
                    <label htmlFor="artist">Artist</label>
                    <input type="text" className="add-song-form-control" id="artist" value={artist} onChange={e => setArtist(e.target.value)} />
                </div>
                <div className="add-song-entries">
                    <label htmlFor="rating">Rating</label>
                    <input type="text" className="add-song-form-control" id="rating" value={rating} onChange={e => setRating(e.target.value)} />
                </div>
                <button type="submit" className="add-song-submit-button">Add Song</button>
            </form>
        </div>
    );

}

export default CreateView;