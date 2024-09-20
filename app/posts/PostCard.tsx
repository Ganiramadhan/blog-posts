import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostCardProps {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

const PostCard = ({ post, onEdit, onDelete }: PostCardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p>{post.content}</p>
      <div className="flex mt-4">
        <button
          className="bg-yellow-500 text-white px-2 py-1 mr-2 flex items-center rounded-lg"
          onClick={onEdit}
        >
          <AiOutlineEdit className="mr-1" /> Edit
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 flex items-center rounded-lg"
          onClick={onDelete}
        >
          <AiOutlineDelete className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;
