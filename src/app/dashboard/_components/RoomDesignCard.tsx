import { RoomList } from "@/types/types"
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDialog from "./AiOutputDialog";
import { useContext } from "react";
import { modalContext } from "@/context/ModalContext";

type RoomDesignCardProps = {
  room: RoomList
};

const RoomDesignCard = ({ room }: RoomDesignCardProps) => {

  const context = useContext(modalContext);
  if (!context) {
    return null;
  }
  const { openDialog, setOpenDialog } = context;

  return (
    <>
      <div className="shadow-md rounded-md cursor-pointer hover:opacity-70"
        onClick={() => setOpenDialog(true)}>
        <ReactBeforeSliderComponent
          firstImage={{
            imageUrl: room.aiImage
          }}
          secondImage={{
            imageUrl: room.orgImage
          }}
        />
        <div className="p-4">
          <h2>🏡 Room Type: {room.roomType}</h2>
          <h2>🎨 Design Type:{room.designType}</h2>
        </div>
      </div>
      <AiOutputDialog
        openDialog={openDialog}
        closeDialog={() => setOpenDialog(false)}
        aiImage={room.aiImage}
        orgImage={room.orgImage}
      />
    </>
  )
}

export default RoomDesignCard