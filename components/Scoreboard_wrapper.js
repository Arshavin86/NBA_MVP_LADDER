import {useContext} from 'react';
import style from 'styled-components';
import ApiContext from './Context';

const Section = style.section`
    order: initial;
    max-width: 375px;
    margin: 0 auto;
`;

const Score_tile = style.div`
    cursor: pointer;
    margin: 10px auto;
    background: #fff;
    color: #11202B;
    font-family: "Flama-Medium",sans-serif;
    font-size: 14px;
    line-height: initial;
`;

const Score_tile_wrapper = style.div`
    padding: 6px 10px 7px 3px;
`;

const Team = style.div`
    display: flex;
    align-items: center;
    margin: 0;
    min-height: 34px;
`;
 
const TeamLogo = style.div`
    flex: 1 0 0;
    text-align: center;
`;

const gamesListing = data => {
    let context = [],
    visitorLogo,
    visitorName,
    homelogo,
    homeName;

    if (data.length) {
      data.map(game => {
        visitorLogo = game.score[0] > game.score[1] ? game.logo : game.losingTeam.logo;
        visitorName = game.score[0] > game.score[1] ? game.name : game.losingTeam.name;
        homelogo = game.score[0] < game.score[1] ? game.logo : game.losingTeam.logo;
        homeName = game.score[0] < game.score[1] ? game.name : game.losingTeam.name;
        context.push (
        <Section key={game.id}>
            <Score_tile >
                <Score_tile_wrapper>
                    <Team>
                        <TeamLogo>
                            <img src={visitorLogo} height="34px">
                            </img>
                        </TeamLogo>
                    <a>{game.score[0]} - {game.score[1]}</a>
                    </Team>
                    <Team>
                    <a>{game.score[0]} - {game.score[1]}</a>
                    </Team>
                    
                </Score_tile_wrapper>
                
            </Score_tile>
        </Section>
      )});
    } else {
      return 'No games were played on this day';
    } 
    // console.log('context', context);
    return context;
}

const Wrapper = props => {
    const [data] = useContext(ApiContext);

    return gamesListing(data);
}

export default Wrapper;