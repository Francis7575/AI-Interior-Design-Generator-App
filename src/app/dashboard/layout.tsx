import { ProviderProps } from "@/types/types";

const DashboardLayout = ({ children }: ProviderProps) => {
  return (
    <div>
      <div className="pt-20 px-4 md:px-8 lg:px-20">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout