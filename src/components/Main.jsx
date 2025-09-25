import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const navigate = useNavigate();

  return (
    <>
    <div className='main-container'>
      <img className='title-img-festivals' onClick={() => { navigate('/festivals') }} src='/base/festival_data.png' alt="페스티벌 정보 바로가기" />
      <img className='title-img-stay' onClick={() => { navigate('/stay') }} src='/base/stay_data.png' alt="숙소 정보 바로가기" />
    </div>
    </>
  )
}

export default Main;