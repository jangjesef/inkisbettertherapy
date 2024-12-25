import { MainNav } from "@/components/navigation/main-nav";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-100">
      <MainNav />
      
      {/* Main content */}
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Header section */}
        <div className="w-full bg-black rounded-3xl p-16 mb-8">
          <div className="text-white text-right">
            <h1 className="text-7xl font-medium">
              Contact
            </h1>
          </div>
        </div>

        {/* Contact content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column - Contact info */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8">
              <h2 className="text-3xl font-medium mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-black rounded-full p-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-lg">+420 732 500 314</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-black rounded-full p-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg">info@inkisbetter.cz</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-black rounded-full p-3">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-lg">Mášova 8</p>
                    <p className="text-lg">Brno</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-black rounded-full p-3">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Artist</p>
                    <p className="text-lg font-medium">Gabriela Gajdošová</p>
                    <a 
                      href="https://instagram.com/ink_is_better_than_therapy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg hover:underline block"
                    >
                      @ink_is_better_than_therapy
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-300 rounded-3xl p-8">
              <h2 className="text-3xl font-medium mb-4">Opening Hours</h2>
              <div className="space-y-2 text-lg">
                <p>Monday - Friday: 10:00 - 18:00</p>
                <p>Saturday: By appointment</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Right column - Contact form */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-3xl font-medium mb-6">Write to Us</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black min-h-[150px]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 