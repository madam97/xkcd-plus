import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import IComic from '../interfaces/IComic';

export const COMICS_URL = process.env.REACT_APP_API_BASE_URL + '/comics';

export const fetchComics = createAsyncThunk('comics/random', async (): Promise<IComic[]> => {
  const res = await axios.get<IComic[]>(COMICS_URL + '/random');

  return res.data;
});



interface ComicsState {
  status: 'idle' | 'ok' | 'fail' | 'loading',
  error?: string,
  list: IComic[]
}

export const comicsSlice = createSlice({
  name: 'comics',

  initialState: {
    status: 'idle',
    list: []
  } as ComicsState,

  reducers: {},

  extraReducers(builder) {
    builder
      // comics/random
      .addCase(fetchComics.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchComics.fulfilled, (state, action) => {
        state.status = 'ok';
        state.list = action.payload;
      })
      .addCase(fetchComics.rejected, (state, action) => {
        state.status = 'fail';
        state.error = 'comics/random error: ' + action.error.message;
      })
  }
});

export const selectComics = (state: RootState) => state.comics.list;
export const getComicsStatus = (state: RootState) => state.comics.status;
export const getComicsError = (state: RootState) => state.comics.error;

export default comicsSlice.reducer;