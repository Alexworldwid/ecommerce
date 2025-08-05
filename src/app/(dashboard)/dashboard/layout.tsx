
export default function DashboardLayout ({children}: Readonly<{
    children: React.ReactNode;
  }>) 
  {
    return (
        <div className="relative">
            <main className="flex flex-col items-center justify-center w-full">
                {children}
            </main>
        </div>
    )

}