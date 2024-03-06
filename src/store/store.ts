import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { tasksSlice } from './task-slice'

const rootReducer = combineReducers({
  'tasks': tasksSlice.reducer,
})

export const store = configureStore({
  'reducer': rootReducer,
})

export type TypeRootState = ReturnType<typeof rootReducer>
