import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Home, CreatePost } from './Pages';

function App() {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-gray-900 text-white sm:px-8 px-4 py-4 border-b border-b-gray-700'>
        <Link to="/">
          <span className="w-28 object-contain font-bold">PixelPost</span>
        </Link>

        <Link to="/create-post" className="font-inter font-medium bg-blue-600 text-white px-4 py-2 rounded-md">
          Create
        </Link>
      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-gray-800 text-white min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
