import {
  ADD_BOOKING_LIST_CHAIR,
  CLEAR_LIST_BOOKING_CHAIR,
} from "../constant/BookingConstant";

export let handleBookingChair = (chair) => {
  return {
    type: ADD_BOOKING_LIST_CHAIR,
    payload: chair,
  };
};

export let clearBookingChair = () => {
  return {
    type: CLEAR_LIST_BOOKING_CHAIR,
    payload: [],
  };
};
