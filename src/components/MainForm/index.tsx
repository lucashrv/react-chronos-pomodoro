import { PlayCircleIcon } from "lucide-react";
import { Button } from "../Button";
import { Cycles } from "../Cycles";
import { Input } from "../Input";
import styles from "./styles.module.css";

export function MainForm() {
    return (
        <form className={styles.form}>
            <div className={styles.formRow}>
                <Input label="task" placeholder="Digite algo" />
            </div>

            <div className={styles.formRow}>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>

            <div className={styles.formRow}>
                <Cycles />
            </div>

            <div className={styles.formRow}>
                <Button icon={<PlayCircleIcon />} />
            </div>
        </form>
    );
}
