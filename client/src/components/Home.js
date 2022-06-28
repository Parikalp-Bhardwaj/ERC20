import React,{useState,useEffect} from 'react'
import {ethers} from "ethers"
import {
  FormControl,
  Box,
  Input,Button
} from '@chakra-ui/react'

import { Heading } from '@chakra-ui/react'

const Home = ({ercToken,accountBal,accounts,symbol,name,totalSupply,loading}) => {
    
    const [transferAcc,setTransferAcc] = useState('')
    const [numTokenTransfer,setTokenTransfer] = useState('');
   
    const TokenTransfer = async(e) =>{
      e.preventDefault();
      const transferAmount = ethers.utils.parseEther(numTokenTransfer)
      const tokenTransfer = await ercToken.transfer(transferAcc,transferAmount);
      await tokenTransfer.wait()

    }

  return (

    <div>
      <div className="flex flex-row justify-center items-center flex-col">
        <div className="text-2xl flex justify-center mt-20">
        <Box w='800px' h="700px" borderWidth='3px' borderRadius='lg' overflow='hidden'>
            {loading?"":(
            <Heading className="ml-14 text-3xl flex justify-center">{accounts.slice(0,4)+"..."+accounts.slice(38,42)}</Heading>
            )}
            <p className="ml-[250px]">Balance is {accountBal}</p>
            <p className="ml-[350px]">{name} ({symbol})</p>
            <div className="mt-20 flex flex-col justify-center items-center">
            <br></br>
            <Input width={'620px'} placeholder='Transfer Token Address' size='lg'className="mb-2"
            fontSize="2xl"
            errorBorderColor='red.300' type="text" onChange={(e) => setTransferAcc(e.target.value) }  />
            <br></br>
            <Input width={'620px'} placeholder='No. of Token Transfer' size='lg' className="mb-2"
            fontSize="2xl"
            errorBorderColor='red.300' type="number" onChange={(e) => setTokenTransfer(ethers.utils.formatEther(e.target.value))} />
            <br></br>
        
            <button className="rounded-full bg:teal p-3 w-[620px] hover:bg-teal-700 active:bg-teal-500
            bg-teal-600 text-black mt-2" onClick={TokenTransfer}>Submit</button>
            </div>
        </Box>
        </div>

        </div>

    </div>
  )
}

export default Home