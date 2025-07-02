import type { TaskStateModel } from "../../models/TaskStateModel";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";
import { getNextCycle } from "../../utils/getNextCycle";
import { TaskActionsTypes, type TaskActionModel } from "./taskActions";

export function taskReducer(
    state: TaskStateModel,
    action: TaskActionModel,
): TaskStateModel {
    switch (action.type) {
        case TaskActionsTypes.START_TASK: {
            const newTask = action.payload;
            const nextCycle = getNextCycle(state.currentCycle);
            const secondsRemaining = newTask.duration * 60;

            return {
                ...state,
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining,
                formattedSecondsRemaining:
                    formatSecondsToMinutes(secondsRemaining),
                task: [...state.task, newTask],
            };
        }
        case TaskActionsTypes.INTERRUPT_TASK: {
            return {
                ...state,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: "00:00",
                task: state.task.map((task) => {
                    if (state.activeTask && state.activeTask.id === task.id) {
                        return { ...task, interruptDate: Date.now() };
                    }
                    return task;
                }),
            };
        }
        case TaskActionsTypes.COMPLETE_TASK: {
            return {
                ...state,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: "00:00",
                task: state.task.map((task) => {
                    if (state.activeTask && state.activeTask.id === task.id) {
                        return { ...task, completeDate: Date.now() };
                    }
                    return task;
                }),
            };
        }
        case TaskActionsTypes.RESET_STATE: {
            return state;
        }
        case TaskActionsTypes.COUNT_DOWN: {
            return {
                ...state,
                secondsRemaining: action.payload.secondsRemaining,
                formattedSecondsRemaining: formatSecondsToMinutes(
                    action.payload.secondsRemaining,
                ),
            };
        }
        default:
            break;
    }

    return state;
}
