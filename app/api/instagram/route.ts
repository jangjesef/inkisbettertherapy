import { getInstagramFeed } from '@/lib/instagram'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const posts = await getInstagramFeed()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error in Instagram API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Instagram feed' },
      { status: 500 }
    )
  }
} 