// App.js (index.js)
import React from 'react';
import FolderStructure from './components/FolderStructure.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS (optional but good practice)

const App = () => {
    return (
        <div className="App">
            <FolderStructure />
        </div>
    );
};

export default App;