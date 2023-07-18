import React, { useContext, useEffect, useState } from 'react';
import SocketContext from '../contexts/Socket/SocketContext';
import { GameListItem } from '../components/GameLobby/GameListItem';
import styled from 'styled-components';
import { Header } from '../styles/Header';
import { Main } from '../styles/Main';

import PhoneLoader from '../components/Loaders/PhoneLoader';

const NoBountiesSign = styled.div`
  height: 157px;
  width: 232px;
  margin-top: 50px;
  margin-inline: auto;
  border-radius: 57px;
  border: none;
  color: white;
  padding: 22px;
  font-family: lobster;
  text-shadow: -2px -2px 0 #000, 2px -1px 0 #000, -2px 2px 0 #000, 1px 1px 0 #000;
  background-size: cover;
  background-position: center;
  box-shadow: 13px 23px 30px 2px #00000059;
  background-image: url("https://d3d9qwhf4u1hj.cloudfront.net/images/find-game-button.png");
  font-size: 2.7rem;
  text-align: center;
`

const FindGamePage: React.FC = () => {
  const { games, users } = useContext(SocketContext).SocketState;

  const [joining, setJoining] = useState(false);

  useEffect(() => {
  }, [users, games]);

  return (
    <>
      <Header page={'Contracts'} users={users} />
      <Main>
        {joining ? (
          <PhoneLoader />
        ) : (
          <>
            {games.length > 0 ? (
              games.map((game) => (
                <GameListItem key={game.gameId} game={game} setJoining={setJoining} />
              ))
            ) : (
              <NoBountiesSign>
                No Bounties Have Been Posted
              </NoBountiesSign>
            )}
          </>
        )}
      </Main>
    </>
  );
}

export default FindGamePage;
