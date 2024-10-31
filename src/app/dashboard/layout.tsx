import { ProviderProps } from "@/types/types";
import Header from "./_components/Header";

const DashboardLayout = ({ children }: ProviderProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default DashboardLayout