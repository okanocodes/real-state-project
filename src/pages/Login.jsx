import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function Login({ setView }) {
  const { login, error } = useUser();
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('12345');

  const handleSubmit = (event) => {
    event.preventDefault();

    const success = login({ email, password });
    if (success) {
      setView('home');
    }
  };

  return (
    <main className="w-full max-w-5xl mx-auto">
      <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-700 p-10 md:p-14 text-white flex flex-col justify-between min-h-[520px]">
            <div>
              <span className="inline-block text-xs font-black uppercase tracking-[0.25em] text-yellow-400 mb-5">
                Hoş Geldiniz
              </span>


              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                Hesabınıza giriş yapın
              </h1>


              <p className="mt-5 text-slate-300 leading-7 max-w-md">
                Favori ilanlarınızı görüntülemek, mesaj göndermek ve ilan
                işlemlerinizi takip etmek için hesabınıza giriş yapabilirsiniz.
              </p>
            </div>


          </div>


          <div className="p-8 md:p-12 flex items-center">
            <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
              <div>
                <h2 className="text-3xl font-black text-slate-900">
                  Giriş Yap
                </h2>


                <p className="mt-2 text-sm text-slate-500">
                  Devam etmek için bilgilerinizi giriniz.
                </p>
              </div>


              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">
                  E-posta
                </label>


                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@admin.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>


              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">
                  Şifre
                </label>


                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrenizi giriniz"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>


              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-indigo-600"
                  />
                  Beni hatırla
                </label>


                <button
                  type="button"
                  className="text-sm font-bold text-indigo-600 hover:text-indigo-500"
                >
                  Şifremi unuttum
                </button>
              </div>

              {error && (
                <p className="text-sm text-rose-600 font-semibold">
                  {error}
                </p>
              )}


              <button
                type="submit"
                className="w-full px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black transition-colors shadow-md"
              >
                Giriş Yap
              </button>


              <button
                type="button"
                onClick={() => setView('home')}
                className="w-full px-6 py-3 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
              >
                Ana Sayfaya Dön
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
