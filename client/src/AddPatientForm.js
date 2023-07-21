import React, { setState, useState, useEffect } from 'react';
const { Web3 } = require('web3');
const abi = require('./abis/HealthRecord.json');


const CONTRACT_ADDRESS = '0x4e6f04bc52807f750381B0f8816125ab96b344cC'

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

const addPatient = async (id, name, age) => {
  try {
    //var web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
    //const web3 = new Web3(RPC_URL);

    await loadWeb3()
    const web3 = window.web3
    const latest_abi = abi['abi']
    console.log("latest abi", latest_abi)

    // Get the user's accounts from the Web3 instance    
    const accounts = await web3.eth.getAccounts();

    const account = accounts[0];
    console.log("printing accounts", accounts)

    const networkId = await web3.eth.net.getId()
    const stringRepresentation = networkId.toString();
    const networkData = abi.networks[networkId]
    const contract = new web3.eth.Contract(latest_abi, networkData.address);
    console.log("printing contract", contract)
    const transactionObject = { from: account, to: CONTRACT_ADDRESS, data: contract.methods.addPatient(id, name, age).encodeABI(), };

    console.log("printing transaction object", transactionObject)

    const transaction = await web3.eth.sendTransaction(transactionObject);

    console.log("printing transaction", transaction)

    console.log('Patient added successfully!');
    return transaction.transactionHash;

  } catch (error) {
    // Handle error and display error message or update UI as needed
    console.error('Failed to add patient:', error);
  }
}

function AddPatientForm() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

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

