import { useContext, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import TransactionPopup from './components/transaction-popup/TransactionPopup';
import TransactionContext from './store/transaction-context';

function App() {


  const [isModalOpen, setIsModalOpen] = useState(true)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="app">
      <Header />
      <Main onClick = {openModal} />
      
      {
        isModalOpen && <TransactionPopup onClick = {closeModal} />
      }

    </div>
  );
}

export default App;
