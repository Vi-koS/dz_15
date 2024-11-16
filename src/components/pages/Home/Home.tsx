import Header from "../../header/header";
import PostsList from "../../posts/Posts";
import s from "./style.module.css"

const Home = () => {
    return (
        <div className={s.container}>
            <Header />
            <PostsList />
        </div>
    );
}

export default Home;