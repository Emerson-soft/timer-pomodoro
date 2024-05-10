import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cycleReducer } from '../reducer/cycle/reducer'
import {
  completedCycleAction,
  createNewCycleAction,
  interrupctionCycleAction,
} from '../reducer/cycle/actions'
import { differenceInSeconds } from 'date-fns'

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
  const [stateCyle, dispatch] = useReducer(
    cycleReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (stateInitial) => {
      const storageCycle = localStorage.getItem('@timer:state-cycle-1.0.0')

      if (storageCycle) {
        return JSON.parse(storageCycle)
      }

      return stateInitial
    },
  )

  const { cycles, activeCycleId } = stateCyle
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

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

  useEffect(() => {
    const stateJson = JSON.stringify(stateCyle)
    localStorage.setItem('@timer:state-cycle-1.0.0', stateJson)
  }, [stateCyle])

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
