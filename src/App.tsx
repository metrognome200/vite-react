import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Coins } from 'lucide-react';
import MainPage from './components/MainPage';
import TasksPage from './components/TasksPage';
import SpinnerGame from './components/SpinnerGame';
import { userDataManager } from './utils/userDataManager';

const App: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Simulating Telegram's initData
    const fakeInitData = {
      user: { username: 'CocoPlayer' }
    };
    const initUsername = fakeInitData.user.username;
    setUsername(initUsername);
    userDataManager.initializeUser(initUsername);
    const userData = userDataManager.getUserData();
    if (userData) {
      setBalance(userData.balance);
    }
  }, []);

  const updateBalance = (amount: number) => {
    userDataManager.updateUserBalance(amount);
    setBalance(prevBalance => prevBalance + amount);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-purple-900 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                  COCO Game
                </h1>
                <nav className="hidden md:flex space-x-4">
                  <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
                  <Link to="/tasks" className="hover:text-yellow-400 transition-colors">Tasks</Link>
                  <Link to="/spinner" className="hover:text-yellow-400 transition-colors">Spinner</Link>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-purple-800 px-4 py-2 rounded-full">
                  <Coins className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="font-bold">{balance}</span>
                </div>
                <div className="bg-purple-800 px-4 py-2 rounded-full">
                  <span className="font-medium">{username}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/tasks" element={<TasksPage updateBalance={updateBalance} />} />
            <Route path="/spinner" element={<SpinnerGame balance={balance} updateBalance={updateBalance} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
