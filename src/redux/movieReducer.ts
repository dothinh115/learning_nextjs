import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface MovieDetail {
  ma_phim: number;
  ten_phim: string;
  trailer: string;
  hinh_anh: string;
  mo_ta: string;
  ngay_khoi_chieu: Date;
  danh_gia: number;
  hot: boolean;
  dang_chieu: boolean;
  sap_chieu: boolean;
  nguoi_dang: NguoiDang;
}

export interface NguoiDang {
  tai_khoan: number;
  ho_ten: string;
  email: string;
  so_dt: string;
  loai_nguoi_dung: string;
}

interface movieDetailInterface {
  movieDetail: MovieDetail | null;
}

const initialState: movieDetailInterface = {
  movieDetail: null,
};

const movieReducer = createSlice({
  name: "movieReducer",
  initialState,
  reducers: {
    movieDetailAction: (
      state: movieDetailInterface,
      action: PayloadAction<MovieDetail | null>
    ) => {
      state.movieDetail = action.payload;
    },
  },
});

export const { movieDetailAction } = movieReducer.actions;

export const movieDetailSelector = (state: AppState) =>
  state.movieReducer.movieDetail;

export default movieReducer.reducer;
