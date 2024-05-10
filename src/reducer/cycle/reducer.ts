import { ActionsTypes } from './actions'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cycleReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionsTypes.CREATE_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.unshift(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionsTypes.INTERRUPCTION_CYCLE: {
      const interrupctionCurrentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (interrupctionCurrentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[interrupctionCurrentCycleIndex].interruptedDate =
          new Date()
        draft.activeCycleId = null
      })
    }
    case ActionsTypes.COMPLETED_CYCLE: {
      const CompletedCurrentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (CompletedCurrentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[CompletedCurrentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }
    default:
      return state
  }
}
