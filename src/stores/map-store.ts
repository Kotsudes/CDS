import { createStore } from 'zustand/vanilla'

export type CounterState = {
    count: number,
    pointStart: [number, number]
    pointEnd: [number, number]
}

export type CounterActions = {
    startCount: () => void
    incrementCount: () => void,
    setPointStart: (point: [number, number]) => void,
    setPointEnd: (point: [number, number]) => void
}

export type CounterStore = CounterState & CounterActions


export const defaultInitState: CounterState = {
    count: 2,
    pointStart: [2.11, 48.9],
    pointEnd: [2.5, 48.7]
}

export const createCounterStore = (
    initState: CounterState = defaultInitState,
) => {
    return createStore<CounterStore>()((set) => ({
        ...initState,
        startCount: () => set((state) => ({ count: state.count = 0 })),
        incrementCount: () => set((state) => ({ count: state.count + 1 })),
        setPointStart: (point: [number, number]) => set(() => ({ pointStart: point })),
        setPointEnd: (point: [number, number]) => set(() => ({ pointEnd: point }))
    }))
}