import { CONTACT_DATA } from "../mocks/contactMock.js";

export default function Contact() {
  return (
    <main className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-700 px-10 py-14">
        <span className="inline-block text-xs font-extrabold uppercase tracking-[0.25em] text-yellow-400 mb-4">
          {CONTACT_DATA.subtitle}
        </span>

        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          {CONTACT_DATA.title}
        </h1>

        <p className="mt-5 max-w-2xl text-slate-300 leading-7">
          {CONTACT_DATA.description}
        </p>
      </div>

      <div className="px-10 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-5">
            İletişim Bilgileri
          </h2>

          <div className="space-y-4">
            {CONTACT_DATA.info.map((item) => (
              <div
                key={item.title}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:bg-blue-50 transition-all"
              >
                <h3 className="text-sm font-black text-slate-900 mb-1">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <form className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-slate-900 mb-5">
            Mesaj Gönder
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Adınız"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <input
              type="text"
              placeholder="Konu"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <textarea
              placeholder="Mesajınız"
              rows="5"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            ></textarea>

            <button
              type="button"
              className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-xl transition-all shadow-md hover:-translate-y-0.5"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
