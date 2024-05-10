import { Cycle } from './reducer'

export enum ActionsTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPCTION_CYCLE = 'INTERRUPCTION_CYCLE',
  COMPLETED_CYCLE = 'COMPLETED_CYCLE',
}

export function createNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionsTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interrupctionCycleAction() {
  return {
    type: ActionsTypes.INTERRUPCTION_CYCLE,
  }
}

export function completedCycleAction() {
  return {
    type: ActionsTypes.COMPLETED_CYCLE,
  }
}
