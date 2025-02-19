# Interactive Folder Structure 📂

## Project Overview

An advanced React.js application that provides an interactive, dynamic folder structure visualization with comprehensive CRUD (Create, Read, Update, Delete) operations and responsive design.

![Project Demo](https://img.shields.io/badge/Status-Active-brightgreen)
![React Version](https://img.shields.io/badge/React-18.2.0-blue)
![Bootstrap Version](https://img.shields.io/badge/Bootstrap-5.3.2-purple)

## 🌟 Features

### Core Functionality
- 📁 Dynamic folder and file representation
- 🔄 Expand/collapse folder interactions
- ➕ Create new files and folders
- ✏️ Rename existing files and folders
- 🗑️ Delete files and folders
- 📊 Hierarchical structure support

### UI/UX Enhancements
- 🎨 Responsive design (Mobile, Tablet, Desktop)
- 🌓 Light Mode/Dark mode support
- 🌈 Smooth hover and interaction effects
- 📱 Adaptive layout and styling

### Technical Highlights
- React Hooks (useState)
- Recursive rendering
- Flexible JSON tree parsing
- Bootstrap integration
- Custom CSS animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0.0+)
- npm (v6.0.0+)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/interactive-folder-structure.git
```

2. Navigate to project directory
```bash
cd interactive-folder-structure
```

3. Install dependencies
```bash
npm install
```

4. Start development server
```bash
npm start
```

## 📦 Dependencies

- React
- React Bootstrap
- React Icons
- Bootstrap

## 🔧 Project Structure
```
folder-structure/
│
├── public/
├── src/
│   ├── components/
│   │   └── FolderStructure.js
│   ├── utils/
│   │   └── folderUtils.js
│   ├── App.css
│   └── App.js
└── README.md
```

## 🌈 Supported JSON Structures

### Flat Array
```json
["file1.txt", "file2.txt"]
```

### Nested Object
```json
[
  {
    "name": "Documents",
    "children": ["Document1.jpg", "Document2.jpg"]
  },
  {
    "name": "Downloads",
    "children": [
      {
        "name": "Applications",
        "children": ["App1.exe", "App2.exe"]
      }
    ]
  }
]
```

## 🎨 Customization

Easily customize the folder structure by modifying the initial state in `FolderStructure.js`.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🌟 Acknowledgements

- [React.js](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

**Created By Pavan Kalyan D**
