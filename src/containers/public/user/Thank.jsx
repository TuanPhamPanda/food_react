import React from 'react'
import { useNavigate } from 'react-router-dom'

const Thank = () => {
  const navigate = useNavigate();
  return (
    <div className="thank-container">
    <h1>
        <p>
            <span>C</span>
            <span>ả</span>
            <span>m</span>
        </p>
        <p>
            <span>ơ</span>
            <span>n</span>
        </p>
    </h1>

    <div className="thank-letter flex flex-col">
        <p>Cảm ơn bạn đã trao niềm tin cho chúng tôi!</p>
        <p>
            Chúng tôi vừa xác nhận bạn đã nhận được đơn đặt hàng và hy vọng bạn sẽ thích nó.
            Mọi
            mặt hàng được đội ngũ của chúng tôi làm thủ công, cẩn thận đến từng chi tiết, vì vậy chúng tôi luôn có thể cung cấp cho bạn những sản phẩm tốt nhất
            trải qua.
        </p>
    <button className='btn mt-12' onClick={()=>navigate('/menu')}>Tiếp tục mua hàng</button>
    </div>
</div>
  )
}

export default Thank
