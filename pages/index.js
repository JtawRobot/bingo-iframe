import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import useSWR from 'swr';
import axios from 'axios';
import BingoThumbnail from '../components/bingothumbnail/bingothumbnail';

export const mobile = '(min-width: 1px) and (max-width: 576px)';

const ScheduleDiv = styled.div`
    padding: 63px 0 63px 0;
    display: grid;
    grid-template-columns: ${(props) => (props.itemsLength < 4 ? `repeat(${props.itemsLength}, 0.01fr)` : 'repeat(4, 0.01fr)')} ;
    grid-column-gap: 3vw;
    background: #03002e;
    grid-row-gap: 25px;
    justify-content: center;
    justify-items: center;

    @media (min-width: 0px) and (max-width: 1100px) {
      grid-template-columns: ${(props) => (props.itemsLength < 2 ? `repeat(${props.itemsLength}, 0.1fr)` : 'repeat(2, 0.1fr)')} ;
      grid-column-gap: 1vw;
      grid-row-gap: 25px;
    }

    @media ${mobile} {
      grid-template-columns: ${(props) => (props.itemsLength < 2 ? `repeat(${props.itemsLength}, 0.4fr)` : 'repeat(2, 0.4fr)')} ;
      grid-column-gap: 0.5vw;
      padding: 8vw 0 5vw 0;
    }
    
`;

const bingoMenu = {
  23: '/assets/bingo/freeroom.png',
  24: '/assets/bingo/mainhall.png',
  25: '/assets/bingo/tournamenthall.png',
  26: '/assets/bingo/specialevents.png',
};

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Home() {
  const { data } = useSWR('/api/getrealtimebingorooms', fetcher);

  const bingoRooms = data ? data.bingoRooms : [];

  const newBingoRooms = bingoRooms.map((bingoRoom) => ({
    ...bingoRoom,
    imageSrc: bingoMenu[bingoRoom.roomId],
  }));

  return (
    <>
      <Head>
        <title>Parlay Bingo frame</title>
        <meta name="description" content="Bingo classic frame that will be attached on the websites." />
      </Head>
      <ScheduleDiv itemsLength={newBingoRooms.length}>
        { newBingoRooms.map((bingoData) => (
          <BingoThumbnail
            key={bingoData.roomId}
            bingoData={bingoData}
            // itemref={bingoSection}
            // isMobile={isMobile}
          />
        )) }
      </ScheduleDiv>
    </>
  );
}
