import { useNavigate, useParams } from "react-router-dom";
import './StayShow.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setStayInfo } from "../../store/slices/stayShowSlice";

function StayShow() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stayInfo = useSelector(state => state.stayShow.stayInfo);
  const stayList = useSelector(state => state.stay.list);

  useEffect (() => {
    if (!stayInfo.contentid || stayInfo.contentid !== params.id) {
      const item = stayList.find(item => params.id === item.contentid);
      if (item) {
        dispatch(setStayInfo(item));
      }
    }
  }, [stayInfo, stayList, params.id, dispatch]);

  function redirectBack() {
    navigate(-1);
  }

  return (
    <>
    { stayInfo.title && 
    <div className="show-container-stay">
      <p className="show-title-stay">{stayInfo.title}</p>
      <img className="show-img-stay" src={stayInfo.firstimage} alt={`${stayInfo.title}사진`} />
      <p className="show-detail-stay">{`${stayInfo.addr1}, ${stayInfo.addr2}`}</p>
      {stayInfo.tel && <p className="show-tel-stay show-detail-stay">전화번호: <a href={`tel:${stayInfo.tel}`}>{stayInfo.tel}</a></p>}
      <button className="back-btn-stay" type="button" onClick={redirectBack}>되돌아가기</button>
    </div>
    }
    </>
  )
}

export default StayShow;
