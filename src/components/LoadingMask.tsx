interface LoadingMaskProps {
  className?: string
}

export default function LoadingMask({ className }: LoadingMaskProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  )
}
