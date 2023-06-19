import LoadingSpinner from "@/components/LoadingSpinner"

const loading = () => {
  return (
    <div className="h-screen w-screen bg-slate-900 opacity-80 grid place-items-center">
        <LoadingSpinner />
    </div>
  )
}

export default loading