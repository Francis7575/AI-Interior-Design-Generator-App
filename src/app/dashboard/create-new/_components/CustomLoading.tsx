import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image"

type CustomLoadingProps = {
  loading: boolean
}

const CustomLoading = ({loading}: CustomLoadingProps) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <div className="bg-white flex flex-col items-center justify-center">
          <Image src={'/loading.gif'} width={50} height={50} alt="Loading..."/>
          <AlertDialogTitle className="mt-4 font-normal">Redesigning your Room... Do not Refresh</AlertDialogTitle>
        </div>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default CustomLoading