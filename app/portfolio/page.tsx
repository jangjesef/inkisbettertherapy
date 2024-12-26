// Toto je server komponenta
import { MainNav } from "@/components/navigation/main-nav";
import { getInstagramFeed } from "@/lib/instagram";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";

export default async function PortfolioPage() {
  const posts = await getInstagramFeed();

  return (
    <main className="min-h-screen bg-neutral-100">
      <MainNav />
      
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="w-full bg-black rounded-3xl p-16 mb-8">
          <div className="text-white text-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-right">
              Portfolio
            </h1>
          </div>
        </div>

        <PortfolioGrid initialPosts={posts} />
      </div>
    </main>
  );
} 