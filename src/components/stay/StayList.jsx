import { useDispatch, useSelector } from 'react-redux';
import './StayList.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { stayIndex } from '../../store/thunks/stayThunk.js';
import { setScrollEventFlg } from '../../store/slices/staySlice.js';
import { setStayInfo } from '../../store/slices/stayShowSlice.js';

function StayList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stayList = useSelector(state => state.stay.list);
  const scrollEventFlg = useSelector(state => state.stay.scrollEventFlg);

  useEffect(() => {
    window.addEventListener('scroll', addNextPage);

    if(stayList.length === 0){
      dispatch(stayIndex());
    }

    return () => {
      window.removeEventListener('scroll', addNextPage);
    }
  }, []);

  function addNextPage() {
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const nowHeight = Math.ceil(window.scrollY);
    const viewHeight = docHeight - winHeight;
    
    if(viewHeight === nowHeight && scrollEventFlg) {
      dispatch(setScrollEventFlg(false));
      dispatch(stayIndex());
    }
  }

  function redirectShow(item) {
    dispatch(setStayInfo(item));
    navigate(`/stay/${item.contentid}`);
  }

  return (
    <div className="container-stay">
      {
        stayList.length > 0 && stayList.map(item => {
          return (
            <div className="card-stay" onClick={() => {redirectShow(item)}} key={item.contentid + item.createdtime}>
              <div className="card-img-stay" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
              <p className="card-title-stay">{item.title}</p>
              <p className="card-addr-stay">{item.addr1}</p>
            </div>
          );
        })
      }
    </div>
  )
}

export default StayList;
