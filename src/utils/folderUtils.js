// Utility functions for folder structure manipulation

export const createNode = (tree, path, name, isFolder = false) => {
  const pathParts = path.split('/').filter(Boolean);
  let current = tree;

  // Traverse to the parent directory
  for (const part of pathParts) {
    if (typeof current[part] !== 'object') {
      current[part] = {};
    }
    current = current[part];
  }

  // Create the new node
  if (isFolder) {
    current[name] = {};
  } else {
    if (Array.isArray(current)) {
      current.push(name);
    } else {
      current[name] = null;
    }
  }

  return { ...tree };
};

export const renameNode = (tree, oldPath, newName) => {
  const pathParts = oldPath.split('/').filter(Boolean);
  const nodeName = pathParts.pop();
  let current = tree;

  // Traverse to the parent directory
  for (const part of pathParts) {
    current = current[part];
  }

  // Handle renaming
  if (Array.isArray(current)) {
    const index = current.indexOf(nodeName);
    if (index !== -1) {
      current[index] = newName;
    }
  } else {
    // For objects (folders)
    if (current[nodeName] !== undefined) {
      current[newName] = current[nodeName];
      delete current[nodeName];
    }
  }

  return { ...tree };
};

export const deleteNode = (tree, path) => {
  const pathParts = path.split('/').filter(Boolean);
  const nodeName = pathParts.pop();
  let current = tree;

  // Traverse to the parent directory
  for (const part of pathParts) {
    current = current[part];
  }

  // Handle deletion
  if (Array.isArray(current)) {
    const index = current.indexOf(nodeName);
    if (index !== -1) {
      current.splice(index, 1);
    }
  } else {
    delete current[nodeName];
  }

  return { ...tree };
};

export const flattenTree = (tree, parentPath = '') => {
  const result = [];

  const traverse = (node, path) => {
    if (Array.isArray(node)) {
      node.forEach(item => {
        result.push({ 
          name: item, 
          path: `${path}/${item}`, 
          type: 'file' 
        });
      });
    } else if (typeof node === 'object' && node !== null) {
      result.push({ 
        name: path.split('/').pop() || 'Root', 
        path, 
        type: 'folder' 
      });

      Object.entries(node).forEach(([key, value]) => {
        traverse(value, `${path}/${key}`);
      });
    }
  };

  traverse(tree, parentPath);
  return result;
};
