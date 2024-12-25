import { MainNav } from "@/components/navigation/main-nav";
import Image from "next/image";

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-neutral-100">
      <MainNav />
      
      {/* Main content */}
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Header section */}
        <div className="w-full bg-black rounded-3xl p-16 mb-8">
          <div className="text-white text-right">
            <h1 className="text-7xl font-medium">
              Studio
            </h1>
          </div>
        </div>

        {/* Studio info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column - Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8">
              <h2 className="text-3xl font-medium mb-4">About the Studio</h2>
              <p className="text-lg text-gray-600 mb-4">
                Ink is Better than Therapy is a modern tattoo studio focused on a unique and personal approach to each client. Our work is more than just tattooing - it's a form of therapy and self-expression.
              </p>
              <p className="text-lg text-gray-600">
                We maintain the highest hygiene standards and use only quality materials and equipment.
              </p>
            </div>

            <div className="bg-yellow-300 rounded-3xl p-8">
              <h2 className="text-3xl font-medium mb-4">Opening Hours</h2>
              <div className="space-y-2 text-lg">
                <p>Monday - Friday: 10:00 - 18:00</p>
                <p>Saturday: By appointment</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="bg-red-500 rounded-3xl p-8 text-white">
              <h2 className="text-3xl font-medium mb-4">Contact</h2>
              <div className="space-y-2 text-lg">
                <p>Email: info@inkisbetter.cz</p>
                <p>Tel: +420 732 500 314</p>
                <p>Address: Mášova 8, Brno</p>
              </div>
            </div>
          </div>

          {/* Right column - Images */}
          <div className="space-y-8">
            <div className="aspect-[4/3] relative rounded-3xl overflow-hidden">
              <Image
                src="/images/studio-1.jpg"
                alt="Studio interior"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="aspect-square relative rounded-3xl overflow-hidden">
                <Image
                  src="/images/studio-2.jpg"
                  alt="Studio detail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square relative rounded-3xl overflow-hidden">
                <Image
                  src="/images/studio-3.jpg"
                  alt="Studio equipment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 