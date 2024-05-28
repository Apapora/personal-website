import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const apiUrl = 'https://s8biyvi4kh.execute-api.us-east-1.amazonaws.com';

  // Function to increment and retrieve visitor count
  const incrementAndGetVisitorCount = async () => {
    try {
      const response = await axios.post(`${apiUrl}/increment`, {
        page: 'homepage'
      });

      if (response.status === 200) {
        const data = response.data;
        console.log('Visitor count:', data.new_count);
        setCount(data.new_count);
      } else {
        console.error('Failed to increment and retrieve visitor count');
      }
    } catch (error) {
      console.error('Error incrementing and retrieving visitor count:', error);
    }
  };

  // Use useEffect to call incrementAndGetVisitorCount when the component mounts
  useEffect(() => {
    incrementAndGetVisitorCount();
  }, []);

  return (
    <div>
      <p>Visitor count: {count !== null ? count : 'Loading...'}</p>
    </div>
  );
};

export default VisitorCounter;
