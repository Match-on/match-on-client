import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styled from "@emotion/styled";

import LeftArrow from "../../public/componentSVG/Arrow/Left_Arrow.svg";
import RightArrow from "../../public/componentSVG/Arrow/Right_Arrow.svg";

const ArrowDiv = styled.div<{ possible: boolean }>`
  cursor: ${(props) => (props.possible ? "pointer" : "arrow")};
`;

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <ArrowDiv onClick={props.possible ? onClick : null} possible={props.possible}>
      <RightArrow fill={props.possible ? "#47d2d2" : "#aaaaaa"} />
    </ArrowDiv>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <ArrowDiv onClick={props.possible ? onClick : null} possible={props.possible}>
      <LeftArrow fill={props.possible ? "#47d2d2" : "#aaaaaa"} />
    </ArrowDiv>
  );
};

const CustomSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

export const SlideButton = ({ slideRef, select, setSelect, length }) => {
  return (
    <div style={{ display: "flex", margin: "0 0 0 0", right: "0" }}>
      <PrevArrow
        onClick={async () => {
          await setSelect(select === 0 ? select : select - 1);
          slideRef?.slickPrev();
        }}
        possible={select !== 0}
      />
      <NextArrow
        onClick={async () => {
          await setSelect(select === length - 1 ? select : select + 1);
          slideRef?.slickNext();
          console.log("selce", select);
        }}
        possible={select !== length - 1}
      />
    </div>
  );
};

const Carousel = (props) => {
  const settings = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    focusOnSelect: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CustomSlider>
        <Slider ref={props.setSlideRef} {...settings}>
          {props.children}
        </Slider>
      </CustomSlider>
    </div>
  );
};

export default Carousel;
