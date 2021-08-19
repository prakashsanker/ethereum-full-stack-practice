import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { EtherscanProvider } from "@ethersproject/providers";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

function App() {
  const [greeting, setGreetingLocally] = useState();
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();
  const [sendToAddress, setSendToAddress] = useState();
  const [amountToSend, setAmountToSend] = useState();

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getBalanceForAddress() {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      try {
        const data = await contract.getBalance();
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log("data :", data.toString());
        console.log("account: ", account[0]);
        // // now we have the account address and the balancer
        setUserAccount(account[0]);
        setAmount(data.toString());
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function transferTokens() {
    if (typeof window.ethereum !== undefined) {
      // I haev a smart contract that is maintaining the balance of the tokens in the contract
      // so if this person sendsTokens, to another address, then in Metamask, I connect to another account and get the balance
      await requestAccount();
      // now signed into metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(sendToAddress, amountToSend);
    }
  }
  async function fetchGreeting() {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      console.log("Contract");
      console.log(contract);
      try {
        const data = await contract.greet();
        console.log("greeting: ");
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function setGreeting() {
    if (greeting) {
      // we want to set the greeting
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    }
  }
  return (
    <div className="App">
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <input
        type="text"
        onChange={(e) => setGreetingLocally(e.target.value)}
      ></input>
      <button onClick={setGreeting}> Set Greeting</button>
      <div>
        <div>
          <div>
            User Account: <div>{userAccount}</div>
          </div>
          <div>
            Amount: <div>{amount} </div>
          </div>
          <button onClick={() => getBalanceForAddress()}>Get Balance</button>
        </div>
        <div>
          To Send To:
          <input
            type="text"
            onChange={(e) => setSendToAddress(e.target.value)}
          />
          Send Amount:
          <input
            type="number"
            onChange={(e) => setAmountToSend(e.target.value)}
          />
          <button onClick={transferTokens}> Send </button>
        </div>
      </div>
    </div>
  );
}

export default App;
