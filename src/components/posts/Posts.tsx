import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectPosts } from '../slice/PostSlice';
import { AppDispatch, RootState } from '../../store';
import PostCard from '../post/PostCard';
import s from "./style.module.css"

const PostsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectPosts);
  const loading = useSelector((state: RootState) => state.posts.loading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={s.container}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
