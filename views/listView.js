import React, { useEffect, useState } from "react";
import EditView from './editView';
import DeleteView from './deleteView';
import CreateView from './createView';

export default function ListView({ loggedInUsername }) {
  const [isLoading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [editSong, setEditSong] = useState(null);
  const [deleteID, setDeleteID] = useState(null);
  const [showAddComponent, setShowAddComponent] = useState(false);
  //for effect
  useEffect(() => {
    fetch("http://localhost/index.php/song/list")
      .then((response) => response.json())
      .then((json) => setSongs(json.songs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  const handleEditClick = (song) => {
    // Check if the logged-in user is the same as the user who added the song
    if (loggedInUsername === song.user) {
      // Set the song to be edited and show the EditComponent
      setEditSong(song);
    } else {
      console.log("You don't have permission to edit this song.");
    }
  };

  const handleSongAddition = (newSong) => {
    //used chatGPT to find this concise way to add new song to the existing song list
    setSongs(prevSongs => [...prevSongs, newSong]);
    setShowAddComponent(false);
  };

  const handleSongEdit = (editedSong) => {
    setSongs(prevSongs => prevSongs.map(song => song.id === editedSong.id ? editedSong : song));
    setEditSong(null);
  };


  const handleDeleteClick = (song) => {
    // Check if the logged-in user is the same as the user who added the song
    if (loggedInUsername === song.user) {
      // Set the song to be deleted and show the DeleteComponent
      setDeleteID(song.id);
    } else {
      console.log("You don't have permission to delete this song.");
    }
  };

  const handleSongDelete = (deletedSongId) => {
    setSongs(prevSongs => prevSongs.filter(song => song.id !== deletedSongId));
    setDeleteID(null);
  };

  return (
    <div style={{ padding: "24px" }} className="song-list-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 style={{ fontSize: "18px", color: "green", textAlign: "center" }}>
            Song List
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "green",
              textAlign: "center",
              paddingBottom: "10px",
            }}
          >
            Songs:
          </p>
          <button onClick={() => setShowAddComponent(true)}>Add Song</button>
          <ul className="song-list">
            {songs.map((item) => (
              <li key={item.id} className="song-item">
                <p>User: {item.user}</p>
                <p>Title: {item.title}</p>
                <p>Artist: {item.artist}</p>
                <p>Rating: {item.rating}</p>

                {loggedInUsername === item.user && (
                  <>
                    <div className="edit-delete-buttons">
                      <button onClick={() => handleEditClick(item)}>Edit</button>
                      <button onClick={() => handleDeleteClick(item)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

        </div>
      )}
      {editSong && <EditView song={editSong} onSongEdit={handleSongEdit} />}
      {deleteID && <DeleteView song={deleteID} onSongDelete={handleSongDelete} onClose={() => setDeleteID(null)} />}
      {showAddComponent && <CreateView loggedInUsername={loggedInUsername} onSongAddition={handleSongAddition} onClose={() => setShowAddComponent(false)} />}

    </div >
  );
}
