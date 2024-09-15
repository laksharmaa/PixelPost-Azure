import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook
import { Home, CreatePost } from './Pages';

function App() {
  const { loginWithPopup, logout, isAuthenticated } = useAuth0(); // Use Auth0 hook for login/logout
  const location = useLocation(); // Get current route

  return (
    <>
      <header className='w-full flex justify-between items-center bg-gray-900 text-white sm:px-8 px-4 py-4 border-b border-b-gray-700'>
        <Link to="/">
          <span className="w-28 object-contain font-bold">PixelPost</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Conditional rendering of "Create Post" button based on authentication and current route */}
          {isAuthenticated && location.pathname !== '/create-post' && (
            <Link to="/create-post" className="font-inter font-medium bg-blue-600 text-white px-4 py-2 rounded-md">
              Create Post
            </Link>
          )}

          {/* Conditional rendering of login/logout button based on authentication status */}
          {isAuthenticated ? (
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="font-inter font-medium bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={() => loginWithPopup({ connection: 'google-oauth2' })} // Trigger Google login
              className="font-inter font-medium bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Log In with Google
            </button>
          )}
        </div>
      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-gray-800 text-white min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
