interface LoadingMaskProps {
  className?: string
}

export default function LoadingMask({ className }: LoadingMaskProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )
}
