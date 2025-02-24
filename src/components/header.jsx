// frontend/src/components/header.js

export default function Header({ toggleTheme }) {
  return (
    <div className="bg-gray-900 text-white py-8 flex justify-between items-center px-4">
      <div className="flex-grow">
        <h1 className="text-white text-3xl font-bold">
          &lt;YouTube Player /&gt;
         
        </h1>
      </div>
      <button 
        onClick={toggleTheme} 
        className="theme-toggle bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mx-4"
      >
        Toggle Theme
      </button>
    </div>
  );
};