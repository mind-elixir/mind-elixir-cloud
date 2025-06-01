// Simple toast implementation for React
let toastContainer: HTMLDivElement | null = null

const createToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.className = 'fixed top-4 right-4 z-50 space-y-2'
    document.body.appendChild(toastContainer)
  }
  return toastContainer
}

const showToast = (type: string, text: string, duration: number) => {
  const container = createToastContainer()

  const toastElement = document.createElement('div')
  toastElement.className = `alert alert-${type} shadow-lg max-w-sm`
  toastElement.innerHTML = `
    <div>
      <span>${text}</span>
    </div>
  `

  container.appendChild(toastElement)

  // Animate in
  toastElement.style.opacity = '0'
  toastElement.style.transform = 'translateX(100%)'
  setTimeout(() => {
    toastElement.style.transition = 'all 0.3s ease'
    toastElement.style.opacity = '1'
    toastElement.style.transform = 'translateX(0)'
  }, 10)

  // Remove after duration
  setTimeout(() => {
    toastElement.style.opacity = '0'
    toastElement.style.transform = 'translateX(100%)'
    setTimeout(() => {
      if (container.contains(toastElement)) {
        container.removeChild(toastElement)
      }
    }, 300)
  }, duration)
}

export default {
  warning: (text: string, duration = 2000) => {
    showToast('warning', text, duration)
  },
  success: (text: string, duration = 2000) => {
    showToast('success', text, duration)
  },
  error: (text: string, duration = 2000) => {
    showToast('error', text, duration)
  },
}
