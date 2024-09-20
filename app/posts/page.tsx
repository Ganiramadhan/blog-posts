'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';

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

  const handleSubmit = () => {
    if (modalMode === 'add') {
      handleAddPost();
    } else {
      handleEditPost();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    const modal = document.getElementById('modal');
    if (modal && !modal.contains(e.target as Node)) {
      closeModal();
    }
  };

  return (
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
            <div key={post.id} className="border p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p>{post.content}</p>
              <div className="flex mt-4">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 flex items-center rounded-lg"
                  onClick={() => openEditModal(post)}
                >
                  <AiOutlineEdit className="mr-1" /> Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 flex items-center rounded-lg"
                  onClick={() => handleDeletePost(post.id)}
                >
                  <AiOutlineDelete className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
          onClick={handleClickOutside}
        >
          <div
            id="modal"
            className="bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl mb-4">
              {modalMode === 'add' ? 'Add Post' : 'Edit Post'}
            </h2>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Title"
              className="border p-2 mb-2 w-full rounded-lg"
            />
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Content"
              className="border p-2 mb-2 w-full rounded-lg"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                {modalMode === 'add' ? 'Add' : 'Update'}
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 ml-2 rounded-lg"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
