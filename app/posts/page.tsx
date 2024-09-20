'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AiOutlinePlus } from 'react-icons/ai';
import PostCard from './PostCard';
import PostModal from './PostModal';
import Navbar from '@components/Navbar';

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState({ title: '', content: '', id: 0 });

  useEffect(() => {
    fetchPosts();
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAddPost = async () => {
    if (!formData.title || !formData.content) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title: formData.title, content: formData.content }),
        headers: { 'Content-Type': 'application/json' },
      });
      const newPost = await res.json();
      setPosts((prev) => [...prev, newPost]);
      Swal.fire('Success', 'Post added successfully', 'success');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleEditPost = async () => {
    if (!formData.title || !formData.content) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'PUT',
        body: JSON.stringify({ id: formData.id, title: formData.title, content: formData.content }),
        headers: { 'Content-Type': 'application/json' },
      });
      const updatedPost = await res.json();
      setPosts((prev) => prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
      Swal.fire('Success', 'Post updated successfully', 'success');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch('/api/posts', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' },
          });
          setPosts((prev) => prev.filter((post) => post.id !== id));
          Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      }
    });
  };

  const openAddModal = () => {
    setFormData({ title: '', content: '', id: 0 });
    setModalMode('add');
    setIsModalOpen(true);
  };

  const openEditModal = (post: Post) => {
    setFormData({ title: post.title, content: post.content, id: post.id });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4 flex items-center rounded-lg"
        onClick={openAddModal}
      >
        <AiOutlinePlus className="mr-2" /> Add Post
      </button>

      <div className="grid grid-cols-4 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => openEditModal(post)}
              onDelete={() => handleDeletePost(post.id)}
            />
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>

      {isModalOpen && (
        <PostModal
          formData={formData}
          setFormData={setFormData}
          mode={modalMode}
          onSubmit={modalMode === 'add' ? handleAddPost : handleEditPost}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
    </>
  );
}
