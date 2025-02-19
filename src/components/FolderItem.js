// FolderItems.js (src/components/FolderItems.js)
import React, { useState } from 'react';

const FolderItem = ({ name, isFolder, onRenameNode, onDeleteNode, onCreateNode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const onChange = (e) => {
        setNewName(e.target.value);
    };

    const handleRename = () => {
        if (!isEditing) {
            setIsEditing(true);
        } else {
            onRenameNode(name, newName);
            setIsEditing(false);
        }
    };

    const deleteItem = () => {
        onDeleteNode(name);
    };

    const handleCreateNode = () => {
        onCreateNode(name);
    };

    return (
        <div className="d-flex align-items-center justify-content-between mb-2 border rounded p-2 bg-light">
            <div className="flex-grow-1">
                {isEditing ? (
                    <input type="text" value={newName} onChange={onChange} className="form-control form-control-sm" />
                ) : (
                    name
                )}
            </div>

            <div>
                {isFolder && (
                    <button className="btn btn-sm btn-primary mr-1" onClick={handleCreateNode}>
                        <i className="fas fa-plus"></i>
                    </button>
                )}

                <button className="btn btn-sm btn-secondary mr-1" onClick={toggleEditing}>
                    <i className="fas fa-edit"></i>
                </button>

                <button className="btn btn-sm btn-danger" onClick={deleteItem}>
                    <i className="fas fa-trash"></i>
                </button>
            </div>

            <button onClick={handleRename} className="btn btn-sm btn-success ml-2">
                <i className="fas fa-check"></i>
            </button>
        </div>
    );
};

const FolderItems = ({ nodes, onRenameNode, onDeleteNode, onCreateNode }) => {
    return (
        <div className="folder-item-container">
            {nodes.map((node, index) => (
                <FolderItem
                    key={index}
                    name={node.name}
                    isFolder={node.type === 'folder'}
                    onRenameNode={onRenameNode}
                    onDeleteNode={onDeleteNode}
                    onCreateNode={onCreateNode}
                />
            ))}
        </div>
    );
};

export default FolderItems;