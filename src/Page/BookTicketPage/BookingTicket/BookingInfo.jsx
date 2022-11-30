import { message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clearBookingChair } from "../../../redux/Action/BookingAction";
import { movieSerVice } from "../../../Service/MovieService";
import style from "./bookingInfo.module.css";

export default function BookingInfo({ infoMovie }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let isLoading = useSelector((state) => {
    return state.LoadingReducer.isLoading;
  });
  console.log("infoMovie: ", infoMovie);
  let listBookingChair = useSelector(
    (state) => state.BookingReducer.listBookingChair
  );
  let userInfor = useSelector((state) => state.UserReducer.userInfor);
  let renderBookingList = () => {
    return listBookingChair?.map((chair) => {
      return (
        <span key={chair.maGhe} className="text-blue-800 text-xl">
          {chair.tenGhe}&nbsp;
        </span>
      );
    });
  };
  let handleBuyTicket = () => {
    let maLichChieu = infoMovie.maLichChieu;
    // console.log("maLichChieu: ", maLichChieu);
    let danhSachVe = listBookingChair.map((chair) => {
      // console.log(chair.maGhe);
      // console.log(chair.giaVe);
      return { maGhe: chair.maGhe, giaVe: chair.giaVe };
    });
    let dataBooking = {
      maLichChieu: maLichChieu,
      danhSachVe: danhSachVe,
    };

    let sendDataBooking = async (data) => {
      try {
        let res = await movieSerVice.postConfirmBookingChair(data);
        console.log("res: ", res);
      } catch (err) {
        console.log(err);
      }
    };
    sendDataBooking(dataBooking);
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Đặt vé thành công",
        showConfirmButton: false,
        timer: 2000,
      });
    }, 700);
  };

  return (
    <div className="w-full  xl:w-1/3">
      <div className="mt-3 flex items-center justify-center">
        <main className={`${style.ticket_system}`}>
          {isLoading ? (
            ""
          ) : (
            <div className={`${style.top}`}>
              <div className={`${style.printer}`}></div>
              <div className={`${style.receipts_wrapper}`}>
                <div className={`${style.receipts}`}>
                  <div className={`${style.receipt}`}>
                    <div className={`${style.route}`}>
                      <h2>Phim: {infoMovie.tenPhim}</h2>
                    </div>
                    <div className={`${style.details}`}>
                      <div className={`${style.item}`}>
                        <span>Ngày chiếu</span>
                        <h3>{infoMovie.ngayChieu}</h3>
                      </div>
                      <div className={`${style.item}`}>
                        <span>Giờ chiếu</span>
                        <h3>{infoMovie.gioChieu}</h3>
                      </div>

                      <div className={`${style.item}`}>
                        <span>Rạp</span>
                        <h3>{infoMovie.tenRap}</h3>
                      </div>
                      <div className={`${style.item}`}>
                        <span>Cụm rạp</span>
                        <h3>{infoMovie.tenCumRap}</h3>
                      </div>
                      <div className={`${style.item}`}>
                        <span>Địa chỉ rạp</span>
                        <h3>{infoMovie.diaChi}</h3>
                      </div>
                      <div className="w-full">
                        <span className="font-bold text-purple-700">
                          Ghế chọn
                        </span>
                        <article>{renderBookingList()}</article>
                      </div>
                    </div>
                  </div>
                  <div className={`${style.receipt} ${style.qrcode}`}>
                    <div className="flex justify-between items-center w-full divide-x">
                      <div className="w-1/2">
                        <h1 className="font-bold text-purple-700">
                          TênKH:{" "}
                          <span className="text-black">
                            {userInfor ? userInfor.hoTen : ""}
                          </span>
                        </h1>
                        <h1 className="font-bold text-purple-700">Tổng tiền</h1>
                        <p>
                          {listBookingChair
                            ?.reduce((tongTien, chair) => {
                              return (tongTien += chair.giaVe);
                            }, 0)
                            .toLocaleString()}
                          VND
                        </p>
                      </div>
                      <div className="w-1/2 flex justify-center">
                        {listBookingChair.length === 0 ? (
                          <button
                            className={`${style.button}`}
                            onClick={() => {
                              Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Bạn chưa chọn ghế !!!",
                                footer: "",
                              });
                            }}
                          >
                            Xác nhận
                          </button>
                        ) : (
                          <button
                            className={`${style.button}`}
                            onClick={() => {
                              handleBuyTicket();
                              dispatch(clearBookingChair());
                              navigate("/history");
                            }}
                          >
                            Xác nhận
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
