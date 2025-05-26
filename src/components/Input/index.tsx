import styles from "./styles.module.css";

interface InputProps extends React.ComponentProps<"input"> {
    label: string;
    placeholder: string;
}

export function Input(props: InputProps) {
    const { label, type = "text", placeholder = "..." } = props;

    return (
        <>
            <label htmlFor={label}>{label}</label>

            <input
                className={styles.input}
                id={label}
                type={type}
                placeholder={placeholder}
            />
        </>
    );
}
