import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
    HistoryIcon,
    HouseIcon,
    MoonIcon,
    SettingsIcon,
    SunIcon,
} from "lucide-react";

type AvailableThemes = "dark" | "light";

export function Menu() {
    const [theme, setTheme] = useState<AvailableThemes>(() => {
        const storageTheme =
            (localStorage.getItem("theme") as AvailableThemes) || "dark";

        return storageTheme;
    });
    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />,
    };

    const toggleTheme = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        e.preventDefault();

        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <nav className={styles.menu}>
            <a
                className={styles.menuLink}
                href="#"
                aria-label="Ir para a home"
                title="Ir para a home">
                <HouseIcon />
            </a>

            <a
                className={styles.menuLink}
                href="#"
                aria-label="Ver histórico"
                title="Ver histórico">
                <HistoryIcon />
            </a>

            <a
                className={styles.menuLink}
                href="#"
                aria-label="Configurações"
                title="Configurações">
                <SettingsIcon />
            </a>

            <a
                className={styles.menuLink}
                href="#"
                aria-label="Mudar tema"
                title="Mudar tema"
                onClick={toggleTheme}>
                {nextThemeIcon[theme]}
            </a>
        </nav>
    );
}
