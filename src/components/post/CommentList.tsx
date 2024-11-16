import React from 'react';
import CommentItem from './CommentItem';

interface Comment {
  text: string;
  isEditing: boolean;
}

interface CommentListProps {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const CommentList: React.FC<CommentListProps> = ({ comments, setComments }) => {
  return (
    <div>
      <h4>Комментарии:</h4>
      <ul>
        {comments.map((comment, index) => (
          <CommentItem key={index} index={index} comment={comment} setComments={setComments} />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;