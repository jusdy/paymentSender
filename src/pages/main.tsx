import { useState } from "react";
import {
  useSendTransaction,
  usePrepareSendTransaction,
  useContractRead,
  useContractWrite,
} from "wagmi";
import useConnectWallet from "hooks/useWalletConnect";
import { useAccount } from "wagmi";
import { shortenAddress } from "utils";
import { parseEther } from "viem";
import { contractAddress } from "constant";
import PaymentSenderABI from "abi/paymentSender.json";

const Main = () => {
  const [transferValue, setTransferValue] = useState("0");
  const { address, isConnected } = useAccount();
  const { connetAndDisconntWallet } = useConnectWallet();
  const sendConfig = usePrepareSendTransaction({
    to: contractAddress,
    value: parseEther(transferValue),
  });
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(
    sendConfig.config
  );
  const [formValues, setFormValues] = useState([{ amount: "", recipient: "" }]);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const senderContract = useContractRead({
    address: contractAddress,
    abi: PaymentSenderABI,
    functionName: "owner",
  });

  const handleChange = (key: number, e: any) => {
    setFormValues((prevFormValues) => {
      return prevFormValues.map((item, index) => {
        if (index === key) {
          return { ...item, [e.target.name]: e.target.value };
        }
        return item;
      });
    });
  };

  const removeFormFields = (ind: number) => {
    setFormValues((prevFormValues) =>
      prevFormValues.filter((item, key) => key !== ind)
    );
  };

  const onHandleSubmit = () => {
    for (const item of formValues) {
      if (!item.amount || !item.recipient) {
        window.alert("Input the required fields");
        return;
      }
    }

    const amountGroup = formValues.map((item, key) => {
      return parseEther(item.amount);
    });

    const recipientGruop = formValues.map((item, key) => {
      return item.recipient;
    });

    distribute.write({
      args: [amountGroup, recipientGruop],
      value: parseEther("0"),
    });
  };

  const distribute = useContractWrite({
    address: contractAddress,
    abi: PaymentSenderABI,
    functionName: "distribute",
  });

  const withdraw = useContractWrite({
    address: contractAddress,
    abi: PaymentSenderABI,
    functionName: "withdraw",
  });

  return (
    <div className="p-6">
      <button
        className="w-40 h-12 bg-blue-600 text-xl text-white"
        onClick={() => {
          connetAndDisconntWallet();
        }}
      >
        {address && isConnected
          ? shortenAddress(address as `0x${string}`)
          : "Connect Wallet"}
      </button>
      <div className="flex gap-10">
        <div className="mt-10">
          <input
            value={transferValue}
            placeholder="Input Send Amount"
            className="border border-black outline-none focus:outline-none px-2 h-10"
            onChange={(e) => {
              setTransferValue(e.target.value);
            }}
          />

          <div className="mt-4">
            <button
              className="text-white p-2 font-semibold rounded-lg bg-orange-700"
              disabled={!sendTransaction}
              onClick={() => sendTransaction?.()}
            >
              Send ETH to Vault
            </button>
          </div>
        </div>

        <div className="mt-10">
          <input
            placeholder="Target Address"
            value={withdrawAddress}
            className="border border-black outline-none focus:outline-none px-2 h-10"
            onChange={(e) => {
              setWithdrawAddress(e.target.value)
            }}
          /> <br/><br/>

          <input
            placeholder="Amount for withdraw"
            value={withdrawAmount}
            className="border border-black outline-none focus:outline-none px-2 h-10"
            onChange={(e) => {
              setWithdrawAmount(e.target.value)
            }}
          />

          <div className="mt-4">
            <button
              className="text-white p-2 font-semibold rounded-lg bg-orange-700"
              onClick={() => withdraw.write({
                args: [parseEther(withdrawAmount), withdrawAddress]
              })}
            >
              Withdraw & Split
            </button>
          </div>
        </div>
      </div>

      {senderContract.data === address && (
        <div className="mt-10">
          <button
            onClick={() =>
              setFormValues((prev) => [...prev, { amount: "", recipient: "" }])
            }
            className="px-4 py-2 text-white bg-blue-600"
          >
            Add pair
          </button>

          {formValues.map((item, key) => (
            <div key={key} className="my-4">
              <input
                className="p-2 mr-4 w-40 h-10 border border-gray-500"
                name="amount"
                value={item?.amount}
                onChange={(e) => handleChange(key, e)}
                placeholder="Input the amount"
              />
              <input
                className="p-2 w-72 border border-gray-500 h-10"
                name="recipient"
                value={item?.recipient}
                onChange={(e) => handleChange(key, e)}
                placeholder="Input the recipient address"
              />

              {key ? (
                <button
                  type="button"
                  className="ml-10 px-2 bg-red-600 text-white h-10"
                  onClick={() => removeFormFields(key)}
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}

          <button
            onClick={onHandleSubmit}
            className="px-4 py-2 text-white bg-green-500"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;
