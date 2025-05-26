import { Container } from "./components/Container";
import { Logo } from "./components/Logo/index";

import "./styles/global.css";
import "./styles/theme.css";
import styles from "./App.module.css";
import { Menu } from "./components/Menu/index";
import { CountDown } from "./components/CountDown";
import { Input } from "./components/Input/index";
import { Cycles } from "./components/Cycles/index";
import { Button } from "./components/Button";
import { PlayCircleIcon } from "lucide-react";
import { Footer } from "./components/Footer";

export function App() {
    return (
        <>
            <Container>
                <Logo />
            </Container>

            <Container>
                <Menu />
            </Container>

            <Container>
                <CountDown />
            </Container>

            <Container>
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
            </Container>

            <Container>
                <Footer />
            </Container>
        </>
    );
}
