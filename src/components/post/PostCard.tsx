
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