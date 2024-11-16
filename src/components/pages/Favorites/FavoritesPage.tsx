import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../../post/PostCard';
import { selectPosts } from '../../slice/PostSlice';
import { selectFavorites } from '../../slice/FavoritesSlice';
import Header from '../../header/header';
import s from "./style.module.css"

const FavoritesPage: React.FC = () => {
  const favoriteIds = useSelector(selectFavorites);
  const posts = useSelector(selectPosts);

  const favoritePosts = posts.filter(post => favoriteIds.includes(post.id));

  return (
    <>
      <Header />
      <h2 className={s.h2}>Избранное</h2>
      <div className={s.container}>
        {favoritePosts.length > 0 ? (
          favoritePosts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <p className={s.p}>Нет избранных постов.</p>
        )}
      </div>

    </>
  );
};

export default FavoritesPage;
