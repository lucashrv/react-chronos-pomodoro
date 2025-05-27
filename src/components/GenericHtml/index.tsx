import styles from "./styles.module.css";

interface IGenericHtmlProps {
    children: React.ReactNode;
}

export function GenericHtml({ children }: IGenericHtmlProps) {
    return <div className={styles.genericHtml}>{children}</div>;
}
