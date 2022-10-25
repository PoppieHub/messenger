import React from "react";
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}></div>
        </header>
    );
}

export default Header;