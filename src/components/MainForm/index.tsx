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
import { TaskActionsTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "./Tips";

export function MainForm() {
    const taskNameInput = useRef<HTMLInputElement>(null);
    const { state, dispatch } = useTaskContext();

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

        dispatch({ type: TaskActionsTypes.START_TASK, payload: newTask });
    };

    function handleInterruptTask() {
        dispatch({ type: TaskActionsTypes.INTERRUPT_TASK });
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
                <Tips />
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
