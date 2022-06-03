import {
  VFC,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { DisplaySize } from "../../constants";
import { CellModalContext } from "../../context";
import CellModalDefault from "../CellModalDefault";
import CellModalBuy from "../CellModalBuy";
import CellAreaSmall from "./CellsAreaSmall";
import * as _ from "lodash";
import { Wrapper, CellInfo, Text } from "./style";

type Props = {
  isZoomMode: boolean;
  onSideBar: boolean;
  mapVersion: number;
  nftImgs: string[];
  bigArr: any;
};

type CellsAreaType = {
  id: number;
  x: number;
  y: number;
  lastCellId?: number;
  firstCellId?: number;
};

const cellsCollection: CellsAreaType[] = [
  {
    id: 1,
    x: 1,
    y: 1,
    lastCellId: 16,
    firstCellId: 1,
  },
];

for (let x = 1; x < 26; x++) {
  for (let y = 1; y < 26; y++) {
    cellsCollection.push({
      id: 1,
      x: x,
      y: y,
    });
  }
}

const checkAreaId = (id: number) => {
  let i = 28;
  while (i <= 528) {
    i += 25;
    if (id >= i && id <= i + 20) return false;
  }
  return true;
};

const checkCellId = (id: number) => {
  let i = 28;
  while (i <= 528) {
    i += 25;
    if (
      id >= convertAreaIdToFirstCellId(i) &&
      id <= convertAreaIdToLastCellId(i + 20)
    )
      return false;
  }
  return true;
};

const convertAreaIdToFirstCellId = (id: number) => (id - 1) * 16 + 1;
const convertAreaIdToLastCellId = (id: number) => id * 16 - 1;

cellsCollection.shift();
cellsCollection.forEach((cellsArea, idx) => {
  cellsArea.id += idx;
  cellsArea.lastCellId = cellsArea.id * 16;
  cellsArea.firstCellId = cellsArea.lastCellId - 16 + 1;
});

const Cells: VFC<any> = (props) => {
  const {
    isZoomMode,
    onSideBar,
    mapVersion,
    nftImgs,
    bigArr,
    setSelectedIds,
    selectedIds,
    hex,
    setHex,
    selectedCells,
    setSelectedCells,
    toggleInvoiceMode,
    buyAlot,
    setSelectedAreas,
    cellsAreaData,
  } = props;

  const { toggleCellModal, isCellModalActive } = useContext(CellModalContext);
  const [activeAreaData, setActiveAreaData] = useState<CellsAreaType>({
    id: 1,
    x: 1,
    y: 1,
    firstCellId: 1,
    lastCellId: 16,
  });
  const [isBuyMode, setIsBuyMode] = useState<boolean>(false);
  const [isInvoiceMode, setIsInvoiceMode] = useState<boolean>(false);
  //   const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [activeCellId, setActiveCellId] = useState<number>(1);
  const [locationZ, setLocationZ] = useState<number>(0);
  const [nftId, setnftId] = useState<number[]>([0, 0, 0]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [cellsData, setCellsData] = useState();

  const { width } = useWindowDimensions();

  console.log(isZoomMode);

  useEffect(() => {
    // if (!isCellModalActive && !hex) setSelectedIds([]);
  }, [isCellModalActive]);

  const toggleBuyMode = useCallback(() => {
    setIsBuyMode((prev) => !prev);
  }, []);

  const handleSelectCellClick = (id: number) => {
    setSelectedCells((prev: any) => [...prev, id]);
  };

  const removeSelectCellItem123 = (id: number) => {
    setSelectedCells((prev: any) => [...prev.filter((e: number) => e !== id)]);
  };

  const handleSelectCellClick123 = (id: number) => {
    setSelectedAreas((prev: any) => [...prev, id]);
  };

  const removeSelectCellItem123123 = (id: number) => {
    setSelectedAreas((prev: any) => [...prev.filter((e: number) => e !== id)]);
  };

  const handleCellsAreaClick = (
    id: number,
    x: number,
    y: number,
    firstCellId?: number,
    lastCellId?: number
  ) => {
    if (!buyAlot) {
      toggleCellModal();

      setActiveAreaData({
        id: id,
        x: x,
        y: y,
        firstCellId: firstCellId!,
        lastCellId: lastCellId!,
      });
    } else {
      //@ts-ignore
      let i = firstCellId;
      //@ts-ignore
      while (i <= lastCellId) {
        // cellIdsArr.push(i);
        if (!cellsAreaData[0]) {
          //@ts-ignore
          handleSelectCellClick(i);
        } else {
          //@ts-ignore
          removeSelectCellItem123(i);
        }

        //@ts-ignore
        i++;
      }

      if (!cellsAreaData[0]) {
        handleSelectCellClick123(id);
      } else {
        removeSelectCellItem123123(id);
      }
    }
  };

  const handleCellClick = useCallback((locationZ: number, id: number) => {
    setLocationZ(locationZ);
    setActiveCellId(id);
  }, []);

  const removeSelectCellItem = useCallback((locationZ: number, id: number) => {
    setLocationZ(locationZ);
    setActiveCellId(id);
  }, []);

  console.log(nftId);
  const setnftIdfun = _.debounce((e) => setnftId(e), 100);

  const [opacity, setOpacity] = useState<number>(0);
  console.log(nftId);
  const setOp = _.debounce((e) => setOpacity(e), 100);
  const ref = useRef(null);
  const ref1 = useRef(null);
  const activeAreaCollection: any[] = [];

  useEffect(() => {
    if (width > DisplaySize.Tablet) {
      window.addEventListener("mousemove", (e) => {
        // console.log(ref);
        console.log(document.body.clientWidth - 774 / 2);
        console.log(e.pageX);
        if (isZoomMode) {
          if (ref.current) {
            //@ts-ignore
            ref.current.style.left = e.pageX + "px";
            //@ts-ignore
            ref.current.style.top = e.pageY + "px";
          }
        } else {
          if (ref.current) {
            //@ts-ignore
            ref.current.style.left =
              (e.pageX - (document.body.clientWidth - 774) / 2) * 2.2222222222 +
              "px";
            //@ts-ignore
            ref.current.style.top = (e.pageY - 38) * 2.2222222222 + "px";
          }
        }
      });
    }
  }, [ref.current, isZoomMode, width]);

  //   useEffect(() => {
  //     if (ref1.current)
  //       ref1.current.addEventListener("mousemove", (e) => {
  //         //@ts-ignore
  //         ref1.current.style.left = e.pageX + "px";
  //         //@ts-ignore
  //         ref1.current.style.top = e.pageY + "px";
  //       });
  //   }, [ref1.current]);

  for (
    let id = activeAreaData.firstCellId!;
    id < activeAreaData.lastCellId! + 1;
    id++
  ) {
    activeAreaCollection.push({
      id: id,
    });
  }

  //@ts-ignore
  // document.getElementById("IDIDIID").getContext("2d").drawImage(img, 0, 0);
  let map =
    mapVersion === 0
      ? "/MAP.png"
      : mapVersion === 1
      ? "/MAPFREE.png"
      : "/MAPMINTED.png";

  return (
    <>
      <Wrapper
        ref={ref1}
        onMouseOut={() => {
          if (isCellModalActive) {
            setnftIdfun([0, 0, 0]);
          }
          if (width > DisplaySize.Tablet) {
            setOp(0);
          }
        }}
        // on
        onMouseEnter={() => {
          setnftIdfun([1, 1, 0]);
        }}
        onMouseOver={() => {
          if (width > DisplaySize.Tablet) {
            setOp(1);
          }
        }}
      >
        <CellInfo
          ref={ref}
          style={{
            opacity: opacity,
            margin: isZoomMode
              ? "-32px -12px 32px 12px"
              : "32px -32px -32px 32px",
          }}
        >
          {nftId[1] ? <img src={nftImgs[nftId[1] - 1]} alt="#" /> : null}
          {nftId[0] ? <img src={nftImgs[nftId[0] - 1]} alt="#" /> : null}
        </CellInfo>

        {/* <canvas id={"IDIDIID"} width={100} height={100}></canvas> */}
        <img src={map} alt="#" />
        <Text>coming soon...</Text>
        {cellsCollection.map(({ id, x, y, firstCellId, lastCellId }) => (
          <div
            key={id}
            onClick={() =>
              checkAreaId(id)
                ? handleCellsAreaClick(id, x, y, firstCellId, lastCellId)
                : null
            }
            style={{
              background: checkAreaId(id)
                ? cellsAreaData.includes(id)
                  ? "red"
                  : ""
                : "grey",
              cursor: checkAreaId(id) ? "pointer" : "not-allowed",
              zIndex: "10",
            }}
            onMouseOver={() => {
              setnftIdfun([x, y, 0]);
            }}
          >
            <CellAreaSmall
              key={id}
              firstCellId={firstCellId!}
              lastCellId={lastCellId!}
            />
          </div>
        ))}
      </Wrapper>
      {/* {isEditMode ? (
        <CellModalEdit
          isVisible={isCellModalActive}
          locationX={activeAreaData.x}
          locationY={activeAreaData.y}
          activeCellId={activeCellId}
          onClose={toggleEditMode}
        /> */}
      {isBuyMode ? (
        <CellModalBuy
          isVisible={isCellModalActive}
          onClose={toggleCellModal}
          id={activeAreaData.id}
          locationX={activeAreaData.x}
          locationY={activeAreaData.y}
          locationZ={locationZ}
          toggleBuyMode={toggleBuyMode}
          activeCellId={activeCellId}
          cellIds={selectedIds}
          setnftIdfun={setnftIdfun}
        />
      ) : !isInvoiceMode ? (
        <CellModalDefault
          isVisible={isCellModalActive}
          onClose={toggleCellModal}
          id={activeAreaData.id}
          locationX={activeAreaData.x}
          locationY={activeAreaData.y}
          locationZ={locationZ}
          firstCellId={activeAreaData.firstCellId!}
          lastCellId={activeAreaData.lastCellId!}
          toggleBuyMode={toggleBuyMode}
          handleCellClick={handleCellClick}
          activeAreaCollection={activeAreaCollection}
          toggleInvoiceMode={toggleInvoiceMode}
          setSelectedIds={setSelectedIds}
          selectedIds={selectedIds}
          setnftIdfun={setnftIdfun}
          nftId={nftId}
          selectedCells={selectedCells}
          setSelectedCells={setSelectedCells}
          cellsData={bigArr}
          activeCellId={activeCellId}
          nftImgs={nftImgs}
          isZoomMode={isZoomMode}
          CellInfo={CellInfo}
          hex={hex}
        />
      ) : null}
    </>
  );
};

export default Cells;
