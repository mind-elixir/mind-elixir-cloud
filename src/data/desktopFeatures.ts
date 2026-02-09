import { MindElixirData } from 'mind-elixir'

export const desktopFeaturesData: MindElixirData = {
  nodeData: {
    id: 'root',
    topic: 'Mind Elixir Desktop',
    children: [
      {
        id: 'core-features',
        topic: 'Core Features',
        direction: 0,
        children: [
          {
            id: 'data-privacy',
            topic: 'Data Privacy & Security',
            children: [
              {
                id: 'local-storage',
                topic: 'Local Storage Only',
              },
              {
                id: 'no-tracking',
                topic: 'No Usage Tracking',
              },
              {
                id: 'your-data',
                topic: 'Your Data is Always Yours',
              },
            ],
          },
          {
            id: 'ai-integration',
            topic: 'AI Integration',
            children: [
              {
                id: 'mcp-support',
                topic: 'MCP Integration',
              },
              {
                id: 'ai-api',
                topic: 'AI API Connections',
              },
              {
                id: 'brainstorming',
                topic: 'Enhanced Brainstorming',
              },
            ],
          },
          {
            id: 'tag-organization',
            topic: 'Tag Organization',
            children: [
              {
                id: 'flexible-tags',
                topic: 'Flexible Tagging System',
              },
              {
                id: 'easy-find',
                topic: 'Effortless Finding',
              },
            ],
          },
          {
            id: 'ad-free',
            topic: 'Ad-Free Experience',
            children: [
              {
                id: 'no-ads',
                topic: 'No Ads',
              },
              {
                id: 'no-distractions',
                topic: 'No Distractions',
              },
              {
                id: 'focus',
                topic: 'Pure Focus',
              },
            ],
          },
        ],
      },
      {
        id: 'technical-features',
        topic: 'Technical Features',
        direction: 1,
        children: [
          {
            id: 'lightweight',
            topic: 'Incredibly Lightweight',
            children: [
              {
                id: 'under-10mb',
                topic: 'Under 10MB',
              },
              {
                id: 'fast-performance',
                topic: 'Lightning-Fast Performance',
              },
            ],
          },
          {
            id: 'data-flow',
            topic: 'Diversified Data Flow',
            children: [
              {
                id: 'import-m10c',
                topic: 'Import from M10C',
              },
              {
                id: 'import-ebook',
                topic: 'Import from eBook',
              },
              {
                id: 'free-export',
                topic: 'Free Export to Multiple Formats',
              },
            ],
          },
          {
            id: 'outline-mode',
            topic: 'Outline Mode',
            children: [
              {
                id: 'rearrange',
                topic: 'Rearrange Thoughts Easily',
              },
              {
                id: 'fresh-perspective',
                topic: 'Fresh Perspective',
              },
            ],
          },
          {
            id: 'ai-content',
            topic: 'AI-Powered Content Creation',
            children: [
              {
                id: 'generate-ideas',
                topic: 'Generate Ideas',
              },
              {
                id: 'auto-update',
                topic: 'Auto Update Mind Map',
              },
              {
                id: 'suggest-pathways',
                topic: 'Suggest New Pathways',
              },
            ],
          },
        ],
      },
      {
        id: 'platforms',
        topic: 'Cross-Platform',
        direction: 1,
        children: [
          {
            id: 'windows',
            topic: 'Windows 10+',
          },
          {
            id: 'macos',
            topic: 'macOS 10.15+',
          },
          {
            id: 'linux',
            topic: 'Linux (Ubuntu, Debian, Fedora)',
          },
        ],
      },
      {
        id: 'pricing',
        topic: 'Pricing Plans',
        direction: 0,
        children: [
          {
            id: 'free-plan',
            topic: 'Free',
            children: [
              {
                id: 'free-private',
                topic: '100% Private Storage',
              },
              {
                id: 'free-outline',
                topic: 'Outline Mode',
              },
              {
                id: 'free-export',
                topic: 'All Export Formats',
              },
              {
                id: 'free-ai',
                topic: 'AI Content Generation',
              },
            ],
          },
          {
            id: 'annual-plan',
            topic: 'Annual',
            children: [
              {
                id: 'annual-unlimited',
                topic: 'Unlimited Mind Maps',
              },
              {
                id: 'annual-watermark',
                topic: 'Watermark-Free Export',
              },
            ],
          },
          {
            id: 'lifetime-plan',
            topic: 'Lifetime',
            children: [
              {
                id: 'lifetime-support',
                topic: 'Priority Customer Support',
              },
              {
                id: 'lifetime-updates',
                topic: 'Pay Once, Updates Forever',
              },
            ],
          },
        ],
      },
    ],
  },
}
