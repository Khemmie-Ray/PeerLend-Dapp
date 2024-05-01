import { useState } from "react";
import { isSupportedChain } from "../utility";
import { isAddress } from "ethers";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
  } from "@web3modal/ethers/react";
import { getProtocolContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Text, Dialog, Button, TextField, Flex} from "@radix-ui/themes";

  const CreateRequest = () => {
    const[collateralAdd, setCollateralAdd] = useState("");
    const[amount, setAmount] = useState(0);
    const[interest, setInterest] = useState("");
    const[returnDate, setReturnDate] = useState("");
    const[loanCurrency, setLoanCurrency] = useState("");

    console.log(amount)

    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
  
    async function handleRequest () {
      if (!isSupportedChain(chainId)) return console.error("Wrong network");
      if (!isAddress(address)) return console.error("Invalid address");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
  
      const contract = getProtocolContract(signer);
  
      try {
        const transaction = await contract.createLendingRequest(collateralAdd, amount, interest, returnDate, loanCurrency);
        console.log("transaction: ", transaction);
        const receipt = await transaction.wait();
  
        console.log("receipt: ", receipt);
  
        if (receipt.status) {
          return toast.success("UserName creation successful!", {
              position: "top-center",
            });
        }
  
        toast.error("UserName creation failed!", {
          position: "top-center",
        });
      } catch (error) {
        toast.error("UserName creation failed!", {
            position: "top-center",
          });
      }
    };

    return (
        <div>
            <Dialog.Root>
                <Dialog.Trigger>
                <button className="bg-purple py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] lg:w-[50%] md:w-[50%] w-[100%] my-4">Create</button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Edit profile</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                    Make changes to your profile.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                        Collateral Address
                        </Text>
                        <TextField.Root
                        placeholder="collateral address"
                        onChange={(e) => setCollateralAdd(e.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                        Amount
                        </Text>
                        <TextField.Root
                        placeholder="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                        Interest
                        </Text>
                        <TextField.Root
                        placeholder="interest"
                        onChange={(e) => setInterest(e.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                        Return Date
                        </Text>
                        <TextField.Root
                        defaultValue="freja@example.com"
                        placeholder="return date"
                        onChange={(e) => setReturnDate(e.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                        Loan currency
                        </Text>
                        <TextField.Root
                        placeholder="loan currency"
                        onChange={(e) => setLoanCurrency(e.target.value)}
                        />
                    </label>    
                    </Flex>
                    <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                        Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleRequest}>Save</Button>
                    </Dialog.Close>
                    </Flex>
                </Dialog.Content>
                </Dialog.Root>
        </div>
    )
  };

export default CreateRequest