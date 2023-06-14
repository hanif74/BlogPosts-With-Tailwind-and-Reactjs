import { useState, useEffect } from 'react';
import axios from 'axios';
import { BlogPost } from '../../types/types';

const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the index range of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogPosts.slice(indexOfFirstItem, indexOfLastItem);

 
  useEffect(() => {
    // Fetch the blog posts from an API or any data source
    const fetchBlogPosts = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setBlogPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  const handlePostClick = (postId: number) => {
    // Find the selected post based on the clicked row's ID
    const post = currentItems.find((post) => post.id === postId);
    setSelectedPost(post || null);
  };

   // Function to handle page navigation
   const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle reset
  const handleResetTable = () => {
    setSelectedPost(null);
    setCurrentPage(1);
  };

  return { blogPosts, itemsPerPage, currentPage, selectedPost, currentItems, handlePostClick, handlePageChange, handleResetTable };
};

export default useBlogPosts;