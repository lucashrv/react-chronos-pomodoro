import styles from "./styles.module.css";

interface ButtonProps extends React.ComponentProps<"button"> {
    icon: React.ReactNode;
    color?: "green" | "red";
}

export function Button(props: ButtonProps) {
    const { icon, color = "green", ...rest } = props;

    return (
        <>
            <button className={`${styles.button} ${styles[color]}`} {...rest}>
                {icon}
            </button>
        </>
    );
}
