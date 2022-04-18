import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

/**
 * The hook to use instead of plain `useDispatch`
 * @category Custom hook
 * @function
 * @returns {AppDispatch}
 */
const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * The hook to use instead of plain `useSelector`
 * @category Custom hook
 * @function
 * @returns {react-redux.TypedUseSelectorHook<RootState>}
 */
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };