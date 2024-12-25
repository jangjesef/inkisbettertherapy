import { InstagramFeed } from '@/components/instagram-feed'

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Ink is Better Than Therapy
      </h1>
      <InstagramFeed />
    </main>
  )
}

