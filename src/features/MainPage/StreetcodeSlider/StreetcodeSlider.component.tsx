import './StreetcodeSlider.styles.scss';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import StreetcodesApi from '@/app/api/streetcode/streetcodes.api';
import useWindowSize from '@/app/common/hooks/stateful/useWindowSize.hook';
import { StreetcodeMainPage } from '@/models/streetcode/streetcode-types.model';

import SlickSlider from '../../SlickSlider/SlickSlider.component';

import StreetcodeSliderItem from './StreetcodeSliderItem/StreetcodeSliderItem.component';

const shuffleArray = (array: any) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const StreetcodeSlider = () => {
    const [streetcode, setStreetcode] = useState<StreetcodeMainPage[]>([]);
    const shuffledStreetcode = shuffleArray(streetcode);

    useEffect(() => {
        const fetchStreetcodesMainPageAll = async () => {
            try {
                const response = await StreetcodesApi.getAllMainPage();
                setStreetcode(response);
            } catch (error) {
            }
        };
        fetchStreetcodesMainPageAll();
    }, []);

    const props = {
        touchAction: 'pan-y',
        touchThreshold: 25,
        transform: 'translateZ(0)',
        arrows: false,
        dots: false,
        infinite: true,
        variableWidth: true,
        slidesToShow: 1,
        swipeOnClick: false,
        centerMode: false,
        centerPadding: '-5px',
    };

    const windowsize = useWindowSize();
    if (windowsize.width <= 1024 && windowsize.width >= 768) props.centerMode = true;
    if (windowsize.width <= 1024) props.dots = true;

    if (shuffledStreetcode.length > 0) {
        return (
            <div>
                <div className="streetcodeMainPageWrapper">
                    <div id="streetcodeSliderContentBlock" className="streetcodeSliderComponent">
                        <div className="streetcodeSliderContainer">
                            <div className="blockCenter">
                                <div className="streetcodeSliderContent">
                                    <SlickSlider {...props}>
                                        {shuffledStreetcode.map((item) => (
                                            <div key={item.id} className="slider-item">
                                                <StreetcodeSliderItem streetcode={item} />
                                            </div>
                                        ))}
                                    </SlickSlider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default observer(StreetcodeSlider);
