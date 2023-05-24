import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import adminActions, {
  AdminActionAddProduct,
  addProduct,
  deleteProduct,
  getProducts,
} from '../actions/AdminActions';

export interface AdminState {
  products: AdminActionAddProduct[];
  loading: boolean;
}

const initialState: AdminState = {
  products: [],
  loading: false,
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: adminActions,
  extraReducers: builder => {
    builder.addCase(addProduct.pending, (state: AdminState) => {
      state.loading = true;
    });
    builder.addCase(
      addProduct.fulfilled,
      (state: AdminState, action: PayloadAction<AdminActionAddProduct>) => {
        state.loading = false;
        state.products.push(action.payload);
      },
    );
    builder.addCase(addProduct.rejected, (state: AdminState) => {
      state.loading = false;
    });
    builder.addCase(getProducts.pending, (state: AdminState) => {
      state.loading = true;
    });
    builder.addCase(
      getProducts.fulfilled,
      (state: AdminState, action: PayloadAction<AdminActionAddProduct[]>) => {
        state.loading = false;
        state.products = action.payload;
      },
    );
    builder.addCase(getProducts.rejected, (state: AdminState) => {
      state.loading = false;
    });
    builder.addCase(deleteProduct.pending, (state: AdminState) => {
      state.loading = true;
    });
    builder.addCase(
      deleteProduct.fulfilled,
      (state: AdminState, action: PayloadAction<string>) => {
        state.loading = false;
        state.products = state.products.filter(
          item => item.id !== action.payload,
        );
      },
    );
    builder.addCase(deleteProduct.rejected, (state: AdminState) => {
      state.loading = false;
    });
  },
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
