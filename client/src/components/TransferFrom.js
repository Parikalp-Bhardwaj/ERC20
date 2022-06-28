import React,{useState,useEffect} from 'react'
import {ethers} from "ethers"

import {
  FormControl,
  Box,
  Input,Button
} from '@chakra-ui/react'

import { Heading } from '@chakra-ui/react'



const TransferFrom = ({ercToken,accountBal,accounts,symbol,name,totalSupply,loading}) => {
    const [transferAcc,setTransferAcc] = useState('')
    const [numTokenTransfer,setTokenTransfer] = useState('');
    const [trasnferTo,setTransferTo] = useState('')
    const [approveAccount,setApproveAccount] = useState('')
    const [approveToken,setApproveToken] = useState('')
   
    useEffect(()=>{

    },[ercToken && !loading])

    const approveSubmit = async(event)=>{
      event.preventDefault()
      const transferAmount = ethers.utils.parseEther(approveToken)
      const approceAcc = await ercToken.approve(approveAccount,transferAmount)
      await approceAcc.wait()


    }

    const transferToken = async(event) =>{
      event.preventDefault()
      const transferAmount = ethers.utils.parseEther(approveToken)
      const transferfrom = await ercToken.transferFrom(transferAcc,trasnferTo,transferAmount)
      await transferfrom.wait()



      
    }

  return (
    <div>
      
      <div className="flex flex-row justify-center items-center flex-col">
        <div className="text-2xl flex justify-center mt-20">
        <Box w='800px' h="full" borderWidth='3px' borderRadius='lg'>
            {loading?"":(
            <Heading className="ml-14 text-3xl flex justify-center">{accounts.slice(0,4)+"..."+accounts.slice(38,42)}</Heading>
            )}
            <p className="ml-[250px]">Balance is. {accountBal}</p>
            <p className="ml-[350px]">{name} ({symbol})</p>
            <div className="mt-5 flex flex-col justify-center items-center">
           
            <br></br>
            <p className="flex justify-center text-3xl mb-20">Approve</p>
            <div className="flex flex-col justify-center">
              
            <Input width={'620px'} placeholder='Transfer Token From' size='lg'className="mb-2"
            fontSize="2xl"
            errorBorderColor='red.300' type="text" onChange={(e) => setApproveAccount(e.target.value) }  />
            <br></br>
            <Input width={'620px'} placeholder='Transfer Token To' size='lg' className="mb-2"
            fontSize="2xl"
            errorBorderColor='red.300' type="number"  onChange={(e) => setApproveToken(e.target.value) } />
            <br></br>
           
            <button className="rounded-full bg:teal p-3 w-[620px] hover:bg-teal-700 active:bg-teal-500
            bg-teal-600 text-black mt-2" onClick={approveSubmit} >Submit</button>
            </div>


            <p className="flex justify-center text-3xl mt-20">TransferFrom</p>

            <div div className="flex flex-col justify-center mt-12">
              
            <Input width={'620px'} placeholder='Transfer Token From' size='lg'className="mb-2"
            fontSize="2xl"
            errorBorderColor='red.300' type="text" onChange={(e) => setTransferAcc(e.target.value) }  />
            <br></br>
            <Input width={'620px'} placeholder='Transfer Token To' size='lg' className="mb-2"
            fontSize="2xl"
            errorBorderColor='red.300' type="text"  onChange={(e) => setTransferTo(e.target.value) } />
            <br></br>
            <Input width={'620px'} placeholder='Price in ETH' size='lg' className="mb-2"
            fontSize="2xl"
            errorBorderColor='red.300' type="number" onChange={(e) => setTokenTransfer(ethers.utils.formatEther(e.target.value))}  />
            
            <button className="rounded-full bg:teal mb-20 p-3 w-[620px] hover:bg-teal-700 active:bg-teal-500
            bg-teal-600 text-black mt-2" onClick={transferToken} >Submit</button>


            </div>
            
            </div>
        </Box>
        </div>

        </div>
        
        

    </div>
  )
}

export default TransferFrom