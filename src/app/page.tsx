import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#591013] flex items-center justify-center select-none">
      {/* 
        Container com proporção estrita 1671 / 941 (16:9 estendido) da arte original.
        Ocupa o máximo possível de largura ou altura sem distorcer ou cortar elementos.
      */}
      <div className="relative w-full h-full max-w-[calc(100vh*1671/941)] max-h-[calc(100vw*941/1671)] aspect-[1671/941] shadow-2xl">
        {/* Arte institucional completa com alta fidelidade */}
        <Image
          src="/img/bg_pesquisaok.png"
          alt="Pesquisa Institucional COMIEADEPA"
          fill
          priority
          sizes="100vw"
          className="object-contain pointer-events-none"
        />

        {/* 
          Botão HTML 'INICIAR PESQUISA':
          Posicionado com exatidão no centro da área livre (entre 63.8% e 77.8%, centro matemático em ~70.8%),
          abaixo de todo o texto de apresentação e acima dos três indicadores inferiores.
        */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[70.8%] -translate-y-1/2 z-20 w-[90%] sm:w-[60%] md:w-[48%] max-w-[430px] flex justify-center">
          <Link
            href="/pesquisa"
            className="group relative inline-flex items-center justify-center w-full py-4 sm:py-4.5 md:py-5 px-6 sm:px-8 text-base sm:text-lg md:text-xl font-extrabold tracking-wider text-white uppercase rounded-2xl sm:rounded-3xl shadow-xl transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.98] border border-amber-300/30 overflow-hidden text-center cursor-pointer bg-gradient-to-r from-[#6b0814] via-[#850b1d] to-[#54040e] hover:from-[#7c0a1a] hover:via-[#9c0d22] hover:to-[#630510] shadow-rose-950/60 hover:shadow-rose-950/80"
          >
            {/* Brilho sutil no hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            
            <span className="relative z-10 drop-shadow-sm flex items-center justify-center gap-2">
              INICIAR PESQUISA
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
