import React, { useState } from 'react';
import styled from "styled-components";



interface CommentFormProps {
    setComments: React.Dispatch<React.SetStateAction<{ text: string; isEditing: boolean }[]>>;
}

const CommentForm: React.FC<CommentFormProps> = ({ setComments }) => {
    const [commentInput, setCommentInput] = useState('');

    const handleAddComment = () => {
        if (commentInput.trim()) {
            setComments(prev => [...prev, { text: commentInput, isEditing: false }]);
            setCommentInput('');
        }
    };

    return (
        <CommentFormStyle>
            <input className="input"
                type="text"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Введите комментарий"
            />
            <button onClick={handleAddComment} className="btn">Добавить комментарий</button>
        </CommentFormStyle>
    );
};

const CommentFormStyle = styled.div`
    display: flex;
    justify-content: space-between;

    input {
      border: none; /* Убираем бордер у input */
      outline: none; /* Убираем фокусное обрамление */
      
      &::placeholder {
        color: #aaa; /* Цвет текста плейсхолдера */
        opacity: 1; /* Полная непрозрачность плейсхолдера */
      }
}

    .btn {
    border-radius: 6px;
    border: 1px solid gray;
    padding: 5px;

     &:hover {
        background-color: #f0f0f0; /* Цвет фона при наведении */
      }
    }
`


export default CommentForm;