import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoutePath } from './enums/RoutePath';
import HomePage from './pages/HomePage';
import RoomCodePage from './pages/RoomCodePage';
import LobbyPage from './pages/LobbyPage';
import EditAppearancePage from './pages/EditAppearancePage';
import CountdownPage from './pages/CountdownPage';
import GameplayPage from './pages/GameplayPage';
import ResultsPage from './pages/ResultsPage';
import { GameContextProvider } from './providers/GameProvider';
import VotingPage from './pages/VotingPage';
import { PocketBaseProvider } from './providers/PocketbaseProvider';

function App() {

  return (
    <>

      <Router>
        <PocketBaseProvider>
          <GameContextProvider>
            <Routes>

              <Route path={RoutePath.HOME} element={<HomePage />} />
              <Route path={RoutePath.ROOM_CODE} element={<RoomCodePage />} />
              <Route path={RoutePath.LOBBY} element={<LobbyPage />} />
              <Route path={RoutePath.EDIT_APPEARANCE} element={<EditAppearancePage />} />
              <Route path={RoutePath.COUNTDOWN} element={<CountdownPage />} />
              <Route path={RoutePath.GAMEPLAY} element={<GameplayPage />} />
              <Route path={RoutePath.RESULTS} element={<ResultsPage />} />
              <Route path={RoutePath.VOTING} element={<VotingPage />} />

            </Routes>
          </GameContextProvider>
        </PocketBaseProvider>
      </Router>

    </>
  )
}

export default App
