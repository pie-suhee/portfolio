import { FC } from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";

import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/navigation";
import '../App.scss';

const SwiperComponent: FC = () => {
    return (
        <Swiper
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/img_shop_fashion.jpeg" />
          <div className="slide_comment">
            <div className="text_con">
              <span className="bold">
                 물빠진 청바지!
              </span>
              <span>
                이제 막 도착한 패션 청바지를 구경해 보세요.
              </span>
            </div>
            <div className="btn_con">
              <Link to={`/fashion`}>
                <span>
                  바로가기
                </span>
                <svg className="feather feather-arrow-right" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <line x1="5" x2="19" y1="12" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
        <img src="/img_shop_digital.jpeg" />
        <div className="slide_comment">
            <div className="text_con">
              <span className="bold">
                신속한 업무처리!
              </span>
              <span>
                다양한 디지털 상품을 둘러보세요.
              </span>
            </div>
            <div className="btn_con">
              <Link to={`/digital`}>
                <span>
                  바로가기
                </span>
                <svg className="feather feather-arrow-right" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <line x1="5" x2="19" y1="12" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
        <img src="/img_shop_grocery.jpeg" />
        <div className="slide_comment">
            <div className="text_con">
              <span className="bold">
                 신선한 식품!
              </span>
              <span>
                농장 직배송으로 더욱 신선한 식료품을 만나보세요.
              </span>
            </div>
            <div className="btn_con">
              <Link to={`/grocery`}>
                <span>
                  바로가기
                </span>
                <svg className="feather feather-arrow-right" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <line x1="5" x2="19" y1="12" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    );
  };
  
  export default SwiperComponent;