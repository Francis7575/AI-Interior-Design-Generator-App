import { ProviderProps } from "@/types/types";
import Header from "./_components/Header";

const DashboardLayout = ({ children }: ProviderProps) => {
  return (
    <div>
      <Header />
      <div className="pt-20 px-10 md:px-28 lg:px-40">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout