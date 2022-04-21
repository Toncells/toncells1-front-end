import { VFC, useState } from "react";
import {
  Wrapper,
  ConnectButton,
  SupportButton,
  Available,
  Search,
} from "./style";
import { message } from "antd";
import {
  WalletTwoTone,
  TeamOutlined,
  SearchOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const SEPEZHO_LINK = "https://t.me/toncells_technical_support";

type Props = {
  bigArr: any;
  setonSideBar: (isSideBarActive: boolean) => void;
  isBuyMode: boolean;
  toggleBuyMode: () => void;
  toggleZoomMode: (isZoom: boolean) => void;
  isZoomMode: boolean;
  toggleMap: () => void;
};

const DockBar: VFC<Props> = (props) => {
  const {
    bigArr,
    setonSideBar,
    toggleBuyMode,
    toggleZoomMode,
    isZoomMode,
    toggleMap,
  } = props;

  const numberMinted = bigArr?.status.filter(
    (e: any) => e.Status !== "Free"
  ).length;

  const [key, setTONwalletKey] = useState("");

  return (
    <Wrapper
      onMouseEnter={() => setonSideBar(true)}
      onMouseLeave={() => setonSideBar(false)}
    >
      <ConnectButton onClick={() => connectWalletTON(setTONwalletKey)}>
        {!key ? (
          <WalletTwoTone />
        ) : (
          <span>{`${key.slice(0, 3)}...${key.slice(-2)}`}</span>
        )}
      </ConnectButton>
      <Search onClick={toggleBuyMode}>
        <SearchOutlined />
      </Search>

      <Search onClick={toggleMap}>
        <MenuOutlined />
      </Search>

      <a href={SEPEZHO_LINK} target="_blank" rel="noreferrer">
        <SupportButton>
          <TeamOutlined />
        </SupportButton>
      </a>

      <Search onClick={() => toggleZoomMode(!isZoomMode)}>
        {isZoomMode ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
      </Search>

      <Available>
        Free cells: <br />
        {((2944 - numberMinted) / 1000).toFixed(2)}k/10k
      </Available>

      <Available>
        Version: <br />
        0.0.1 (alfa)
      </Available>
    </Wrapper>
  );
};

export default DockBar;

const connectWalletTON = async (setTONwalletKey: any) => {
  try {
    //@ts-ignore
    const ton = window.ton;
    if (ton) {
      const accounts = await ton.send("ton_requestWallets");
      setTONwalletKey(accounts[0].address);
    }
  } catch (err) {
    message.error(
      "Install TonWallet. Close all TonWallet windows and try again pls",
      5
    );
  }
};
