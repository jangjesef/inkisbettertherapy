import { MainNav } from "@/components/navigation/main-nav";
import { getInstagramFeed } from "@/lib/instagram";
import Script from "next/script";

const CARD_COLORS = [
  "bg-yellow-300", // Coco Tristana
  "bg-red-400",   // Toy Cromado
  "bg-blue-400",  // Minidotstattoo
  "bg-pink-400",  // Nemalex
  "bg-red-400",   // Tipicotattoo
  "bg-green-400", // Jun_tatt
  "bg-yellow-300", // Mister Dot
  "bg-pink-400",  // DidixTatt
];

export default async function HomePage() {
  const posts = await getInstagramFeed();
  const latestPosts = posts.slice(0, 8);

  return (
    <main className="bg-neutral-100">
      <MainNav />
      
      {/* Latest Artists Section */}
      <section>
        <div className="bg-black text-white py-8 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Latest Works</h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {latestPosts.map((post, index) => (
              <div 
                key={post.id} 
                className={`${CARD_COLORS[index]} rounded-lg p-6 aspect-[4/3] relative overflow-hidden`}
              >
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={post.permalink}
                  data-instgrm-version="14"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="mb-16">
        <div className="bg-black text-white py-8 mb-8">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold">The Art of Tattooing</h2>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg">
                At Ink is Better than Therapy, we believe in creating unique, personalized tattoos that tell your story.
              </p>
              <p className="text-lg">
                Each piece is carefully crafted to reflect your individual style and personality, making your tattoo experience truly special.
              </p>
              <p className="text-lg">
                Book your consultation and let&apos;s create something unique together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
    </main>
  );
}

