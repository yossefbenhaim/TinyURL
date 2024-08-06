import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlicesNames } from 'models/enums/slicesNames';
import { ShortenedUrl } from 'models/interfaces/urlShortcut';

interface ShortenedUrlList {
    ShortenedUrlList: ShortenedUrl[];
}

const initialState: ShortenedUrlList = {
    ShortenedUrlList: [],
};

const ShortenedUrlList = createSlice({
    name: SlicesNames.SHORTENED_URL_LIST,
    initialState,
    reducers: {
        setShortenedUrlList(state, action: PayloadAction<ShortenedUrl[]>) {
            state.ShortenedUrlList = action.payload;
        },
        addShortenedUrl(state, action: PayloadAction<ShortenedUrl>) {
            state.ShortenedUrlList.push(action.payload);
        },
    },
});

export const {
    addShortenedUrl: addUrlShortcut,
    setShortenedUrlList: setUrlShortcut,
} = ShortenedUrlList.actions;
export default ShortenedUrlList.reducer;
