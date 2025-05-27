import styles from "./styles.module.css";

interface IContainerProps {
    children: React.ReactNode;
}

export function Container({ children }: IContainerProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
