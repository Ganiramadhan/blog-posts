import React from 'react';

interface PostModalProps {
  formData: { title: string; content: string; id: number };
  setFormData: React.Dispatch<
    React.SetStateAction<{ title: string; content: string; id: number }>
  >;
  mode: 'add' | 'edit';
  onSubmit: () => void;
  onClose: () => void;
}

const PostModal = ({ formData, setFormData, mode, onSubmit, onClose }: PostModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div
        id="modal"
        className="bg-white p-4 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl mb-4">{mode === 'add' ? 'Add Post' : 'Edit Post'}</h2>
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
            onClick={onSubmit}
          >
            {mode === 'add' ? 'Add' : 'Update'}
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 ml-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
