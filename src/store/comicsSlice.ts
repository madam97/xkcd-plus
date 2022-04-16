import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import IComic from '../interfaces/IComic';

const COMICS_URL = process.env.REACT_APP_API_BASE_URL + '/comics'

interface ComicsState {
  status: 'idle' | 'ok' | 'fail' | 'loading',
  error?: string,
  list: IComic[]
}

export const fetchComics = createAsyncThunk('comics/random', async (): Promise<IComic[] | string> => {
  try {
    const res = await axios.get<IComic[]>(COMICS_URL + '/random');

    return res.data;
  } catch (err) {
    return err instanceof Error ? err.message : 'unknown error';
  }
});

export const comicsSlice = createSlice({
  name: 'comics',

  initialState: {
    status: 'idle',
    list: [],
  } as ComicsState,

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchComics.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchComics.fulfilled, (state, action) => {
        state.status = 'ok';
        state.list = typeof action.payload !== 'string' ? action.payload : [];
      })
      .addCase(fetchComics.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.error.message;
      })
  }
});

export const selectComics = (state: RootState) => state.comics.list;
export const getComicsStatus = (state: RootState) => state.comics.status;
export const getComicsError = (state: RootState) => state.comics.status;

export default comicsSlice.reducer;