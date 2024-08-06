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
        clickOnShortUrl(state, action: PayloadAction<string>) {
            const currentUrl = state.ShortenedUrlList.find(
                (url) => url.shortUrl === action.payload
            );
            if (currentUrl) {
                currentUrl.clicks += 1;
            }
        },
    },
});

export const { addShortenedUrl, setShortenedUrlList, clickOnShortUrl } =
    ShortenedUrlList.actions;
export default ShortenedUrlList.reducer;
