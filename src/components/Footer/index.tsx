import styles from "./styles.module.css";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <a href="">Entenda como funciona a técnica pomodoro</a>
            <a href="">Chronos Pomodoro &copy; {year}</a>
        </footer>
    );
}
