import { getInstagramFeed } from '@/lib/instagram'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const posts = await getInstagramFeed()
    
    return new NextResponse(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Error in Instagram API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Instagram feed' },
      { status: 500 }
    )
  }
} 