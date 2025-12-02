import './style.css'

document.querySelector('#app').innerHTML = `
  <main class="min-h-screen flex items-center justify-center bg-slate-900">
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-emerald-400">
        Tailwind 4 funcionando 🚀
      </h1>
      <p class="text-slate-300">
        Si ves fondo oscuro y este texto centrado, todo está bien configurado.
      </p>
      <button
        class="px-4 py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition"
      >
        Botón Tailwind
      </button>
    </div>
  </main>
`

