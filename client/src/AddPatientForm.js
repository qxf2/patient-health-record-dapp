import React, { useState } from 'react';
const { Web3 } = require('web3');
const abi = require('./abis/HealthRecord.json');

//Function to load the Web3 instance and enable it if available
const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}

// Function to add a patient record to the blockchain
const addPatient = async (id, name, age) => {
  try {
    await loadWeb3()
    const web3 = window.web3
    const latest_abi = abi['abi']

    // Get the user's accounts from the Web3 instance    
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const networkId = await web3.eth.net.getId();
    const networkData = abi.networks[networkId];

    if (!networkData) {
      throw new Error("Contract not deployed on the current network");
    }

    const contractAddress = networkData.address;

    const contract = new web3.eth.Contract(latest_abi, contractAddress);
    const transactionObject = { from: account, to: contractAddress, data: contract.methods.addPatient(id, name, age).encodeABI(), };
    const transaction = await web3.eth.sendTransaction(transactionObject);
    console.log('Patient added successfully!');
    return transaction.transactionHash;
  } catch (error) {
    // Handle error and display error message or update UI as needed
    console.error('Failed to add patient:', error);
  }
}

// Function component for the Add Patient form
function AddPatientForm() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Entered");

    try {
      const txHash = await addPatient(id, name, age);
      console.log(txHash)
      setTransactionHash(txHash);
      // Clear form inputs
      setId('');
      setName('');
      setAge('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    // Clear form inputs and transaction hash
    setId('');
    setName('');
    setAge('');
    setTransactionHash('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Id:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>

      <button type="submit">Add Patient</button>
      <button type="button" onClick={handleClear}>Clear</button>
      <br />
      {transactionHash && (
        <div>
          <br />
          <span>Patient added successfully.<br />
            Transaction Hash: </span> {transactionHash}
        </div>
      )}
    </form>
  );
}

export default AddPatientForm;

