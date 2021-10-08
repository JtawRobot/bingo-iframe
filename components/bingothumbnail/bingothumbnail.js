import React from 'react';
import styled from 'styled-components';
import useCountDown from '../../hooks/usecountdown';

const BingoBox = styled.div`
    position: relative;
    width: 15rem;
    height: 25.8rem;
    background: none;
    background-image: ${(props) => `url(${props.img})`};
    background-size: contain; 
    border:none;
    margin: 0 1.3em 0 1.3em;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all .3s ease-in-out;
    outline: none;
    padding: 0;
    image-rendering: -webkit-optimize-contrast;
`;

const BingoJackpot = styled.div`
    width: 11.25rem;
    margin-top: 10.1rem;
    font-size: 1.2rem;
    color: #fff233;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    justify-content: center;

`;

const BingoInfoDiv = styled.div`
    margin-top: 1.2rem;
    width: 13.5rem;
    height: 5rem;
    padding: 0vh 4.5px 0vh 4.5px;

`;

const BingoInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: white;
    font-size: 1rem;
    font-weight: 400;
    margin: 0vh 0vh 0vh 0vh;
    line-height: normal;
    white-space: nowrap;

`;

const PlayNowButton = styled.button`
    width: 13.3rem;
    height: 3rem;
    background: ${(props) => (props.prebuy ? '#f96f19' : '#203dff')};
    border:none;
    outline: none;
    color: white;
    border-radius:23px;
    font-size: 1.4rem;
    font-weight: 400;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 9px;
    transition: all .2s ease-in-out;


    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }

`;

const PlayButtonImg = styled.img`
    height: 1.5rem;
    width: 1.7rem;
    margin-right: 1.3vh;


`;

const ButtonsDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const calendaricon = '/assets/icons/calendar.png';

const BingoThumbnail = (props) => {
  const { bingoData, isMobile, itemref } = props;

  const time = useCountDown(bingoData.nextGameStarting, '/api/getrealtimebingorooms', itemref);

  const onBingoLaunch = () => {
    // if (!session) {
    //   showNotification({
    //     message: 'You need to login/join before you can play this game.',
    //   });
    //   return;
    // }

    const {
      language, launcherName, roomId, gameId,
    } = bingoData.launch.HTML5_FULL;

    // const {
    //   userId, jsessionid,
    // } = session;

    const y = window.top.outerHeight / 1.8 + window.top.screenY - (900 / 2);
    const x = window.top.outerWidth / 2 + window.top.screenX - (900 / 2);

    // window.open(`${CONFIG.PBBACTION}?GAMEID=${gameId}&LANGUAGE=${language}&USERID=${userId}&SESSIONID=${jsessionid}&LAUNCHER=${launcherName}&ROOMID=${roomId}`, isMobile ? null : '_blank', isMobile ? null : `location=yes,top=${y},left=${x},height=600,width=900,scrollbars=yes,status=yes`);
  };

  return (
    <BingoBox key={bingoData.roomId} img={bingoData.imageSrc}>
      <BingoJackpot>
        JACKPOT: &nbsp;
        { bingoData.progressiveJackpot > 0 ? `P${bingoData.progressiveJackpot}` : 'N/A' }
      </BingoJackpot>
      <BingoInfoDiv>
        <BingoInfo>
          <div>Tickets:</div>
          {parseInt(bingoData.cardCost, 10) > 0 ? ` P${bingoData.cardCost}` : 'Free' }
        </BingoInfo>
        <BingoInfo>
          <div>Prize:</div>
          { ` P${parseInt(bingoData.prize, 10).toFixed(0)}` }
        </BingoInfo>
        <BingoInfo>
          <div>Game:</div>
          { bingoData.gameName }
        </BingoInfo>
        <BingoInfo>
          <div>Starts in:</div>
          { time }
        </BingoInfo>
      </BingoInfoDiv>
      <ButtonsDiv>
        <PlayNowButton onClick={onBingoLaunch}>
          <PlayButtonImg src="/assets/icons/playicon.png" alt="playicon" />
          Play now!
        </PlayNowButton>
        {/* {
                bingoData.roomId === 24 ? (
                  <PlayNowButton onClick={onBingoLaunch(bingoData)} prebuy>
                    <PlayButtonImg src={calendaricon} alt="playicon" />
                    Pre-Buy
                  </PlayNowButton>
                ) : null
              } */}
      </ButtonsDiv>
    </BingoBox>
  );
};

export default BingoThumbnail;
