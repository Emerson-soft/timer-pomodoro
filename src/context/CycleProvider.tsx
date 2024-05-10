import { ReactNode, createContext, useReducer, useState } from 'react'
import { Cycle, cycleReducer } from '../reducer/cycle/reducer'
import {
  completedCycleAction,
  createNewCycleAction,
  interrupctionCycleAction,
} from '../reducer/cycle/actions'

interface CreateCyle {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  cycles: Cycle[]
  amountSecondsPassed: number
  interrupctionCycle: () => void
  completeCycle: () => void
  createCycle: (data: CreateCyle) => void
  updateAmountSecondes: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface cyclePoviderProps {
  children: ReactNode
}

export function CycleProvider({ children }: cyclePoviderProps) {
  const [stateCyle, dispatch] = useReducer(cycleReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const { cycles, activeCycleId } = stateCyle
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  function interrupctionCycle() {
    dispatch(interrupctionCycleAction())
  }

  function completeCycle() {
    dispatch(completedCycleAction())
  }

  function createCycle(data: CreateCyle) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(createNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function updateAmountSecondes(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        cycles,
        interrupctionCycle,
        completeCycle,
        createCycle,
        amountSecondsPassed,
        updateAmountSecondes,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
