import React, { useCallback, useEffect } from 'react';
import axios from 'axios';

const DeleteView = ({ song, onSongDelete, onClose }) => {
    const handleDelete = useCallback(async () => {
        try {
            const response = await axios.delete("http://localhost/index.php/song/delete", {
                data: { id: song }
            });

            if (response.status === 200) {
                console.log("Song deleted successfully", response.data);

                // Call the onSongDelete function to update the parent component
                onSongDelete(song);
            } else {
                console.error("Error deleting song", response.data.error);
            }
        } catch (error) {
            console.error("Error during request:", error);
        }

        // Close the delete component, whether successful or not
        onClose();
    }, [song, onSongDelete, onClose]);

    useEffect(() => {
        // Call the handleDelete function when the component mounts
        handleDelete();
    }, [handleDelete]);

    return (
        <div>
            {/* You might want to add a loading spinner or message here */}
            <p>Deleting...</p>
        </div>
    );
};

export default DeleteView;
