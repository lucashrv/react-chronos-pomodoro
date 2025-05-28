import { createContext } from "react";
import { initialTaskState } from "./initialTaskState";
import type { TaskStateModel } from "../../models/TaskStateModel";

interface ITaskContextProps {
    state: TaskStateModel;
    setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
}

export const initialContextValue = {
    state: initialTaskState,
    setState: () => {},
};

export const TaskContext =
    createContext<ITaskContextProps>(initialContextValue);
