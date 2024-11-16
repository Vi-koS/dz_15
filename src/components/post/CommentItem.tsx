import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

interface Comment {
  text: string;
  isEditing: boolean;
}

interface CommentItemProps {
  index: number;
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const CommentItem: React.FC<CommentItemProps> = ({ index, comment, setComments }) => {
  const [editingCommentText, setEditingCommentText] = useState(comment.text);

  const handleEdit = () => {
    setComments(prev => {
      const newComments = [...prev];
      newComments[index].text = editingCommentText;
      newComments[index].isEditing = false;
      return newComments;
    });
  };

  const handleDelete = () => {
    setComments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <CommentListItem>
      {comment.isEditing ? (
        <>
        <input
        type="text"
        value={editingCommentText}
        onChange={e => setEditingCommentText(e.target.value)}
        />
      <button onClick={handleEdit}>Сохранить</button>
      </>
    ) : (
    <>
        <span>{comment.text}</span>
        <button onClick={() => setComments(prev => {
        const newComments = [...prev];
        newComments[index].isEditing = true;
        return newComments;
      })}>
        <FontAwesomeIcon icon={faPen} /></button>
        <button onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrashAlt} /></button>
        </>
    )}
    </CommentListItem>
  );
};


const CommentListItem = styled.li`
    display: flex;
    justify-content: space-between;
    margin-left: 15px; / Марджин слева для li /
    max-width: 300px; / Максимальная ширина /
    word-wrap: break-word; / Перенос слов на новую строку /
    overflow-wrap: break-word; / Перенос слов на новую строку /
`;

export default CommentItem;