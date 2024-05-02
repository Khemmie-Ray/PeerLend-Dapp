import React from 'react'
import DAOPage from './DAOPage'
import ConnectedGovernance from './Dashboard/ConnectedGovernance'
import { useState, useEffect } from 'react'
import { useWeb3ModalProvider } from "@web3modal/ethers/react";

const Governance = () => {
  const { walletProvider } = useWeb3ModalProvider()
  const [isConnected, setIsConnected] = useState(false);
  
    useEffect(() => {
      if (walletProvider) {
        setIsConnected(true);
      }
    }, [walletProvider]);
  return (
    <div>{isConnected ? <ConnectedGovernance /> : <DAOPage /> }</div>
  )
}

export default Governance