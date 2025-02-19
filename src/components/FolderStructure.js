import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import { FaFolder, FaFolderOpen, FaFile, FaPlus, FaEdit, FaTrash, FaMoon, FaSun } from 'react-icons/fa';
import '../App.css';

// Utility function to transform JSON into a standardized structure
const transformStructure = (data) => {
  const processNode = (node) => {
    // If node is a string, treat as a file
    if (typeof node === 'string') {
      return { 
        type: 'file', 
        name: node 
      };
    }
    
    // If node is an object with name and children
    if (typeof node === 'object' && node !== null) {
      return {
        type: 'folder',
        name: node.name,
        expanded: false,
        children: node.children 
          ? node.children.map(processNode)
          : []
      };
    }
    
    return null;
  };

  return data.map(processNode);
};

const FolderStructure = () => {
  // Initial folder structure
  const [folderStructure, setFolderStructure] = useState(
    transformStructure([
      {
        name: "Documents",
        children: ["Document1.jpg", "Document2.jpg", "Document3.jpg"]
      },
      {
        name: "Desktop",
        children: ["Screenshot1.jpg", "videopal.mp4"]
      },
      {
        name: "Downloads",
        children: [
          {
            name: "Drivers",
            children: ["Printerdriver.dmg", "cameradriver.dmg"]
          },
          {
            name: "Applications",
            children: ["Webstorm.dmg", "Pycharm.dmg", "FileZila.dmg", "Mattermost.dmg"]
          },
          "chromedriver.dmg"
        ]
      }
    ])
  );

  // State for modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);
  const [newName, setNewName] = useState('');

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check system preference or localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Dark Mode Effect
  useEffect(() => {
    // Apply dark mode class to body
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Toggle folder expansion
  const toggleFolder = (path) => {
    const updateFolder = (nodes, pathParts) => {
      return nodes.map(node => {
        // If this is the target node
        if (node.name === pathParts[0]) {
          // If it's a folder and we've reached the end of the path
          if (node.type === 'folder' && pathParts.length === 1) {
            return { 
              ...node, 
              expanded: !node.expanded 
            };
          }
          
          // If it's a folder and we need to go deeper
          if (node.type === 'folder' && pathParts.length > 1) {
            return {
              ...node,
              children: updateFolder(node.children, pathParts.slice(1))
            };
          }
        }
        
        return node;
      });
    };

    setFolderStructure(prev => 
      updateFolder(prev, path.split('/').filter(Boolean))
    );
  };

  // Create new item
  const handleCreate = (parentPath, type) => {
    const newItemName = prompt(`Enter ${type} name:`);
    if (!newItemName) return;

    const createItem = (nodes, pathParts) => {
      return nodes.map(node => {
        // If this is the target parent node
        if (node.name === pathParts[0]) {
          // If it's a folder
          if (node.type === 'folder') {
            return {
              ...node,
              children: [
                ...node.children,
                { 
                  type: type, 
                  name: newItemName,
                  ...(type === 'folder' ? { expanded: false, children: [] } : {})
                }
              ]
            };
          }
        }
        
        return node;
      });
    };

    setFolderStructure(prev => 
      createItem(prev, parentPath.split('/').filter(Boolean))
    );
  };

  // Edit item name
  const handleEdit = (path) => {
    const editItem = (nodes, pathParts) => {
      return nodes.map(node => {
        // If this is the target node
        if (node.name === pathParts[0]) {
          return { 
            ...node, 
            name: newName 
          };
        }
        
        // Recursively search in children if it's a folder
        if (node.type === 'folder') {
          return {
            ...node,
            children: editItem(node.children, pathParts)
          };
        }
        
        return node;
      });
    };

    setFolderStructure(prev => 
      editItem(prev, path.split('/').filter(Boolean))
    );
    setShowEditModal(false);
  };

  // Delete item
  const handleDelete = (path) => {
    const deleteItem = (nodes, pathParts) => {
      return nodes.reduce((acc, node) => {
        // If this is the parent node
        if (node.type === 'folder' && node.name === pathParts[0]) {
          // Filter out the item to delete
          const updatedChildren = node.children.filter(
            child => child.name !== pathParts[1]
          );
          
          return [
            ...acc, 
            { ...node, children: updatedChildren }
          ];
        }
        
        // Recursively process folder children
        if (node.type === 'folder') {
          return [
            ...acc, 
            { 
              ...node, 
              children: deleteItem(node.children, pathParts) 
            }
          ];
        }
        
        // Keep other nodes as they are
        return [...acc, node];
      }, []);
    };

    setFolderStructure(prev => 
      deleteItem(prev, path.split('/').filter(Boolean))
    );
  };

  // Recursive render function
  const renderNode = (node, path = '', depth = 0) => {
    const fullPath = path ? `${path}/${node.name}` : node.name;

    return (
      <div 
        key={fullPath} 
        className={`folder-item folder-depth-${depth} ${node.expanded ? 'folder-expanded' : ''}`}
      >
        {/* Node Representation */}
        <div 
          className="d-flex align-items-center" 
          onClick={() => node.type === 'folder' && toggleFolder(fullPath)}
        >
          {/* Icon */}
          {node.type === 'folder' ? (
            node.expanded ? (
              <FaFolderOpen className="folder-icon" />
            ) : (
              <FaFolder className="folder-icon" />
            )
          ) : (
            <FaFile className="file-icon" />
          )}
          
          {/* Name */}
          <span className="flex-grow-1">{node.name}</span>
          
          {/* Action Buttons */}
          {node.type === 'folder' && (
            <div>
              <Button 
                variant="outline-primary" 
                size="sm" 
                className="btn-folder-action mr-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreate(fullPath, 'file');
                }}
              >
                <FaPlus /> File
              </Button>
              <Button 
                variant="outline-primary" 
                size="sm" 
                className="btn-folder-action"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreate(fullPath, 'folder');
                }}
              >
                <FaPlus /> Folder
              </Button>
            </div>
          )}
          
          {node.type !== 'folder' && (
            <div>
              <Button 
                variant="outline-secondary" 
                size="sm" 
                className="btn-folder-action mr-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentNode(node);
                  setNewName(node.name);
                  setShowEditModal(true);
                }}
              >
                <FaEdit />
              </Button>
              <Button 
                variant="outline-danger" 
                size="sm"
                className="btn-folder-action"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(path);
                }}
              >
                <FaTrash />
              </Button>
            </div>
          )}
        </div>
        
        {/* Recursive Child Rendering */}
        {node.type === 'folder' && node.expanded && node.children && (
          <div>
            {node.children.map(childNode => 
              renderNode(childNode, fullPath, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Container className={`mt-4 folder-structure-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Card className={isDarkMode ? 'bg-dark text-light' : ''}>
        <Card.Header 
          className={`${isDarkMode ? 'bg-secondary' : 'bg-primary'} text-white d-flex justify-content-between align-items-center`}
        >
          <h2 className="text-center mb-0 flex-grow-1">
            Interactive Folder Structure
          </h2>
          <Button 
            variant={isDarkMode ? 'light' : 'dark'} 
            onClick={toggleDarkMode}
            className="ms-2"
            size="sm"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </Button>
        </Card.Header>
        <Card.Body className={isDarkMode ? 'bg-dark text-light' : ''}>
          {folderStructure.map(node => renderNode(node))}
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal 
        show={showEditModal} 
        onHide={() => setShowEditModal(false)}
        data-bs-theme={isDarkMode ? 'dark' : 'light'}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control 
            type="text" 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant={isDarkMode ? 'secondary' : 'light'} 
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant={isDarkMode ? 'primary' : 'dark'} 
            onClick={() => handleEdit(currentNode.name)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FolderStructure;