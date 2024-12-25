import { getInstagramPosts } from '@/lib/instagram'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Zde byste měli implementovat získání tokenu z vaší databáze
    const token = process.env.INSTAGRAM_ACCESS_TOKEN
    
    if (!token) {
      return NextResponse.json(
        { error: 'Instagram token not configured' },
        { status: 500 }
      )
    }

    const posts = await getInstagramPosts(token)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching Instagram posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Instagram posts' },
      { status: 500 }
    )
  }
} 