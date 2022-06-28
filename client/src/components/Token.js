import React,{useEffect,useState} from 'react'
import {ethers} from "ethers"
import addresses  from ".././artifacts/Addresses.json"
import ERC20Abi from ".././artifacts/contracts/ERC20.sol/ERC20.json"

import { Routes,Route } from 'react-router-dom';
import Navbar from "./Navbar"
import TransferFrom from "./TransferFrom"
import Home from "./Home"
const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num)


const Token = () => {
    const [accounts,setAccount] = useState(null);
    const [signers,setSigner] = useState(null);
    const [loading,setLoading] = useState(true);
    const [name,setName] = useState('');

    const [symbol,setSymbol] = useState('')
    const [ercToken,setErcToken] = useState(null)
    const [accountBal,setAccountBal] = useState(null);

    const ConnectWeb = async() =>{
        if (typeof window.ethereum !== "undefine"){
            const account = await window.ethereum.request({method:"eth_requestAccounts"})
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            console.log("Account ",account[0]) 
            setAccount(account[0])

            window.ethereum.on("chainChanged",(chainId)=>{
                window.location.reload()
            })

            window.ethereum.on("accountsChanged",async function(account){
                setAccount(account[0]);
                await ConnectWeb();
            })

        
            const signer = provider.getSigner();
            

            setSigner(signer)
            const erc20Token = new ethers.Contract(addresses.ERC20Address,ERC20Abi.abi,signer)
            setErcToken(erc20Token)
          

            const name = await erc20Token.name()

            const symbol = await erc20Token.symbol()
            const initialSupply = toWei("100000")
            const deployContract  = await erc20Token.deployed(initialSupply)
            console.log(deployContract)

            const totalSupply = await erc20Token.totalSupply();
            setName(name)
            setSymbol(symbol);

      
            
            

            const CurrentBalance = await erc20Token.balanceOf(accounts);
            console.log("CurrentBal ",fromWei(CurrentBalance))
            setAccountBal(fromWei(CurrentBalance))
            setLoading(false)
            
        }
        else{
            alert("No Wallet Founds..")
        }
    }

    useEffect(()=>{
        ConnectWeb()
    },[ercToken && !loading && accounts])


    

    return (
        <>
        <Navbar ConnectWeb={ConnectWeb} accounts={accounts}  />
        <Routes>
          <Route path='/' element={<Home ercToken={ercToken}  accounts={accounts}
           name={name} symbol={symbol} accountBal={accountBal} loading={loading} />} />
          <Route path='/transferfrom' element={<TransferFrom ercToken={ercToken} accounts={accounts}
           name={name} symbol={symbol} accountBal={accountBal} loading={loading}   />} />
          
        </Routes>

        </>
    )
}

export default Token