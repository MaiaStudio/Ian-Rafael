import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, CheckCircle2, Calendar, User, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [nome, setNome] = useState('');
  const [dataPrevista, setDataPrevista] = useState('');
  const [tipoEvento, setTipoEvento] = useState('Casamento');
  const [mensagem, setMensagem] = useState('');

  const [flashActive, setFlashActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset form state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setFlashActive(false);
      }, 400);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;

    // 1. Trigger camera flash bloom
    setFlashActive(true);

    setTimeout(() => {
      setFlashActive(false);
      setIsSubmitted(true);
    }, 150);

    // 2. Format pre-filled WhatsApp text
    const textMsg = `Olá Ian! Gostaria de solicitar um orçamento:

• Nome: ${nome}
• Data Prevista: ${dataPrevista || 'A definir'}
• Tipo de Evento: ${tipoEvento}
• Mensagem: ${mensagem.trim() || 'Sem mensagem adicional'}`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(textMsg)}`;

    // 3. Open WhatsApp after success message animation
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1600);
  };

  return (
    <>
      {/* 📸 Full-screen Camera Flash Bloom Overlay */}
      <div
        className={`fixed inset-0 z-[100000] bg-white pointer-events-none transition-opacity duration-300 ease-out ${
          flashActive ? 'opacity-95' : 'opacity-0'
        }`}
      />

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[50000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/65 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#F5F1EC] border border-[#1E1B18]/15 rounded-3xl p-6 sm:p-9 shadow-2xl z-10 text-[#1E1B18] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#1E1B18]/5 hover:bg-[#1E1B18]/10 flex items-center justify-center text-[#1E1B18] transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>

              {!isSubmitted ? (
                /* Form View */
                <div>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[#404040]/70 mb-2">
                      <Sparkles size={13} className="text-[#1E1B18]/60" />
                      <span>Orçamento Personalizado</span>
                    </div>
                    <h3 className="font-sans font-light text-2xl sm:text-3xl text-[#1E1B18] tracking-tight">
                      Solicitar <span className="font-serif italic font-normal text-current">Orçamento</span>
                    </h3>
                    <div className="h-[1px] w-12 bg-[#1E1B18]/25 mt-3" />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                    {/* Nome */}
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-[#404040] mb-1.5">
                        Nome Completo *
                      </label>
                      <div className="relative flex items-center">
                        <User size={16} className="absolute left-3.5 text-[#1E1B18]/40 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Digite seu nome"
                          className="w-full pl-10 pr-4 py-3 bg-white/80 border border-[#1E1B18]/15 rounded-xl text-sm text-[#1E1B18] placeholder-[#1E1B18]/40 focus:outline-none focus:border-[#1E1B18] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Data Prevista & Tipo de Evento */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Data Prevista */}
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-[#404040] mb-1.5">
                          Data Prevista
                        </label>
                        <div className="relative flex items-center">
                          <Calendar size={16} className="absolute left-3.5 text-[#1E1B18]/40 pointer-events-none" />
                          <input
                            type="text"
                            value={dataPrevista}
                            onChange={(e) => setDataPrevista(e.target.value)}
                            placeholder="Ex: 15/10/2025"
                            className="w-full pl-10 pr-4 py-3 bg-white/80 border border-[#1E1B18]/15 rounded-xl text-sm text-[#1E1B18] placeholder-[#1E1B18]/40 focus:outline-none focus:border-[#1E1B18] focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {/* Tipo de Evento */}
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-[#404040] mb-1.5">
                          Tipo de Evento
                        </label>
                        <select
                          value={tipoEvento}
                          onChange={(e) => setTipoEvento(e.target.value)}
                          className="w-full px-3.5 py-3 bg-white/80 border border-[#1E1B18]/15 rounded-xl text-sm text-[#1E1B18] focus:outline-none focus:border-[#1E1B18] focus:bg-white transition-colors cursor-pointer"
                        >
                          <option value="Casamento">Casamento</option>
                          <option value="Pré-Wedding">Pré-Wedding</option>
                          <option value="Ensaio Autoral">Ensaio Autoral</option>
                        </select>
                      </div>
                    </div>

                    {/* Mensagem */}
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-[#404040] mb-1.5">
                        Mensagem / Detalhes
                      </label>
                      <textarea
                        rows={3}
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        placeholder="Conte-nos um pouco sobre suas ideias, local ou expectativas..."
                        className="w-full p-3.5 bg-white/80 border border-[#1E1B18]/15 rounded-xl text-sm text-[#1E1B18] placeholder-[#1E1B18]/40 focus:outline-none focus:border-[#1E1B18] focus:bg-white transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#1E1B18] hover:bg-[#2C2723] text-white transition-all duration-300 font-sans tracking-widest text-xs uppercase shadow-md hover:scale-[1.01] cursor-pointer"
                      >
                        <Camera size={16} />
                        <span>Solicitar Orçamento</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Success View after Camera Flash */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="py-8 text-center flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-500/30 flex items-center justify-center text-emerald-600 mb-5 shadow-sm"
                  >
                    <CheckCircle2 size={36} />
                  </motion.div>

                  <h3 className="font-sans font-light text-2xl sm:text-3xl text-[#1E1B18] tracking-tight mb-2">
                    Solicitação enviada <span className="font-serif italic font-normal text-current">com sucesso</span>!
                  </h3>

                  <p className="font-sans text-xs text-[#404040]/70 max-w-xs mb-6">
                    Redirecionando para o WhatsApp para finalizar seu orçamento diretamente com o Ian...
                  </p>

                  <div className="w-10 h-1 rounded-full bg-emerald-500/30 overflow-hidden relative">
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-full h-full bg-emerald-600 rounded-full"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
