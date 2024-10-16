import './TeamComponent.styles.scss';

import { useEffect, useState } from 'react';

import TeamApi from '@/app/api/team/team.api';
import useWindowSize from '@/app/common/hooks/stateful/useWindowSize.hook';
import TeamMember from '@/models/team/team.model';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SlickSlider from '../../SlickSlider/SlickSlider.component';
import Heading from '../Heading/Heading.component';

import TeamItemSlider from './TeamItemSlider/TeamItemSlider.component';

const TeamComponent = () => {
    const [team, setTeam] = useState<TeamMember[]>([]);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await TeamApi.getAllMain();
                setTeam(response);
            } catch (error) {
            }
        };

        fetchTeamMembers();
    }, []);
    const props = {
        touchAction: 'pan-y',
        touchThreshold: 25,
        transform: 'translateZ(0)',
        arrows: false,
        centerMode: false,
        centerPadding: '-5px',
        dots: false,
        infinite: true,
        variableWidth: true,
        slidesToShow: 1,
        swipeOnClick: false,
    };

    const windowsize = useWindowSize();
    if (windowsize.width <= 1024 && windowsize.width >= 768) props.centerMode = true;
    if (windowsize.width <= 1024) props.dots = true;

    const handleClick = () => {
        window.location.assign('https://www.instagram.com/streetcodeua/');
    };
    return (
        (team.length > 0)
            ? (
                <div id="mainBlock" className="teamComponent">
                    <Heading blockName="Команда" buttonName="Вся команда" setActionOnClick={handleClick} />
                    <div className="mainContainer">
                        <div className="blockCenter">
                            <div className="mainContent">
                                <SlickSlider
                                    {...props}
                                >
                                    {team.map((member) => (
                                        <div key={member.id} className="slider-item">
                                            <TeamItemSlider team={member} />
                                        </div>
                                    ))}
                                </SlickSlider>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>
    );
};

export default TeamComponent;
