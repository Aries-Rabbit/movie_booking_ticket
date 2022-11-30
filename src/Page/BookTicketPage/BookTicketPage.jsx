import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieSerVice } from "../../Service/MovieService";
import BookingInfo from "./BookingTicket/BookingInfo";
import BookingScreen from "./BookingScreen/BookingScreen";
import style from "./BookingScreen/bookingScreen.module.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import HeaderPage from "../../components/Header/HeaderPage";

export default function BookTicketPage() {
  let navigate = useNavigate();
  let [chairList, setChairList] = useState([]);
  let [infoMovie, setInfoMovie] = useState({});
  let { id } = useParams();
  let userInfor = useSelector((state) => state.UserReducer.userInfor);

  let fetchApi = async ({ id }) => {
    let params = {
      MaLichChieu: id,
    };
    try {
      let res = await movieSerVice.getInfoBookingMovie(params);
      setChairList(res.data.content.danhSachGhe);
      setInfoMovie(res.data.content.thongTinPhim);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("userInfor", userInfor);
    if (!userInfor) {
      navigate("/");
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Vui lòng đăng nhập để được mua vé",
          showConfirmButton: false,
          timer: 2000,
        });
      }, 500);
    }
  }, [userInfor]);
  useEffect(() => {
    fetchApi({ id });
  }, []);
  return (
    <div className={`${style["background"]}`}>
      <HeaderPage />
      <div className="xl:flex items-center w-full">
        <BookingScreen chairList={chairList} />
        <BookingInfo infoMovie={infoMovie} />
      </div>
    </div>
  );
}
