import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useCookies } from "react-cookie";
import { message } from "antd";

const AUTH_TOKEN = "AUTH_TOKEN";

const sessionStore = window.sessionStorage;

const asciiToHex = (addressStr: string) => {
  let arr1 = [];

  for (let n = 0, l = addressStr.length; n < l; n++) {
    let hex = Number(addressStr.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }

  return arr1.join("");
};

export const useAuth = () => {
  const { updateAuthData } = useContext<any>(AuthContext);

  const [cookies, setCokies, removeCookie] = useCookies([AUTH_TOKEN]);

  let walletAddress: any;

  if (
    (!window as any).tonProtocolVersion ||
    (window as any).tonProtocolVersion < 1
  ) {
    message.error("Please update your TON Wallet Extension");
  }

  const provider = (window as any).ton;

  const connect = async () => {
    const accounts = await provider.send("ton_requestAccounts");
    const account = accounts[0];

    return account;
  };

  const logIn = async () => {
    try {
      const address = await connect();
      walletAddress = address;

      const hexData = asciiToHex(walletAddress);

      const signature = await provider.send("ton_rawSign", [
        {
          data: hexData,
        },
      ]);

      if (walletAddress.length > 1) {
        updateAuthData(walletAddress, hexData);
      }

      console.log("Signature is: ", signature);
      sessionStore.setItem("wallet_address", walletAddress);
      setCokies(AUTH_TOKEN, signature);
    } catch (error) {
      message.error(`${error}`);
    }
  };

  const logOut = () => {
    removeCookie(AUTH_TOKEN);
    sessionStore.removeItem("wallet_address");
  };

  return { walletAddress, logIn, logOut };
};
