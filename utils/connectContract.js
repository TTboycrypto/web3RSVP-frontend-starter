// import ethers and our ABI

import abiJSON from "./WEB3RSVP.json";
import { ethers } from "ethers";


// function connectContract - 

// window.ethereum: acess to the global ETH API can be accessed via the "window" object in weindow.ethereum.
// Need access to this object in order to connect to our contract. We will wrap our logic in a "try..catch" statement to easily catch errors
// At the end of the contract we want to return the contract so we can call it from another component

function connectContract () {
    // Note: Your contractAddress will start with 0x delete everything in the quotes and paste your contract address.
    const contractAddress = "0x[CONTRACT ADDRESS]";
    const contractABI = abiJSON.abi;
    let rsvpContract;
    try {
        const { ethereum } = window;

        if (ethereum) {
            // checking for eth object in the window
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            rsvpContract= new ethers.Contract(contractAddress, contractABI, signer); // Instantiatin new connection to the contract
        }   else {
            console.log("Ethereum object doesn't exist!");
        }
    }   catch (error) {
        console.log("ERROR:", error);
    }
    return rsvpContract;
}

export default connectContract;

// ^^ now we can connect to the contract. Now we can call a funciton to create a new event.