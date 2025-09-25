import { useNavigate, useParams } from "react-router-dom";
import './FestivalShow.css';
import { useDispatch, useSelector } from "react-redux";
import { dateFormatter } from "../../utils/dateFormatter.js";
import { useEffect } from "react";
import { setFestivalInfo } from "../../store/slices/festivalShowSlice";

function FestivalShow() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const festivalInfo = useSelector(state => state.festivalShow.festivalInfo)
  const festivalList = useSelector(state => state.festival.list);

  useEffect (() => {
    const item = festivalList.find(item => params.id === item.contentid)
    dispatch(setFestivalInfo(item));
  }, [])

  function redirectBack() {
    navigate(-1);
  }

  return (
    <>
    { festivalInfo.title && 
    <div className="show-container-festival">
      <p className="show-title-festival">{festivalInfo.title}</p>
      <img className="show-img-festival" src={festivalInfo.firstimage} alt={`${festivalInfo.title}사진`} />
      <p className="show-detail-festival">{dateFormatter.withHyphenYMD(festivalInfo.eventstartdate)} ~ {dateFormatter.withHyphenYMD(festivalInfo.eventenddate)}</p>
      <p className="show-detail-festival">{`${festivalInfo.addr1}, ${festivalInfo.addr2}`}</p>
      <button className="back-btn-festival" type="button" onClick={redirectBack}>되돌아가기</button>
    </div>
    }
    </>
  )
}

export default FestivalShow;