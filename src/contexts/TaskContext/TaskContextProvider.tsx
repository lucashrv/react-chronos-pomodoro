import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/timeWorkerManager";
import { TaskActionsTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";

interface ITaskContextProviderProps {
    children: React.ReactNode;
}

export function TaskContextProvider({ children }: ITaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState);
    const playBeepRef = useRef<() => void | null>(null);

    const worker = TimerWorkerManager.getInstance();

    worker.onmessage((e) => {
        const countDownSeconds = e.data;

        if (countDownSeconds <= 0) {
            if (playBeepRef.current) {
                playBeepRef.current();
                playBeepRef.current = null;
            }
            dispatch({
                type: TaskActionsTypes.COMPLETE_TASK,
            });
            worker.terminate();
        } else {
            dispatch({
                type: TaskActionsTypes.COUNT_DOWN,
                payload: { secondsRemaining: countDownSeconds },
            });
        }
    });

    useEffect(() => {
        if (!state.activeTask) {
            worker.terminate();
        }

        worker.postMessage(state);
    }, [state, worker]);

    useEffect(() => {
        if (state.activeTask && playBeepRef.current === null) {
            playBeepRef.current = loadBeep();
        } else {
            playBeepRef.current = null;
        }
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}
