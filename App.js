import React, { useState } from 'react';
import './App.css';
import RegisterView from './views/registerView';
import LoginView from './views/loginView';
//import AddComponent from './AddComponent';
//import EditComponent from './EditComponent';
//import DeleteComponent from './DeleteComponent';
import ListView from './views/listView';

function App() {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  //const [songs, setSongs] = useState([]);

  /*const handleSongAddition = (newSong) => {
    //used chatGPT to find this concise way to add new song to the existing song list
    setSongs(prevSongs => [...prevSongs, newSong]);
  }; */

  /*
  const handleSongEdit = (editedSong) => {
    setSongs(prevSongs => prevSongs.map(song => song.id === editedSong.id ? editedSong : song));
  };

  const handleSongDelete = (deletedSongId) => {
    setSongs(prevSongs => prevSongs.filter(song => song.id !== deletedSongId));
  };
  */

  if (!isAuthenticated) {
    return (
      <div className="App">

        <LoginView onLogin={(user) => {
          setIsAuthenticated(true);
          setUsername(user.username);
        }} />

        <RegisterView
          onRegister={(user) => {
            setUsername(user.username);
            setIsAuthenticated(true);
          }}
          onError={setErrorMessage}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="App container">
      <header className="App-header mt-4">
        <h1>SongStars</h1>
        {username && <p>Welcome, {username}!</p>}
      </header>

      <ListView loggedInUsername={username} />

    </div>
  );
}


export default App;

