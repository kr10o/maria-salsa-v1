import { component$, useStore, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { useTranslate } from 'qwik-speak';

interface CartItem {
  id: string;
  qty: number;
  price: number;
  translationKey: string;
  image: string;
}

export default component$(() => {
  const t = useTranslate();
  
  const state = useStore({
    isMobileMenuOpen: false,
    isCartOpen: false,
    cart: [] as CartItem[],
    darkMode: false,
    isScrolled: false
  });

  useVisibleTask$(() => {
    // Dark mode
    state.darkMode = localStorage.getItem('darkMode') === 'true' || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('darkMode') === null);
    if (state.darkMode) document.documentElement.classList.add('dark');

    // Scroll
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          state.isScrolled = window.scrollY > 30;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Scroll reveal
    const obs = new IntersectionObserver((entries) => { 
      entries.forEach(e => { 
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } 
      }); 
    }, { threshold: 0.08 });
    setTimeout(() => { document.querySelectorAll('.reveal').forEach(el => obs.observe(el)); }, 100);

    return () => window.removeEventListener('scroll', onScroll);
  });

  const toggleDarkMode = $(() => {
    state.darkMode = !state.darkMode;
    localStorage.setItem('darkMode', state.darkMode.toString());
    if (state.darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  });

  const scrollToSection = $((id: string) => {
    state.isMobileMenuOpen = false;
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  });

  const cartTotal = state.cart.reduce((s: number, i: CartItem) => s + (i.price * i.qty), 0).toFixed(2);
  const cartCount = state.cart.reduce((a: number, i: CartItem) => a + i.qty, 0);

  return (
    <>
      {/* NAV */}
      <nav class={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${state.isScrolled ? 'py-2' : 'py-3'}`} style="background:color-mix(in srgb, var(--color-surface) 85%, transparent);backdrop-filter:blur(16px);box-shadow:0 4px 16px var(--shadow-mid-color),0 -1px 0 var(--shadow-light-color);">
        <div class="max-w-5xl mx-auto px-4 flex items-center justify-between relative">
          <div class="font-display text-2xl font-black uppercase cursor-pointer text-ink tracking-tight select-none">
            La<span class="text-coral">Maria</span>.
          </div>

          <div class="hidden md:flex items-center gap-6">
            <button onClick$={() => scrollToSection('flavors')} class="font-display text-sm font-bold uppercase tracking-wide text-ink hover:text-coral transition-colors cursor-pointer bg-transparent border-none">
              Flavors
            </button>
            <button onClick$={() => scrollToSection('story')} class="font-display text-sm font-bold uppercase tracking-wide text-ink hover:text-coral transition-colors cursor-pointer bg-transparent border-none">
              Story
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button onClick$={toggleDarkMode} class="neo-sm rounded-xl p-2.5 bg-surface hover:text-coral transition-colors">
              Toggle
            </button>
            <button onClick$={() => { state.isCartOpen = true; state.isMobileMenuOpen = false; }} class="neo-sm rounded-xl p-2.5 relative bg-surface hover:text-coral transition-colors">
              Cart
              {cartCount > 0 && <span class="absolute -top-1 -right-1 w-5 h-5 bg-coral text-white text-xs font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick$={() => state.isMobileMenuOpen = !state.isMobileMenuOpen} class="md:hidden neo-sm rounded-xl p-2.5 bg-surface">
              Menu
            </button>
          </div>
        </div>
      </nav>

      <main style="padding-top:4.5rem;">
        {/* HERO */}
        <section id="home" class="min-h-[75vh] md:h-[1080px] flex items-center justify-center pt-[100px] pb-24 md:pt-[140px] md:pb-32 relative overflow-hidden" style="perspective: 1000px;">
          <div class="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative" style="z-index: 10;">
            <div class="reveal w-full max-w-4xl mx-auto px-4 mt-12 md:mt-0">
              <h1 class="font-display font-black uppercase leading-[0.85] mb-10 md:mb-12" style="font-size:clamp(3rem, 10vw, 9rem); letter-spacing: -0.02em;">
                <span class="text-ink drop-shadow-sm" style="display:inline-block;">{t('hero.title_start')}</span>
                <span class="text-ink drop-shadow-sm ml-2 md:ml-4" style="display:inline-block;">{t('hero.title_mid')}</span><br/>
                <span class="text-[#B52B20] drop-shadow-md" style="display:inline-block;">{t('hero.title_end')}</span>
              </h1>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div class="-mt-28 md:-mt-20 z-20 relative animate-kickflip" style="animation-delay: 1.1s;">
          <div class="py-6 md:py-8 overflow-hidden shadow-2xl" style="background:linear-gradient(135deg,#e8553e,#c43e2a);transform:rotate(1.2deg) scale(1.05) translateZ(0);">
            <div class="flex whitespace-nowrap font-display text-white font-black uppercase tracking-widest text-2xl md:text-4xl italic animate-marquee" style="width:max-content;">
              <span class="pr-12 md:pr-16">Artisanal • Spicy • Crunchy • Mexican • Handmade •</span>
              <span class="pr-12 md:pr-16">Artisanal • Spicy • Crunchy • Mexican • Handmade •</span>
            </div>
          </div>
        </div>

        {/* STORY BENTO */}
        <section id="story" class="section-pad">
          <div class="max-w-5xl mx-auto px-4">
            <div class="reveal grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-6 auto-rows-[minmax(200px,auto)] md:auto-rows-[113px] lg:auto-rows-[113px]">
              
              <div class="neo rounded-3xl p-8 md:col-span-2 md:row-span-2 flex flex-col justify-center relative overflow-hidden group">
                <h2 class="font-display font-black uppercase text-4xl md:text-5xl text-ink leading-tight z-10">
                  MEXICO BORN.
                </h2>
                <div class="absolute -right-8 -bottom-10 text-coral/5 font-display font-black text-[12rem] leading-none tracking-tighter group-hover:scale-110 transition-transform duration-500">
                  MX
                </div>
              </div>

              <div class="neo rounded-3xl p-8 md:col-span-1 md:row-span-4 flex flex-col justify-between group overflow-hidden relative">
                <h2 class="font-display font-black uppercase text-4xl md:text-5xl text-coral leading-tight z-10">
                  CROATIA MADE.
                </h2>
                <div class="absolute -left-10 -bottom-10 text-ink/5 font-display font-black text-[12rem] leading-none tracking-tighter group-hover:scale-110 transition-transform duration-500">
                  HR
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
});
