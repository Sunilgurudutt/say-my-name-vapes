import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
      <div className="mb-12">
        <p className="text-violet-500 text-xs tracking-[0.2em] uppercase font-semibold mb-2">
          Our Story
        </p>
        <h1 className="font-display text-[#1c1c1e] text-3xl sm:text-4xl font-bold">
          About <span className="text-violet-600">Say My Name</span>
        </h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl p-8 border border-[#e5e4e2] shadow-sm">
          <h2 className="text-xl font-bold text-violet-600 mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            Say My Name Vapes is a premium vape store located inside Mavis KFF Convenience in Mississauga.
            We stock only the best e-liquids, devices, and accessories — chosen to give every customer
            an exceptional experience.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 border border-[#e5e4e2] shadow-sm">
          <h2 className="text-xl font-bold text-violet-600 mb-4">What We Carry</h2>
          <p className="text-gray-600 leading-relaxed">
            Our shelves are stocked with the latest Flavour Beast, Elfbar, Zpods, and more.
            Whether you&apos;re looking for a disposable, a pod system, or replacement accessories,
            we&apos;ve got you covered.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 border border-[#e5e4e2] shadow-sm">
          <h2 className="text-xl font-bold text-violet-600 mb-4">Come Visit Us</h2>
          <p className="text-gray-600 leading-relaxed">
            We&apos;re open seven days a week. Come in, browse our full range, and get
            honest advice from people who genuinely know their products.
            735 Twain Ave Unit #3, Mississauga — inside Mavis KFF Convenience.
          </p>
        </div>
      </div>
    </div>
  );
}
