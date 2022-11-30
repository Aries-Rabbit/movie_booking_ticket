import {
  ADD_BOOKING_LIST_CHAIR,
  CLEAR_LIST_BOOKING_CHAIR,
} from "../constant/BookingConstant";

const initialState = {
  listBookingChair: [],
};

export const BookingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_BOOKING_LIST_CHAIR: {
      let cloneListBookingChair = [...state.listBookingChair];
      let index = cloneListBookingChair.findIndex(
        (chair) => chair.maGhe === payload.maGhe
      );
      if (index === -1) {
        cloneListBookingChair.push(payload);
      } else {
        cloneListBookingChair.splice(index, 1);
      }
      return { ...state, listBookingChair: cloneListBookingChair };
    }
    case CLEAR_LIST_BOOKING_CHAIR: {
      let cloneListBookingChair = [...state.listBookingChair];
      cloneListBookingChair = payload;
      return { ...state, listBookingChair: cloneListBookingChair };
    }
    default:
      return state;
  }
};
