import './TopCarousel.styles.scss';

import StreetcodeMarker from '@images/footer/main-page.png';
import StreetcodeMarker2 from '@images/footer/main-page2.png';
import StreetcodeMarker3 from '@images/footer/main-page3.png';
import StreetcodeMarker4 from '@images/footer/main-page4.png';
import StreetcodeMarker5 from '@images/footer/main-page5.png';

import { observer } from 'mobx-react-lite';

import { Carousel } from 'antd';

const content = [
    {
        image: StreetcodeMarker,
    },
    {
        image: StreetcodeMarker2,
    },
    {
        image: StreetcodeMarker3,
    },
    {
        image: StreetcodeMarker4,
    },
    {
        image: StreetcodeMarker5,
    },
];
const TopCarouselBlock = () => (
    <Carousel className="top-carousel" autoplay autoplaySpeed={3000}>
        {content.map((item) => (
            <div key={item.image}>
                <img
                    src={item.image}
                    className="carousel-image"
                />
            </div>
        ))}
    </Carousel>
);

export default observer(TopCarouselBlock);
