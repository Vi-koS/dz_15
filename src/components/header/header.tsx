import { NavLink } from "react-router-dom";
import s from "./style.module.css"

const Header = () => {
    return (
        <header className={s.header}>
            <nav className={s.nav}>
                    <NavLink to="/"
                    className={({ isActive }) => (isActive ? s.activePost : '')}>
                        Посты
                    </NavLink>
                    <NavLink
                     to="/favorites"
                     className={({ isActive }) => (isActive ? s.activeFavorite : '')}>
                        Избранное
                    </NavLink>
            </nav>
        </header>
    );
}

export default Header;