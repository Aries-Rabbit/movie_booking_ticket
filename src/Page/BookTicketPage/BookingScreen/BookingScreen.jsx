import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleBookingChair } from "../../../redux/Action/BookingAction";
import style from "./bookingScreen.module.css";

export default function BookingScreen({ chairList }) {
  let dispatch = useDispatch();
  let listBookingChair = useSelector(
    (state) => state.BookingReducer.listBookingChair
  );

  let renderGhe = () => {
    return chairList.slice(0, 100).map((chair) => {
      let chairStyle = "";
      let disable = false;
      // ghế thường
      if (chair.loaiGhe === "Thuong") {
        chairStyle = `${style.chair} ${style.normal}`;
      } else {
        chairStyle = `${style.chair} ${style.special}`;
      }
      // ghế đã đặt
      if (chair.daDat) {
        chairStyle = `${style.chair} ${style.ordered}`;
        disable = true;
      }
      // ghế đang đặt
      let index = listBookingChair.findIndex(
        (bookingChair) => bookingChair.maGhe === chair.maGhe
      );
      if (index !== -1) {
        chairStyle = `${style.chair} ${style.ordering}`;
      }
      return (
        <button
          disabled={disable}
          onClick={() => {
            dispatch(handleBookingChair(chair));
          }}
          key={chair.maGhe}
          className={`${chairStyle}`}
        >
          {chair.tenGhe}
        </button>
      );
    });
  };
  return (
    <div className="w-full xl:w-2/3">
      <div
        className={`w-4/5 mx-auto mt-3 ${style.screen} bg-black shadow-2xl flex items-end justify-center`}
      >
        <span className="text-white">Màn hình</span>
      </div>
      <div className="w-full  xl:w-4/5 mx-auto mt-4">{renderGhe()}</div>
      <hr className="my-4 mx-auto w-4/5 h-1 bg-gray-100 rounded border-0  dark:bg-gray-700" />
      <div className="w-4/5  xl:flex justify-center items-center mx-auto">
        <div className="w-full xl:w-1/2 mx-auto mb-4 flex justify-start items-center font-bold space-x-2">
          <div className="w-1/2">
            <button className={`${style.chair} ${style.normal}`}>x</button>
            <span>Ghế thường</span>
          </div>
          <div className="w-1/2">
            <button className={`${style.chair} ${style.special}`}>x</button>
            <span>Ghế Vip</span>
          </div>
        </div>
        <div className="w-full xl:w-1/2 mx-auto mb-4 flex justify-start items-center font-bold space-x-2">
          <div className="w-1/2">
            <button className={`${style.chair} ${style.ordering}`}>x</button>
            <span>Ghế đang đặt</span>
          </div>
          <div className="w-1/2">
            <button className={`${style.chair} ${style.ordered}`}>x</button>
            <span>Ghế đã đặt</span>
          </div>
        </div>
      </div>
    </div>
  );
}
