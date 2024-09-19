import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../components/Loader'; // Import loader
import Card from '../components/Card'; // Import card

const Profile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();  // Get JWT token
      console.log('Access Token:', token);  // Log the token for debugging

      const response = await fetch('http://localhost:8080/api/v1/user-post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Pass the token in the Authorization header
        },
      });

      if (response.ok) {
        const result = await response.json();
        setUserPosts(result.data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <section className='max-w-7xl mx-auto bg-gray-900 text-white min-h-screen p-8'>
      <h1 className='font-extrabold text-white text-[32px]'>My Profile</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
          {userPosts.length ? (
            userPosts.map((post) => <Card key={post._id} {...post} />)
          ) : (
            <h2 className='text-white'>No posts found.</h2>
          )}
        </div>
      )}
    </section>
  );
};

export default Profile;
