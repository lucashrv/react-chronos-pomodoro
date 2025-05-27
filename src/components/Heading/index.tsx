import styles from "./styles.module.css";

interface IHeadingProps {
    children: React.ReactNode;
}

export function Heading({ children }: IHeadingProps) {
    return (
        <>
            <h1 className={styles.heading}>{children}</h1>
        </>
    );
}
