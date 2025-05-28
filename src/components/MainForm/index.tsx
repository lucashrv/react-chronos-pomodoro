import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
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

    function handleInterruptTask() {
        setState((prev) => ({
            ...prev,
            activeTask: null,
            secondsRemaining: 0,
            formattedSecondsRemaining: "00:00",
            task: prev.task.map((task) => {
                if (prev.activeTask && prev.activeTask.id === task.id) {
                    return { ...task, interruptDate: Date.now() };
                }
                return task;
            }),
        }));
    }

    return (
        <form className={styles.form} onSubmit={handleCreateTask}>
            <div className={styles.formRow}>
                <Input
                    label="task"
                    placeholder="Digite algo"
                    ref={taskNameInput}
                    disabled={!!state.activeTask}
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
                {!state.activeTask && (
                    <Button
                        aria-label="Iniciar nova tarefa"
                        title="Iniciar nova tarefa"
                        type="submit"
                        icon={<PlayCircleIcon />}
                    />
                )}

                {!!state.activeTask && (
                    <Button
                        ria-label="Interromper tarefa"
                        title="Interromper tarefa"
                        type="button"
                        icon={<StopCircleIcon />}
                        color="red"
                        onClick={handleInterruptTask}
                    />
                )}
            </div>
        </form>
    );
}
