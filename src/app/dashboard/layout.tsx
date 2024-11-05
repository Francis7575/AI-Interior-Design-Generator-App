  import { ProviderProps } from "@/types/types";
import Header from "./_components/Header";

const DashboardLayout = ({ children }: ProviderProps) => {
  return (
    <div>
      <Header />
      <div className="pt-20 px-4 md:px-8 lg:px-20">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout