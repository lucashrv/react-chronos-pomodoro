import { createContext } from "react";
import { initialTaskState } from "./initialTaskState";
import type { TaskStateModel } from "../../models/TaskStateModel";
import type { TaskActionModel } from "./taskActions";

interface ITaskContextProps {
    state: TaskStateModel;
    dispatch: React.Dispatch<TaskActionModel>;
}

export const initialContextValue = {
    state: initialTaskState,
    dispatch: () => {},
};

export const TaskContext =
    createContext<ITaskContextProps>(initialContextValue);
