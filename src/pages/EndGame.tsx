import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { ButtonToHome } from '../components/Buttons';
import { useAuth0 } from '@auth0/auth0-react';
import SocketContext from '../contexts/Socket/SocketContext';
import { useNavigate } from 'react-router-dom';

const TrophyGenerator = lazy(() => import('../components/TrophyGenerator'));

const EndGame: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { games } = useContext(SocketContext).SocketState;
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    if (games.length > 0) {
      // they won and were not the victim
      if (games[0].winnerId === user?.sub && games[0].hunted !== user?.sub) {
        setGameOverMessage(
          `Great work, ${user?.name}. Your skip tracing gained you a bounty.`
        );
        // user is a winner
        setWinner(true);
        // they won and were being hunted
      } else if (
        games[0].winnerId === user?.sub &&
        games[0].hunted === user?.sub
      ) {
        setGameOverMessage(
          `Why, ${user?.name}, you successfully evaded capture! Go put your feet up and crack open a cold one.`
        );
        // user is a winner
        setWinner(true);
        // lost and were being hunted
      } else if (
        games[0].winnerId !== user?.sub &&
        games[0].hunted === user?.sub
      ) {
        setGameOverMessage(
          `C'mon ${user?.name}, you seriously let these guys catch you?`
        );
        // lost and were a hunter
      } else if (
        games[0].winnerId !== user?.sub &&
        games[0].hunted !== user?.sub
      ) {
        setGameOverMessage(
          `${user?.name}, bounty hunters catch the bounty. Get back in there and try again!`
        );
      }
    }
  }, [games, user]);

  return (
    <div className='end-game-container'>
      <h1>GAME OVER</h1>
      <h3>{gameOverMessage}</h3>
      {winner ? (
        <div style={{ width: '400px', height: '400px' }}>
          <h3>You've Earned a Reward.</h3>
          <Suspense fallback={<div>Loading Trophy...</div>}>
            <TrophyGenerator />
          </Suspense>
        </div>
      ) : null}
      <ButtonToHome />
    </div>
  );
};

export default EndGame;
