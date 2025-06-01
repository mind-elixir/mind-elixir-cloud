import { useState } from 'react'
import { Copy, Check, Twitter, Facebook, Linkedin, Share2, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ShareModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shareUrl: string
  title?: string
}

export default function ShareModal({
  open,
  onOpenChange,
  shareUrl,
  title = 'Share Mind Map'
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [embedCopied, setEmbedCopied] = useState(false)

  const embedCode = `<iframe src="${shareUrl}" allowfullscreen="true" style="border:none" width="100%" height="600px"></iframe>`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setEmbedCopied(true)
      setTimeout(() => setEmbedCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy embed code:', error)
    }
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(title)
    const url = encodeURIComponent(shareUrl)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareToFacebook = () => {
    const url = encodeURIComponent(shareUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  const shareToLinkedin = () => {
    const url = encodeURIComponent(shareUrl)
    const title_encoded = encodeURIComponent(title)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title_encoded}`, '_blank')
  }

  const shareToWeibo = () => {
    const text = encodeURIComponent(title)
    const url = encodeURIComponent(shareUrl)
    window.open(`http://service.weibo.com/share/share.php?title=${text}&url=${url}`, '_blank')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Share your mind map with others or embed it on your website.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Share Link Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Link</label>
            <div className="flex items-center space-x-2">
              <Input
                value={shareUrl}
                readOnly
                className="h-9"
              />
              <Button
                size="sm"
                className="px-3"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Social Media Sharing */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Share on Social Media</label>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={shareToTwitter}
                className="rounded-full"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={shareToFacebook}
                className="rounded-full"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={shareToLinkedin}
                className="rounded-full"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={shareToWeibo}
                className="rounded-full"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Embed Code Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Embed Mind Map</label>
            <div className="space-y-2">
              <Textarea
                value={embedCode}
                readOnly
                className="h-24 resize-none text-xs"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyEmbed}
                className="w-full"
              >
                <Code className="h-4 w-4 mr-2" />
                {embedCopied ? 'Copied!' : 'Copy Embed Code'}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
