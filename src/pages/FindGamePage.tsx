import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
// import GameLobby from './GameLobby';
import axios from 'axios';

import SocketContext from '../contexts/Socket/SocketContext';
import { ButtonToHome } from '../components/Buttons';

// THIS IS CURRENTLY SHOWING ALL ACTIVE GAMES, EVEN IF YOU'RE HOSTING THE GAME IT STILL SHOWS

// type GameLobby = {
//   id: number;
//   gameLobbyName: string;
//   players: number;
// };

const FindGamePage: React.FC = () => {
  // const [gameLobbies, setGameLobbies] = useState<GameLobby[]>([]);
  // const gameLobbies = [
  //   { id: 1, gameLobbyName: "Alex's Game Lobby", players: 69 },
  //   { id: 2, gameLobbyName: "Alexander's Game Lobby", players: 323 },
  //   { id: 3, gameLobbyName: "Al's Game Lobby", players: 1929 },
  // ];
  // useEffect(() => {
  //   // Fetch the game lobbies from the server
  //   const fetchGameLobbies = async () => {
  //     try {
  //       const response = await axios.get<GameLobby[]>('/gameLobbies');
  //       setGameLobbies(response.data);
  //     } catch (error) {
  //       console.error('Error fetching game lobbies:', error);
  //     }
  //   };

  //   fetchGameLobbies();
  // }, []);

  // const handleFindGame = (gameId: number) => {
  //   // join game = go to game lobby view where it shows all the players
  //   // just logs a made up "gameId" for now.
  //   console.log(`Joining game with ID: ${gameId}`);
  // };


  // return (
  //   <div>
  //     <h1>Join Game</h1>
  //     {gameLobbies.length > 0 ? (
  //       <ul>
  //         {gameLobbies.map((gameLobby) => (
  //           <li key={gameLobby.id}>
  //             <h2>{gameLobby.gameLobbyName}</h2>
  //             <p>Players: {gameLobby.players}</p>
  //             <button onClick={() => handleFindGame(gameLobby.id)}>
  //               Join Game
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <p>No game lobbies available</p>
  //     )}
  //   </div>
  // );

  const { authId, games, names } = useContext(SocketContext).SocketState;
  const { JoinGame } = useContext(SocketContext);

  const navigate = useNavigate();

  const handleJoinGame = async (host: string) => {
    JoinGame(host);
    navigate('/lobby');
  };

  const hostName = names[authId];

  return (
    <div>
      {Object.keys(games).length > 0 ? (
        <>
          <strong>Available Games:</strong>
          <ul>
            {Object.keys(games).map((host) => {
              if (host === authId) {
                return null;
              }
              // return (
              //   <li key={host}>
              //     <a onClick={() => handleJoinGame(host)}>
              //       Game ID: {games[host].gameId}, Host: {host}, Users: {games[host].authIdList.join(', ')}
              //     </a>
              //   </li>
              // );
              return (
                <ol>
                  <li key={host}>
                    <a onClick={() => handleJoinGame(host)}>Host: {hostName}, Users in Game: {games[host].authIdList.length}</a>
                  </li>
                </ol>
              );
            })}
          </ul>
        </>
      ) : (
        <p>No game lobbies available</p>
      )}
      <ButtonToHome />
    </div>
  );
}

export default FindGamePage;
