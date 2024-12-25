import { MainNav } from "@/components/navigation/main-nav";
import Script from "next/script";

export default function PortfolioPage() {
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
          {/* Row 1 */}
          <div className="bg-yellow-300 rounded-3xl p-8 hover:scale-[1.02] transition-transform">
            <blockquote 
              className="instagram-media" 
              data-instgrm-captioned 
              data-instgrm-permalink="https://www.instagram.com/p/DD4m5SNKi91/?utm_source=ig_embed&amp;utm_campaign=loading" 
              data-instgrm-version="14" 
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: 'none',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '99.375%'
              }}
            ></blockquote>
          </div>

          <div className="bg-red-500 rounded-3xl p-8 hover:scale-[1.02] transition-transform">
            <blockquote 
              className="instagram-media" 
              data-instgrm-captioned 
              data-instgrm-permalink="https://www.instagram.com/p/DD2mDz6KQaP/?utm_source=ig_embed&amp;utm_campaign=loading" 
              data-instgrm-version="14" 
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: 'none',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '99.375%'
              }}
            ></blockquote>
          </div>

          {/* Row 2 */}
          <div className="bg-blue-400 rounded-3xl p-8 hover:scale-[1.02] transition-transform">
            <blockquote 
              className="instagram-media" 
              data-instgrm-captioned 
              data-instgrm-permalink="https://www.instagram.com/p/DDsIsipqBL-/?utm_source=ig_embed&amp;utm_campaign=loading" 
              data-instgrm-version="14" 
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: 'none',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '99.375%'
              }}
            ></blockquote>
          </div>

          <div className="bg-purple-400 rounded-3xl p-8 hover:scale-[1.02] transition-transform">
            <blockquote 
              className="instagram-media" 
              data-instgrm-captioned 
              data-instgrm-permalink="https://www.instagram.com/p/DDm4h4nKm4o/?utm_source=ig_embed&amp;utm_campaign=loading" 
              data-instgrm-version="14" 
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: 'none',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '99.375%'
              }}
            ></blockquote>
          </div>

          {/* Row 3 */}
          <div className="bg-green-400 rounded-3xl p-8 hover:scale-[1.02] transition-transform">
            <blockquote 
              className="instagram-media" 
              data-instgrm-captioned 
              data-instgrm-permalink="https://www.instagram.com/p/DATHDw0qtTL/?utm_source=ig_embed&amp;utm_campaign=loading" 
              data-instgrm-version="14" 
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: 'none',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '99.375%'
              }}
            ></blockquote>
          </div>

          <div className="bg-orange-400 rounded-3xl p-8 hover:scale-[1.02] transition-transform">
            <blockquote 
              className="instagram-media" 
              data-instgrm-captioned 
              data-instgrm-permalink="https://www.instagram.com/p/C_sVXk6KVCy/?utm_source=ig_embed&amp;utm_campaign=loading" 
              data-instgrm-version="14" 
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: 'none',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '99.375%'
              }}
            ></blockquote>
          </div>

          {/* Row 4 */}
          <div className="bg-pink-400 rounded-3xl p-8 hover:scale-[1.02] transition-transform">
            <blockquote 
              className="instagram-media" 
              data-instgrm-captioned 
              data-instgrm-permalink="https://www.instagram.com/p/C-f1ghUqQtt/?utm_source=ig_embed&amp;utm_campaign=loading" 
              data-instgrm-version="14" 
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: 'none',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '99.375%'
              }}
            ></blockquote>
          </div>

          <div className="bg-indigo-400 rounded-3xl p-8 hover:scale-[1.02] transition-transform">
            <blockquote 
              className="instagram-media" 
              data-instgrm-captioned 
              data-instgrm-permalink="https://www.instagram.com/p/C9NULZ5qUPN/?utm_source=ig_embed&amp;utm_campaign=loading" 
              data-instgrm-version="14" 
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: 'none',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '99.375%'
              }}
            ></blockquote>
          </div>
        </div>
      </div>

      {/* Instagram embed script */}
      <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
    </main>
  );
} 