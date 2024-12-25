import { MainNav } from "@/components/navigation/main-nav";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-100">
      <MainNav />
      
      {/* Main content */}
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Header section */}
        <div className="w-full bg-black rounded-3xl p-16 mb-8">
          <div className="text-white text-right">
            <h1 className="text-7xl font-medium">
              About
            </h1>
          </div>
        </div>

        {/* About content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column - Text */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8">
              <h2 className="text-3xl font-medium mb-4">Our Philosophy</h2>
              <p className="text-lg text-gray-600 mb-4">
                We believe that tattooing is more than just art on skin. It's a form of self-expression, therapy, and transformation. Each tattoo tells a story, and we're here to help you tell yours.
              </p>
              <p className="text-lg text-gray-600">
                Our goal is to create unique tattoos that are not only visually striking but also personally meaningful to each client.
              </p>
            </div>

            <div className="bg-purple-400 rounded-3xl p-8 text-white">
              <h2 className="text-3xl font-medium mb-4">Gabriela Gajdošová</h2>
              <p className="text-lg mb-4">
                As an artist, I specialize in creating unique tattoos that reflect the personality and story of each client. My aim is not just to create beautiful tattoos, but to provide a pleasant and therapeutic experience.
              </p>
              <p className="text-lg">
                Each tattoo is an opportunity to help you express your thoughts, feelings, and memories through art on skin.
              </p>
            </div>

            <div className="bg-blue-400 rounded-3xl p-8 text-white">
              <h2 className="text-3xl font-medium mb-4">Our Approach</h2>
              <ul className="space-y-4 text-lg">
                <li>• Individual consultation with each client</li>
                <li>• Emphasis on detail and precision</li>
                <li>• Respect for your ideas and wishes</li>
                <li>• Professional and friendly approach</li>
                <li>• Safe and sterile environment</li>
              </ul>
            </div>

            <div className="bg-purple-400 rounded-3xl p-8 text-white">
              <h2 className="text-3xl font-medium mb-4">Specialization</h2>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div>
                  <p>• Minimalistic</p>
                  <p>• Geometric</p>
                  <p>• Blackwork</p>
                </div>
                <div>
                  <p>• Single needle</p>
                  <p>• Dotwork</p>
                  <p>• Custom design</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Images */}
          <div className="space-y-8">
            <div className="aspect-[3/4] relative rounded-3xl overflow-hidden">
              <Image
                src="/images/gabriela_tatuje.jpg"
                alt="Gabriela tattooing"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-yellow-300 rounded-3xl p-8">
              <h2 className="text-3xl font-medium mb-4">Process</h2>
              <ol className="space-y-4 text-lg">
                <li>1. Initial consultation and design</li>
                <li>2. Final design preparation</li>
                <li>3. Tattooing session</li>
                <li>4. Aftercare and follow-up</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 