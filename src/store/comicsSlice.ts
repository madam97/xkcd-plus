import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import IComic from '../interfaces/IComic';

/** 
 * The full url to the /comics endpoint
 * @category Store - Comics
 * @const {string}
 */
const COMICS_URL = process.env.REACT_APP_API_BASE_URL + '/comics';

/**
 * Fetching the /comics/random endpoint and return the list of comics
 * @category Store - Comics
 * @function
 * @async
 * @returns {Promise<IComic[]>}
 */
const fetchComics = createAsyncThunk('comics/random', async (): Promise<IComic[]> => {
  const res = await axios.get<IComic[]>(COMICS_URL + '/random');

  return res.data;
});


/** 
 * ComicsState
 * @category Store - Comics
 */
interface ComicsState {
  /** The status of the last ran /comics endpoint fetch */
  status: 'idle' | 'ok' | 'fail' | 'loading',
  /** The error message of the last ran /comics endpoint fetch */
  error?: string,
  /** The result of the last ran /comics endpoint fetch*/
  list: IComic[]
}

const comicsSlice = createSlice({
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

/**
 * Returns the list of fetched comics
 * @category Store - Comics
 * @function
 * @param state 
 * @returns {IComic[]}
 */
const selectComics = (state: RootState) => state.comics.list;

/**
 * Returns the status of the last comics fetch
 * @category Store - Comics
 * @function
 * @param state 
 * @returns {string}
 */
const getComicsStatus = (state: RootState) => state.comics.status;

/**
 * Returns the error message of the last comics fetch
 * @category Store - Comics
 * @function
 * @param state 
 * @returns {string | undefined}
 */
const getComicsError = (state: RootState) => state.comics.error;

export { COMICS_URL, fetchComics, comicsSlice, selectComics, getComicsStatus, getComicsError };

export default comicsSlice.reducer;