// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../../store';
// import { toggleFavorite } from '../slice/FavoritesSlice';
// import { Post } from '../slice/PostSlice';
// import s from "./style.module.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Иконка мусорки
// import { faPen } from '@fortawesome/free-solid-svg-icons'; // Иконка ручки

// interface PostCardProps {
//   post: Post;
// }

// const PostCard: React.FC<PostCardProps> = ({ post }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const isFavorite = useSelector((state: RootState) =>
//     state.favorites.favoriteIds.includes(post.id)
//   );

//   const [isExpanded, setIsExpanded] = useState(false);
//   const [showActions, setShowActions] = useState(false);
//   const [comments, setComments] = useState<{ text: string; isEditing: boolean }[]>([]);
//   const [commentInput, setCommentInput] = useState('');
//   const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(null);
//   const [editingCommentText, setEditingCommentText] = useState('');

//   const text = post.text || '';
//   const isTextLong = text.length > 170;

//   const toggleText = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const toggleActions = () => {
//     setShowActions(!showActions);
//   };

//   const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCommentInput(e.target.value);
//   };

//   const handleAddComment = () => {
//     if (commentInput.trim()) {
//       setComments(prev => [...prev, { text: commentInput, isEditing: false }]);
//       setCommentInput('');
//     }
//   };

//   const handleRemoveComment = (index: number) => {
//     setComments(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleEditComment = (index: number) => {
//     setEditingCommentIndex(index);
//     setEditingCommentText(comments[index].text);
//   };

//   const handleSaveEditComment = () => {
//     if (editingCommentIndex !== null) {
//       setComments(prev => {
//         const updatedComments = [...prev];
//         updatedComments[editingCommentIndex].text = editingCommentText;
//         updatedComments[editingCommentIndex].isEditing = false;
//         return updatedComments;
//       });
//       setEditingCommentIndex(null);
//       setEditingCommentText('');
//     }
//   };

//   return (
//     <div className={s.container}>
//       <h3>{post.header}</h3>
//       <p>
//         {isTextLong && !isExpanded ? text.slice(0, 170) + '...' : text}
//         {isTextLong && (
//           <button onClick={toggleText} className={s.readMore}>
//             {isExpanded ? 'Скрыть' : 'Читать дальше'}
//           </button>
//         )}
//       </p>
//       <img src={post.imgUrl} alt="post" />

//       {/* Кнопка с тремя точками */}
//       <button onClick={toggleActions} className={s.dotsButton}>
//         &#8230; {/* Символ трех точек */}
//       </button>

//       {/* Условное отображение кнопок "Добавить в избранное" и "Добавить комментарий" */}
//       {showActions && (
//         <div className={s.actionButtons}>
//           <button onClick={() => dispatch(toggleFavorite(post.id))} className={s.favoriteButton}>
//             <FontAwesomeIcon icon={isFavorite ? solidStar : regularStar} color={isFavorite ? 'gold' : 'gray'} />
//           </button>
//           <div>
//             <input
//               type="text"
//               value={commentInput}
//               onChange={handleCommentChange}
//               placeholder="Введите комментарий"
//             />
//             <button onClick={handleAddComment}>
//               Добавить комментарий
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Отображение списка комментариев */}
//       {comments.length > 0 && (
//         <div className={s.commentsList}>
//           <h4>Комментарии:</h4>
//           <ul>
//             {comments.map((comment, index) => (
//               <li key={index}>
//                 {editingCommentIndex === index ? (
//                   <>
//                     <input
//                       type="text"
//                       value={editingCommentText}
//                       onChange={(e) => setEditingCommentText(e.target.value)}
//                     />
//                     <button onClick={handleSaveEditComment}>Сохранить</button>
//                   </>
//                 ) : (
//                   <>
//                     <span>{comment.text}</span>
//                     <button onClick={() => handleEditComment(index)}>
//                       <FontAwesomeIcon icon={faPen} />
//                     </button>
//                     <button onClick={() => handleRemoveComment(index)}>
//                       <FontAwesomeIcon icon={faTrashAlt} />
//                     </button>
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { toggleFavorite } from '../slice/FavoritesSlice';
import { Post } from '../slice/PostSlice';
import s from "./style.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favoriteIds.includes(post.id)
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [comments, setComments] = useState<{ text: string; isEditing: boolean }[]>([]);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(post.id));
  };

  return (
    <div className={s.container}>
      <h3>{post.header}</h3>
      <p>
        {isExpanded ? post.text ?? '' : `${(post.text?.slice(0, 170) ?? '')}...`}
        {(post.text?.length || 0) > 170 && (
          <button onClick={toggleText} className={s.readMore}>
            {isExpanded ? 'Скрыть' : 'Читать дальше'}
          </button>
        )}
      </p>
      <img src={post.imgUrl} alt="post" />
      <button onClick={toggleActions} className={s.dotsButton}>...</button>

      {showActions && (
        <div className={s.actionButtons}>
          <button onClick={handleFavoriteToggle} className={s.favoriteButton}>
            <FontAwesomeIcon icon={isFavorite ? solidStar : regularStar} color={isFavorite ? 'gold' : 'gray'} />
          </button>
          <CommentForm setComments={setComments} />
        </div>
      )}
      <CommentList comments={comments} setComments={setComments} />

    </div>
  );
};

export default PostCard;