import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

type AiOutputDialogProps = {
  openDialog: boolean
  closeDialog: () => void
  orgImage: string
  aiImage: string
}

const AiOutputDialog = ({ openDialog, closeDialog, orgImage, aiImage }: AiOutputDialogProps) => {
  return (
    <AlertDialog open={openDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Result:</AlertDialogTitle>
          <ReactBeforeSliderComponent
            firstImage={{
              imageUrl: aiImage
            }}
            secondImage={{
              imageUrl: orgImage
            }}
          />
          <Button onClick={closeDialog}>Close</Button>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AiOutputDialog