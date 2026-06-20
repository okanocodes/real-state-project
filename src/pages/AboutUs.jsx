import { ABOUT_DATA } from "../mocks/aboutMock";

export default function AboutUs() {
  return (
    <main className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-700 px-10 py-14">
        <span className="inline-block text-xs font-extrabold uppercase tracking-[0.25em] text-yellow-400 mb-4">
          {ABOUT_DATA.subtitle}
        </span>

        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          {ABOUT_DATA.title}
        </h1>
      </div>

      <div className="px-10 py-10">
        <div className="max-w-4xl mb-10">
          <p className="text-slate-600 text-base leading-8 mb-4">
            {ABOUT_DATA.text1}
          </p>

          <p className="text-slate-600 text-base leading-8">
            {ABOUT_DATA.text2}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ABOUT_DATA.values.map((val) => (
            <div
              key={val.title}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-indigo-50 transition-all duration-300"
            >
              <div className="w-11 h-11 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-black mb-5">
                ✦
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-3">
                {val.title}
              </h3>

              <p className="text-sm text-slate-600 leading-7">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}