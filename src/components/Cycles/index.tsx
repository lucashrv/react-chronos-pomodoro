import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import styles from "./styles.module.css";
import { getNextCycleType } from "./../../utils/getNextCycleType";

export function Cycles() {
    const { state } = useTaskContext();

    const cycleStep = Array.from({ length: state.currentCycle });

    const cycleDescription = {
        workTime: "foco",
        shortBreakTime: "descanso curto",
        longBreakTime: "descanso longo",
    };

    return (
        <div className={styles.cycles}>
            <span>Ciclos:</span>

            <div className={styles.cycleDots}>
                {cycleStep.map((_, index) => {
                    const nextCycle = getNextCycle(index);
                    const nextCycleType = getNextCycleType(nextCycle);

                    return (
                        <span
                            key={`${nextCycleType}_${nextCycle}`}
                            aria-label={`Indicador de ciclo de ${cycleDescription[nextCycleType]}`}
                            title={`Indicador de ciclo de ${cycleDescription[nextCycleType]}`}
                            className={`${styles.cycleDot} ${styles[nextCycleType]}`}></span>
                    );
                })}
            </div>
        </div>
    );
}
