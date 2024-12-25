import { NextResponse } from 'next/server'
import { getInstagramPosts } from '@/lib/instagram'

export async function GET() {
  try {
    // Zde by měl být uložený token z autentizace
    const token = process.env.INSTAGRAM_ACCESS_TOKEN
    
    if (!token) {
      return NextResponse.json(
        { error: 'Instagram token není nastaven' },
        { status: 401 }
      )
    }

    const posts = await getInstagramPosts(token)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Chyba při načítání Instagram příspěvků:', error)
    return NextResponse.json(
      { error: 'Nepodařilo se načíst příspěvky' },
      { status: 500 }
    )
  }
} 