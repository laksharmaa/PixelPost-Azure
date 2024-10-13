import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook
import preview from '../assets/preview.png';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const { getAccessTokenSilently } = useAuth0(); // Get the access token
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const token = await getAccessTokenSilently({
          audience: import.meta.env.VITE_AUTH0_AUDIENCE, // Access the audience from the .env file
          scope: "openid profile email" 
        }); // Get JWT token from Auth0

        const response = await fetch('https://pixelpost.onrender.com/api/v1/dalle', { // Ensure correct API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently({
          audience: import.meta.env.VITE_AUTH0_AUDIENCE, // Access the audience from the .env file
          scope: "openid profile email"
        }); // Get token
        console.log("Access Token:", token); // Log the token

        // Send the post request to store the user-generated post in the correct endpoint
        const response = await fetch('https://pixelpost.onrender.com/api/v1/user-post', { // Note the changed endpoint
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include token in the request
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();
        console.log("Response data:", data); // Log the response data

        if (response.ok) {
          navigate('/');
        } else {
          console.error("Error Response:", data);
          alert("Error sharing post: " + data.message);
        }
      } catch (err) {
        console.error("Error:", err); // Log any error that occurs
        alert("ERROR SHARING POST: " + err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className='max-w-7xl mx-auto bg-gray-900 text-white min-h-screen p-8 rounded-xl'>
      <div>
        <h1 className='font-extrabold text-white text-[32px]'>Create</h1>
        <p className='mt-2 text-[#d1d5db] text-[14px] max-w-[500px]'>
          Create imaginative and visually stunning images generated through AI and share them with the community.
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Lakshya Sharma"
            value={form.name}
            handleChange={handleChange}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg"
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe={true}
            handleSurpriseMe={handleSurpriseMe}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg"
          />

          <div className="relative bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ) : (
              <img
                src={preview}
                alt='preview'
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {generatingImg ? 'Generating Image...' : 'Generate Image'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#d1d5db] text-[14px]'>
            Once you have created the image you want, you can share it with others in the community
          </p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
