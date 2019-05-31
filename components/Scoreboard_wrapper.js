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
    padding: 6px 10px 7px 3px;
`;

const TeamScore = style.div`
    font-family: "Flama-Basic",sans-serif;
    font-size: 24px;
    text-align: right;
    line-height: initial;
`;

const GameMVP = style.div`
    border-top: 1px solid #e6e8ea;
    text-align: center;
    background: #F3F4F5;
    font-size: 13px;
    font-family: "Flama-Basic",sans-serif;
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 5px;
`;

const gamesListing = data => {
    let context = [],
    visitorLogo,
    visitorName,
    homelogo,
    homeName,
    stats = [],
    statsLine;

    if (data.length) {
      data.map(game => {
        visitorLogo = Number(game.score[0]) > Number(game.score[1]) ? game.logo : game.losingTeam[0].logo;
        visitorName = Number(game.score[0]) > Number(game.score[1]) ? game.name : game.losingTeam[0].name;
        homelogo = Number(game.score[0]) < Number(game.score[1]) ? game.logo : game.losingTeam[0].logo;
        homeName = Number(game.score[0]) < Number(game.score[1]) ? game.name : game.losingTeam[0].name;
        stats[0] = Number(game.statsbp1[0]) > 14 ? Number(game.statsbp1[0]) + ' pts ' : undefined;
        stats[1] = Number(game.statsbp1[1]) > 4 ? Number(game.statsbp1[1]) + ' ast ' : undefined;
        stats[2] = Number(game.statsbp1[2]) > 4 ? Number(game.statsbp1[2]) + ' reb ' : undefined;
        stats[3] = Number(game.statsbp1[3]) > 2 ? Number(game.statsbp1[3]) + ' stl ' : undefined;
        stats[4] = Number(game.statsbp1[4]) > 2 ? Number(game.statsbp1[4]) + ' blk ' : undefined;
        stats[5] = Number(game.statsbp1[5]) > 9 ? Number(game.statsbp1[5]) + ' tov ' : undefined;
        stats[6] = Number(game.statsbp1[6]) > 19 ? Number(game.statsbp1[6]) + ' +- ' : undefined;
        stats[7] = Number(game.statsbp1[7]) > 59.9 ? Number(game.statsbp1[7]) + ' fgp ' : undefined;
 
        statsLine = game.BP1name[0].name + ': ' + stats.map(stat => {
            if (stat) {
                return stat
            }
        } ).join('');

        context.push (
        <Section key={game.id}>
            <Score_tile >
                <Score_tile_wrapper>
                    <Team>
                        <TeamLogo>
                            <img src={visitorLogo} height="34px" >
                            </img>
                        </TeamLogo>
                        <div>
                            {visitorName}
                        </div>
                        <TeamScore>
                            {game.score[0]}
                        </TeamScore>
                    </Team>
                    <Team>
                        <TeamLogo>
                            <img src={homelogo} height="34px" >
                            </img>
                        </TeamLogo>
                        <div>
                            {homeName}
                        </div>
                        <TeamScore>
                            {game.score[1]}
                        </TeamScore>
                    </Team>
                </Score_tile_wrapper> 
                <GameMVP>
                    {statsLine}
                </GameMVP>
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