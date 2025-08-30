import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-2 bg-[url('/bgImg.png')] bg-cover bg-center text-white min-h-screen flex flex-col items-center">
        <header className="fixed top-2 z-50 max-w-7xl bg-white/20 border rounded-xl border-white/30 container mx-auto px-6 py-4 flex justify-between items-center">
          <img src="/logo-withoutBg.png" className="h-8"></img>
          <nav className="space-x-4">
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Sign Up
            </Link>
          </nav>
        </header>
        <main className="flex-grow flex items-center">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              The Future of <span className="text-green-400">Green Energy</span>, Mapped.
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Valence is a cutting-edge platform providing data-driven intelligence to map, analyze, and optimize green hydrogen infrastructure.
            </p>
            <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
              Get Started for Free
            </Link>
          </div>
        </main>
      </div>


      <section className="py-16 px-6 mx-auto text-center flex flex-col items-center w-full bg-gradient-to-b from-[#2D4323] to-[#192313]">
        <div className="bg-white/10 py-8 border border-white/30 rounded-xl flex flex-col items-center">
        <h2 className="text-3xl font-bold text-green-600">💡 Problem</h2>
        <p className="mt-4 text-lg max-w-5xl px-4">
          The hydrogen economy is growing rapidly, but poor infrastructure planning can lead
          to redundant investments, high costs, and missed opportunities. Decision-makers
          lack a unified visualization and optimization tool.
        </p>
        </div>
      </section>
      <section className="bg-cover bg-center py-8 px-6 text-center flex flex-col items-center bg-gradient-to-b from-[#192313] to-[#121A0E] ">
        <div className="bg-white/10 py-8 border border-white/30 rounded-xl flex flex-col items-center">
        <h2 className="text-3xl font-bold text-green-600">✅ Solution</h2>
        <p className="mt-4 text-lg max-w-5xl px-4 mx-auto">
          An interactive map-based tool that visualizes green hydrogen infrastructure and
          recommends optimal site selection for future projects using renewable data, demand
          centers, and logistics insights.
        </p>
        </div>
      </section>
      <section className="mx-auto w-full bg-gradient-to-b from-[#121A0E] to-[#2D4323]">
        <div className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-600">🔑 Features</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
          <div className="p-6 bg-white/10 border border-white/30 rounded-xl shadow hover:shadow-lg">
            🌍 <h3 className="font-semibold text-lg mt-2">Interactive GIS Map</h3>
            <p className="text-sm mt-2">
              Visualize plants, pipelines, storage, and transport hubs.
            </p>
          </div>
          <div className="p-6 bg-white/10 border border-white/30 rounded-xl shadow hover:shadow-lg">
            📊 <h3 className="font-semibold text-lg mt-2">Data-Driven Optimization</h3>
            <p className="text-sm mt-2">
              AI/ML backend suggests best new project locations.
            </p>
          </div>
          <div className="p-6 bg-white/10 border border-white/30 rounded-xl shadow hover:shadow-lg">
            ⚡ <h3 className="font-semibold text-lg mt-2">Real-Time Insights</h3>
            <p className="text-sm mt-2">
              Layer renewable energy potential, demand, and logistics.
            </p>
          </div>
          <div className="p-6 bg-white/10 border border-white/30 rounded-xl shadow hover:shadow-lg">
            🔐 <h3 className="font-semibold text-lg mt-2">Collaboration Ready</h3>
            <p className="text-sm mt-2">
              Share insights with planners, stakeholders, and policymakers.
            </p>
          </div>
        </div>
        </div>
      </section>
      <section className="py-16 px-6 text-center bg-gradient-to-b from-[#2D4323] to-[#192313]">
        <h2 className="text-3xl font-bold text-green-600">👥 Users</h2>
        <p className="mt-4">Our platform is designed for</p>
        <ul className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          <li className="p-6 bg-white/10 border border-white/30 rounded-xl shadow hover:shadow-lg">Urban & Regional Planners</li>
          <li className="p-6 bg-white/10 border border-white/30 rounded-xl shadow hover:shadow-lg">Energy Companies & Investors</li>
          <li className="p-6 bg-white/10 border border-white/30 rounded-xl shadow hover:shadow-lg">Policy Analysts & Regulators</li>
          <li className="p-6 bg-white/10 border border-white/30 rounded-xl shadow hover:shadow-lg">Project Developers</li>
        </ul>
      </section>
      <section className="w-full mx-auto bg-gradient-to-b from-[#192313] to-[#121A0E]">
        <div className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-600">🌍 Impact</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-center">
          <div className="p-6 bg-white/10 border border-white/30 rounded-xl shadow hover:shadow-lg">
            💰 <p className="font-semibold">Directs capital to high-yield projects</p>
          </div>
          <div className="p-6 bg-white/10 border border-white/30 rounded-xl shadow hover:shadow-lg">
            🏭 <p className="font-semibold">Prevents redundant investments & saves land</p>
          </div>
          <div className="p-6 bg-white/10 border border-white/30 rounded-xl shadow hover:shadow-lg">
            🌱 <p className="font-semibold">Accelerates Net Zero hydrogen adoption</p>
          </div>
          <div className="p-6 bg-white/10 border border-white/30 rounded-xl shadow hover:shadow-lg">
            🤝 <p className="font-semibold">Enables smarter collaboration</p>
          </div>
        </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold">🚀 Join the Green Energy Revolution</h2>
        <p className="mt-4 text-lg">
          Try the demo today and help build a sustainable hydrogen future.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-white text-green-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100">
            Try Demo
          </button>
          <button className="bg-transparent border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-green-700">
            Contact Us
          </button>
        </div>
      </section>


      <footer className="container bg-[#192313] mx-auto px-6 py-8 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} Valence. All Rights Reserved.
      </footer>
    </div>
  );
}