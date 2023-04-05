import {createSlice} from '@reduxjs/toolkit';

import {light_theme, dark_theme} from '../../theme';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light',
    theme: light_theme,
  },
  reducers: {
    setTheme(state) {
      if (state.mode === 'light') {
        (state.mode = 'dark'), (state.theme = dark_theme);
      } else {
        (state.mode = 'light'), (state.theme = light_theme);
      }
    },
  },
});

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;
