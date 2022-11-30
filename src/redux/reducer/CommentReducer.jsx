import { STATUS_LIKE, SUBMIT_COMMENT } from "../constant/CommentConstant";

const initialState = {
  dataComment: [
    {
      id: 1,
      name: "Trần Quang Sĩ",
      content: " Đúng là đồ đệ của ta, bài này 100 điểm  !!!",
      hinhAnh:
        "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/278855044_983320765653187_134320280336234612_n.jpg?stp=dst-jpg_p480x480&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=5wlsFPqY6CMAX-FBGk2&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfAIlsl9MqIugDnwHrV_zkqin8rvjuet6cMdEmIwsW6mZA&oe=638314C1",
      statusLike: false,
      numberLike: 69,
    },
    {
      id: 2,
      name: "Hoàng Lâm",
      content:
        "Cảm ơn thầy Sĩ vippro, chị Thy cute, anh Đức và anh Hiệp đẹp trai đã giúp đỡ và hỗ trợ chúng em trong suốt quá trình học",
      hinhAnh:
        "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/298525342_1808339819510593_3395264989019877620_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=VPr2f9IEPlYAX-8boC8&tn=a-4yN6nFzcF5Of59&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBGIg8tv3i7C6DrNPi1VlCdQG8agR8VIdDoRuOl8JbRgQ&oe=638383B4",
      statusLike: false,
      numberLike: 19,
    },
    // {
    //   id: 3,
    //   name: "Thuỳ Dung",
    //   content: "Yêu Anh Lâm",
    //   hinhAnh:
    //     "https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/314987843_645537153951214_2173013564738042413_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=-CrdKnBgPAgAX_Wo47r&_nc_ht=scontent.fsgn2-1.fna&oh=03_AdSWycWxkXtPL_xCNimQZnrWX6yAZrYtioX6UWEKrNhIPA&oe=63954316",
    //   statusLike: false,
    //   numberLike: 19,
    // },

    {
      id: 4,
      name: "Công Thành",
      content:
        "Cảm ơn trung tâm CyberSoft đã mở khoá học thật bổ ích và chi tiết để giúp chúng em có thể phát triền hơn",
      hinhAnh:
        "https://scontent.xx.fbcdn.net/v/t1.15752-9/313822729_675015654210631_5174684807558838974_n.png?stp=dst-png_p206x206&_nc_cat=110&ccb=1-7&_nc_sid=aee45a&_nc_ohc=4UP_TNmx4pEAX-XNEJH&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQ06ERLJ99KqkU1ERFjiPPtE-GEK4T6NchThXbf8C8PwA&oe=63955E08",
      statusLike: false,
      numberLike: 22,
    },
    {
      id: 5,
      name: "Tập thể lớp Front-End BC33E",
      content:
        "Đọc đến đây mọi người cũng biết khoảng thời gian khoá học này cũng sắp đến lúc kết thúc thúc rùi, trong con đường sắp tới mong mọi người gặp được sếp thật tốt, đồng nghiệp thật dễ thương, gặp task khó thì cứ inbox hỏi anh Sĩ với chị Thy và anh Đức nha. Chúc mọi người thành công !!! BC33E mãi đỉn <3",
      hinhAnh:
        "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/305582971_447145290781534_7259926296261216391_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bLzJhBcaa6IAX-091Xw&tn=a-4yN6nFzcF5Of59&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfBkNTukNYesuxsdGebw-hUV4d-XOknjTcjIsJ9ehq_Jzg&oe=6385CC40",
      statusLike: false,
      numberLike: 10000,
    },
  ],
};

export const CommentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STATUS_LIKE:
      {
        let cloneDataComment = [...state.dataComment];
        let index = cloneDataComment.findIndex(
          (dataComment) => dataComment.id == payload
        );
        if (index != -1) {
          cloneDataComment[index].statusLike =
            !cloneDataComment[index].statusLike;
        }
        if (cloneDataComment[index].statusLike) {
          cloneDataComment[index].numberLike++;
        } else {
          cloneDataComment[index].numberLike--;
        }
        return { ...state, dataComment: cloneDataComment };
      }
      break;
    case SUBMIT_COMMENT: {
      state.dataComment.unshift(payload);
      return { ...state };
    }
    default:
      return state;
  }
};
