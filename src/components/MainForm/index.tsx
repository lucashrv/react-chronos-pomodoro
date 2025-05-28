import { PlayCircleIcon } from "lucide-react";
import { Button } from "../Button";
import { Cycles } from "../Cycles";
import { Input } from "../Input";
import styles from "./styles.module.css";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "./../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function MainForm() {
    const taskNameInput = useRef<HTMLInputElement>(null);
    const { state, setState } = useTaskContext();

    //Cycles
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!taskNameInput.current) return;

        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            alert("Digite o nome da tarefa");
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        };

        const secondsRemaining = newTask.duration * 60;

        setState((prev) => ({
            ...prev,
            activeTask: newTask,
            currentCycle: nextCycle,
            secondsRemaining,
            formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
            task: [...prev.task, newTask],
            config: { ...prev.config },
        }));
    };

    return (
        <form className={styles.form} onSubmit={handleCreateTask}>
            <div className={styles.formRow}>
                <Input
                    label="task"
                    placeholder="Digite algo"
                    ref={taskNameInput}
                />
            </div>

            <div className={styles.formRow}>
                <p>Próximo intervalo é de 25min</p>
            </div>

            {state.currentCycle > 0 && (
                <div className={styles.formRow}>
                    <Cycles />
                </div>
            )}

            <div className={styles.formRow}>
                <Button icon={<PlayCircleIcon />} />
            </div>
        </form>
    );
}
