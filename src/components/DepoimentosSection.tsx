import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, MessageCircle, Star, Sparkles, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DepoimentosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsGridRef.current) {
        const cards = Array.from(cardsGridRef.current.children);
        gsap.fromTo(
          cards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-depoimentos"
      className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-8 md:px-16 bg-[#F5F1EC] text-[#2C2723]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 text-xs md:text-sm font-sans tracking-[0.3em] uppercase text-[#404040]/70 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#1E1B18]/60" />
            <span>O Que Dizem Nossos Clientes</span>
            <Sparkles className="w-3.5 h-3.5 text-[#1E1B18]/60" />
          </div>
          <h2 className="font-sans font-light text-3xl sm:text-5xl md:text-6xl text-[#1E1B18] tracking-tight">
            Depoimentos <span className="font-serif italic font-normal text-current">&</span> carinho
          </h2>
          <div className="h-[1px] w-24 sm:w-36 bg-[#1E1B18]/30 mx-auto mt-6" />
        </div>

        {/* Testimonials 3-Column Grid */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start"
        >
          {/* Card 1: Trabalho Personalizado */}
          <div className="bg-white/80 backdrop-blur-xs border border-[#1E1B18]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#1E1B18]/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-sans text-xs tracking-wider uppercase text-[#1E1B18]/70">
                    Mensagem de Cliente
                  </span>
                </div>
                <MessageCircle className="w-4 h-4 text-[#1E1B18]/40" />
              </div>
              <div className="space-y-2.5 font-sans text-xs sm:text-sm text-[#2C2723] leading-relaxed">
                <div className="bg-[#E9F0E8] p-3.5 rounded-2xl rounded-tl-xs border border-emerald-900/5 shadow-2xs">
                  "Uma das coisas que eu mais gosto no teu trabalho é o quanto ele é personalizado. Nunca é igual!!! 😮‍💨 a maioria dos fotógrafos que eu conheço têm um padrão de ensaio que nunca muda. É sempre a mesma edição, ambiente, poses, etc etc."
                </div>
                <div className="bg-[#E9F0E8] p-3.5 rounded-2xl rounded-tl-xs border border-emerald-900/5 shadow-2xs">
                  "Mas tu não :,) e uma coisa que eu já fiz várias vezes com as tuas fotos é entrar no perfil dos clientes e ficar 'meu Deusss, o ensaio realmente ficou a cara deles'"
                </div>
                <div className="bg-[#E9F0E8] p-3.5 rounded-2xl rounded-tl-xs border border-emerald-900/5 shadow-2xs">
                  "Tagarelei mas é isso 🤝 fazia um tempo que eu queria te falar, parabéns ✨"
                </div>
              </div>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1E1B18]/5 flex items-center justify-between text-[11px] font-sans text-[#1E1B18]/50 tracking-wider">
              <span>ENSAIO PERSONALIZADO</span>
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> Carinho
              </span>
            </div>
          </div>

          {/* Card 2: Relato Instagram (Dark Card) */}
          <div className="bg-[#1E1B18] text-[#F5F1EC] rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="font-sans text-xs tracking-[0.2em] text-white/70 uppercase">
                  Relato Instagram
                </span>
                <span className="text-xs text-white/40 font-mono">@ianrafaelfotos</span>
              </div>
              <div className="font-serif italic text-sm sm:text-base leading-relaxed text-white/90 space-y-3">
                <p>
                  "Pra vocês saberem um pouquinho mais: achei o{' '}
                  <span className="underline decoration-white/30 text-amber-200">
                    @ianrafaelfotos
                  </span>{' '}
                  pesquisando pelo Instagram por 'fotógrafos em Fortaleza'."
                </p>
                <p>
                  "Cheguei no perfil dele e amei. Achei autêntico, emocional e principalmente: real. Sabe quando você vê a foto e consegue quase que 'sentir o momento'. Foi isso."
                </p>
                <p>
                  "O Ian foi sensacional com a gente, desde o primeiro contato. Nos recebeu super bem, escolheu o local das fotos, cuidou de tudo em cada detalhe pra que fosse especial."
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                ))}
              </div>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50">
                Fortaleza, CE
              </span>
            </div>
          </div>

          {/* Card 3: IAN DO CÉU / Prévias */}
          <div className="bg-white/80 backdrop-blur-xs border border-[#1E1B18]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#1E1B18]/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-sans text-xs tracking-wider uppercase text-[#1E1B18]/70">
                    WhatsApp • 09:02
                  </span>
                </div>
                <MessageCircle className="w-4 h-4 text-[#1E1B18]/40" />
              </div>
              <div className="space-y-2.5 font-sans text-xs sm:text-sm text-[#2C2723]">
                <div className="bg-[#E9F0E8] p-3.5 rounded-2xl rounded-tl-xs border border-emerald-900/5 shadow-2xs">
                  "IAN DO CÉU, você é incrível, viu? Muito obrigada pela atenção, cuidado... Seu trabalho é impecável. Todo sucesso do mundo para você!"
                </div>
                <div className="bg-[#E9F0E8] p-3.5 rounded-2xl rounded-tl-xs border border-emerald-900/5 shadow-2xs flex items-center justify-between">
                  <span>"Sua energia é maravilhosa 🤍"</span>
                  <span className="text-[10px] text-gray-500 font-mono">09:02</span>
                </div>
                <div className="bg-[#E9F0E8] p-3.5 rounded-2xl rounded-tl-xs border border-emerald-900/5 shadow-2xs flex items-center justify-between">
                  <span>"Só com as prévias eu já pirei."</span>
                  <span className="text-[10px] text-gray-500 font-mono">09:03</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1E1B18]/5 flex items-center justify-between text-[11px] font-sans text-[#1E1B18]/50 tracking-wider">
              <span>PRÉVIAS DO ENSAIO</span>
              <span className="text-emerald-700 font-medium">100% Impecável</span>
            </div>
          </div>

          {/* Card 4: Sensibilidade */}
          <div className="bg-white/80 backdrop-blur-xs border border-[#1E1B18]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#1E1B18]/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-sans text-xs tracking-wider uppercase text-[#1E1B18]/70">
                    WhatsApp • 14:40
                  </span>
                </div>
                <MessageCircle className="w-4 h-4 text-[#1E1B18]/40" />
              </div>
              <div className="space-y-2 font-sans text-xs sm:text-sm text-[#2C2723]">
                <div className="bg-[#E9F0E8] p-3 rounded-xl rounded-tl-xs border border-emerald-900/5">
                  "Que coisa linda, Ian. 14:40"
                </div>
                <div className="bg-[#E9F0E8] p-3 rounded-xl rounded-tl-xs border border-emerald-900/5">
                  "Você tem uma sensibilidade, nossa. ✨ 🥺"
                </div>
                <div className="bg-[#E9F0E8] p-3 rounded-xl rounded-tl-xs border border-emerald-900/5">
                  "A cada foto eu tenho certeza que escolhi o melhor profissional."
                </div>
                <div className="bg-[#E9F0E8] p-3 rounded-xl rounded-tl-xs border border-emerald-900/5">
                  "Muito obrigada mesmo, de coração 🤍"
                </div>
              </div>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1E1B18]/5 flex items-center justify-between text-[11px] font-sans text-[#1E1B18]/50 tracking-wider">
              <span>SENSIBILIDADE</span>
              <span>14:42</span>
            </div>
          </div>

          {/* Card 5: Um Dom para Contar Histórias */}
          <div className="bg-white/80 backdrop-blur-xs border border-[#1E1B18]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#1E1B18]/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-sans text-xs tracking-wider uppercase text-[#1E1B18]/70">
                    WhatsApp • 11:01
                  </span>
                </div>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div className="font-sans text-xs sm:text-sm text-[#2C2723]">
                <div className="bg-[#E9F0E8] p-4 rounded-2xl rounded-tl-xs border border-emerald-900/5 shadow-2xs leading-relaxed space-y-2">
                  <p className="font-medium text-emerald-950">
                    "Estou SEM PALAVRAS para tanta perfeição 😭😭😭😭😭❤️❤️❤️❤️❤️🥰🥰🥰✨🧚‍♀️😍🤍💛🤩🥳"
                  </p>
                  <p>
                    "não deixo de pensar que um resultado desses só pode ser um dom... Deus abençoe seu olhar e te use pra contar muitas outras histórias através das suas lentes 🥰"
                  </p>
                  <p>
                    "fico alegre demais que você vai estar com a gente pra registrar tudo no nosso grande dia!!"
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1E1B18]/5 flex items-center justify-between text-[11px] font-sans text-[#1E1B18]/50 tracking-wider">
              <span>GRANDE DIA</span>
              <span className="text-amber-700 font-medium">Especial Casamento</span>
            </div>
          </div>

          {/* Card 6: Superou Expectativas */}
          <div className="bg-white/80 backdrop-blur-xs border border-[#1E1B18]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#1E1B18]/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-sans text-xs tracking-wider uppercase text-[#1E1B18]/70">
                    WhatsApp • 17:37
                  </span>
                </div>
                <MessageCircle className="w-4 h-4 text-[#1E1B18]/40" />
              </div>
              <div className="space-y-2 font-sans text-xs sm:text-sm text-[#2C2723]">
                <div className="bg-[#E9F0E8] p-2.5 px-3.5 rounded-xl rounded-tl-xs border border-emerald-900/5">
                  "Estamos assim 17:37 😲😲😲😲😲"
                </div>
                <div className="bg-[#E9F0E8] p-2.5 px-3.5 rounded-xl rounded-tl-xs border border-emerald-900/5 font-semibold text-emerald-950">
                  "SUPEROU TODAS AS EXPECTATIVAS"
                </div>
                <div className="bg-[#E9F0E8] p-2.5 px-3.5 rounded-xl rounded-tl-xs border border-emerald-900/5">
                  "Já pode postar? 😂😂 Mandou MUITO bem!!!"
                </div>
                <div className="bg-[#E9F0E8] p-2.5 px-3.5 rounded-xl rounded-tl-xs border border-emerald-900/5">
                  "Rayssa falou que eu acertei demais no fotógrafo 😂"
                </div>
              </div>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1E1B18]/5 flex items-center justify-between text-[11px] font-sans text-[#1E1B18]/50 tracking-wider">
              <span>ENTREGA DE FOTOS</span>
              <span className="text-emerald-700 font-medium">Superou Expectativas</span>
            </div>
          </div>

          {/* Card 7: Emoção do Pré-Wedding */}
          <div className="bg-white/80 backdrop-blur-xs border border-[#1E1B18]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#1E1B18]/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-sans text-xs tracking-wider uppercase text-[#1E1B18]/70">
                    WhatsApp • 20:15
                  </span>
                </div>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              </div>
              <div className="space-y-2.5 font-sans text-xs sm:text-sm text-[#2C2723]">
                <div className="bg-[#E9F0E8] p-3.5 rounded-2xl rounded-tl-xs border border-emerald-900/5 shadow-2xs">
                  "Ian! As fotos do pré-wedding ficaram absurdamente perfeitas!! Todo mundo no grupo da família tá emocionado 😭"
                </div>
                <div className="bg-[#E9F0E8] p-3.5 rounded-2xl rounded-tl-xs border border-emerald-900/5 shadow-2xs">
                  "A luz da praia ficou um sonho. Não cansamos de olhar cada foto! Muito obrigada pelo carinho!"
                </div>
              </div>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1E1B18]/5 flex items-center justify-between text-[11px] font-sans text-[#1E1B18]/50 tracking-wider">
              <span>PRÉ-WEDDING PRAIA</span>
              <span className="text-rose-600 font-medium">Emocionante</span>
            </div>
          </div>

          {/* Card 8: Leveza e Calma */}
          <div className="bg-white/80 backdrop-blur-xs border border-[#1E1B18]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#1E1B18]/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-sans text-xs tracking-wider uppercase text-[#1E1B18]/70">
                    Depoimento de Noivos
                  </span>
                </div>
              </div>
              <div className="font-serif italic text-sm sm:text-base text-[#1E1B18] leading-relaxed mb-4">
                "Sem palavras pro carinho e calma com que você conduziu nosso dia. A gente não gosta muito de pousar pra fotos, mas com você nem sentimos a câmera! Ficou tudo tão leve e natural."
              </div>
            </div>
            <div className="pt-3 border-t border-[#1E1B18]/5 flex items-center justify-between text-[11px] font-sans text-[#1E1B18]/50 tracking-wider">
              <span>ESPONTANEIDADE</span>
              <span>Leveza & Conexão</span>
            </div>
          </div>

          {/* Card 9: Essência Pura */}
          <div className="bg-[#1E1B18] text-[#F5F1EC] rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="font-sans text-xs tracking-[0.2em] text-white/70 uppercase">
                  Avaliação Google
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-300 text-amber-300" />
                  ))}
                </div>
              </div>
              <div className="font-serif italic text-sm sm:text-base leading-relaxed text-white/90 space-y-2">
                <p>
                  "O olhar autêntico que estávamos procurando para registrar o nosso casamento! As fotos capturaram a nossa essência de um jeito único. O Ian é um artista sensacional."
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50">
                Casamento Autoral
              </span>
              <span className="text-xs text-white/60 font-mono">10/10</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
