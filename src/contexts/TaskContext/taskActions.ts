import type { TaskModel } from "../../models/TaskModel";

export enum TaskActionsTypes {
    START_TASK = "START_TASK",
    INTERRUPT_TASK = "INTERRUPT_TASK",
    RESET_STATE = "RESET_STATE",
    COUNT_DOWN = "COUNT_DOWN",
    COMPLETE_TASK = "COMPLETE_TASK",
}

export type TaskActionModel =
    | {
          type: TaskActionsTypes.START_TASK;
          payload: TaskModel;
      }
    | {
          type: TaskActionsTypes.COUNT_DOWN;
          payload: { secondsRemaining: number };
      }
    | {
          type: TaskActionsTypes.RESET_STATE;
      }
    | {
          type: TaskActionsTypes.INTERRUPT_TASK;
      }
    | {
          type: TaskActionsTypes.COMPLETE_TASK;
      };
