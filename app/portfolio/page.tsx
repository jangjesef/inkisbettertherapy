import { MainNav } from "@/components/navigation/main-nav";
import { PostCarousel } from "@/components/instagram/post-carousel";
import { getInstagramFeed } from "@/lib/instagram";
import { formatDate } from "@/lib/utils";
import { Heart, MessageCircle, Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CARD_COLORS = [
  'bg-yellow-300',
  'bg-red-500',
  'bg-blue-400',
  'bg-purple-400',
  'bg-green-400',
  'bg-orange-400',
  'bg-pink-400',
  'bg-indigo-400',
];

export default async function PortfolioPage() {
  const posts = await getInstagramFeed();

  return (
    <main className="min-h-screen bg-neutral-100">
      <MainNav />
      
      {/* Main content */}
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Header section */}
        <div className="w-full bg-black rounded-3xl p-16 mb-8">
          <div className="text-white text-right">
            <h1 className="text-7xl font-medium">
              Portfolio
            </h1>
          </div>
        </div>

        {/* Instagram grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${CARD_COLORS[index % CARD_COLORS.length]} rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform`}
            >
              <div className="p-8">
                {post.media_type === 'CAROUSEL_ALBUM' && post.children ? (
                  <PostCarousel
                    media_url={post.media_url}
                    children_media={post.children.data}
                    caption={post.caption}
                  />
                ) : (
                  <div className="aspect-video relative rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={post.media_url}
                      alt={post.caption || "Instagram post"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="space-y-4">
                  {post.caption && (
                    <p className="text-lg text-white line-clamp-3">{post.caption}</p>
                  )}
                  <div className="flex items-center justify-between text-white/90">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 fill-current" />
                        <span>{post.like_count}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments_count}</span>
                      </div>
                      {post.media_type === 'CAROUSEL_ALBUM' && (
                        <div className="flex items-center gap-2">
                          <Images className="w-5 h-5" />
                          <span>{post.children?.data.length}</span>
                        </div>
                      )}
                    </div>
                    <time className="text-sm">{formatDate(post.timestamp)}</time>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 