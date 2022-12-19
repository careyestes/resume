import { useState, useEffect } from "react";
import Head from 'next/head';
import styles from './layout.module.scss';
import Link from 'next/link';
import classNames from 'classnames';
import ThemeToggle from "./themeToggle";

export const siteTitle = '.ready';
export const siteMeta = '.reveal Accessibility News';

export default function Layout({ children, location }) {

  const [theme, setTheme] = useState("light")

  function toggleTheme() {
    if(theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }

    const ThemeToggle = () => {
      useEffect(() => {
        document.body.dataset.theme = theme;
        window.localStorage.setItem("theme", theme);
      }, [theme]);
    }

  }


  return (
    <div id="Container" className={classNames(styles.container, theme === "light" ? "light-theme" : "dark-theme")}>
      <Head>
        <link rel='icon' href='/favicon.png' />
        <meta name='og:title' content={siteMeta} />
      </Head>
      
      <header className={classNames(styles.header, { [ styles.single_post ] : location === 'post' })}>
        <nav>
          <Link href='/'>
            <a className={styles.logo}>
              <svg className={styles.logo} viewBox="0 0 50 50">
                <path className={styles.cyan} d="M38,32.5c-2.2,3.2-5.2,5.8-8.8,7.4l7.7,8.6l8.6-7.7L38,32.5z"/>
                <path className={styles.magenta} d="M12.4,32.6l-7.2,8.3l8.6,7.4l7.3-8.4C17.6,38.3,14.6,35.7,12.4,32.6z"/>
                <path className={styles.yellow} d="M15,16.6l0.2-0.6L4.6,11.8L0.4,22.5l10.6,4.1C11.5,22.9,12.9,19.4,15,16.6z"/>
                <path className={styles.orange} d="M25.2,12.9c2.1,0,4.2,0.3,6.2,0.9V1.5H19v12.2C21,13.2,23.1,12.9,25.2,12.9z"/>
                <path className={styles.green} d="M39.4,26.7L50,22.4l-4.2-10.6L35.1,16l0.1,0.2C37.5,19.2,39,22.8,39.4,26.7z"/>
              </svg>
              <h1 className="heading_small">{siteTitle}</h1>
            </a>
          </Link>
        </nav>
        <ThemeToggle />
      </header>
      
      <main className={classNames(styles.main, { 'single_post' : location === 'post' })}>
        {children}
      </main>

      <footer className={ styles.footer }>
        &copy; { new Date().getFullYear() } .ready Accessibility Blog
      </footer>

    </div>
  );
}