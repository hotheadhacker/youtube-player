// Footer.js
export default function Footer() {
  return (
    <div className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Centered Platform Developed By Section */}
        <div className="text-center my-6">
          <p className="text-lg font-semibold">
            Platform Developed By Salman Qureshi! This is a beta version, and other courses will be updated soon!
          </p>
        </div>

        <div className="flex justify-between my-6"> {/* Use flexbox to align items */}
          <div className="w-1/2 pr-4"> {/* Features Section */}
            <h3 className="text-xl mt-4">Features:</h3>
            <ol className="list-decimal list-inside">
              <li>Distraction-Free YouTube Learning</li>
              <li>2x Page Optimization Speed</li>
              <li>Lite Version</li>
              <li>Focused Learning</li>
            </ol>
          </div>
          <div className="w-1/2 pl-4"> {/* Future Goals Section */}
            <h3 className="text-xl mt-4">Future Goals:</h3> {/* Ensure same text size */}
            <ol className="list-decimal list-inside">
              <li>User Base Personalization (Stateful) - Will need your cookies :)</li>
              <li>Dedicated Account for Each User</li>
              <li>Course Completion Tracking</li>
              <li>Categories ❤ (P.S: I am out of ideas; if you have one, inform me 😊)</li>
            </ol>
          </div>
        </div>

        <center className="mt-8">
          <p className="text-sm">Source Code ➜ 
            <a href="https://github.com/hotheadhacker/youtube-player" className="text-blue-400" target="_BLANK">
              hotheadhacker/youtube-player
            </a>
          </p>
        </center>

        <footer className="mt-4 py-4 bg-gray-800 text-center">
          <h3 className="text-lg">
            Designed by 😆 
            <a href="https://isalman.dev" className="text-blue-400"> Salman Qureshi</a>
          </h3>
          <h3 className="text-lg">
            Redesigned by 👾 
            <a href="https://hothead01th.vercel.app" className="text-blue-400"> Zaid Adil</a>
          </h3>

          <div className="mt-4 flex justify-center space-x-4">
            <a href="https://github.com/hotheadhacker" target="_BLANK" className="text-gray-400 hover:text-white">
              <i className="fab fa-github fa-2x"></i>
            </a>
            <a href="https://twitter.com/salmanually" target="_BLANK" className="text-blue-400 hover:text-white">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="https://instagram.com/salmanually" target="_BLANK" className="text-pink-600 hover:text-white">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="https://isalman.dev" target="_BLANK" className="text-yellow-500 hover:text-white">
              <i className="fas fa-mouse-pointer fa-2x"></i>
            </a>
            <a href="mailto:isalmanqureshi@gmail.com" target="_BLANK" className="text-gray-400 hover:text-white">
              <i className="fas fa-envelope fa-2x"></i>
            </a>
            <a href="https://blog.isalman.dev/?ref=2023-homepage" target="_BLANK" className="text-green-500 hover:text-white">
              <i className="fas fa-blog fa-2x"></i>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}