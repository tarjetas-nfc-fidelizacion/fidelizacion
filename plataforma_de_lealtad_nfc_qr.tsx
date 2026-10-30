import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Wifi, 
  Sparkles, 
  Scissors, 
  Utensils, 
  Hotel, 
  Stethoscope, 
  Dog, 
  Flame, 
  Award, 
  RotateCcw, 
  Palette, 
  Store, 
  Smartphone, 
  CheckCircle2, 
  Gift, 
  ShieldCheck, 
  Printer, 
  ChevronRight,
  ExternalLink,
  Zap,
  Coffee,
  Car
} from 'lucide-react';

// Presets por defecto según el rubro del negocio
const PRESETS = [
  {
    id: 'barberia',
    name: 'Barbería Classic',
    category: 'Barbería / Salón',
    icon: 'Scissors',
    primaryColor: '#1e293b', // Dark Slate
    accentColor: '#d97706',  // Amber Gold
    bgColor: '#0f172a',      // Very dark blue
    cardBg: '#1e293b',       // Dark slate
    textColor: '#f8fafc',    // White
    stampsCount: 6,
    rewardText: '¡Corte de cabello o perfilado de barba GRATIS!',
    tagline: 'Tu estilo en las mejores manos'
  },
  {
    id: 'polleria',
    name: 'Pollería Fuego',
    category: 'Restaurante / Pollería',
    icon: 'Flame',
    primaryColor: '#dc2626', // Red
    accentColor: '#f59e0b',  // Amber/Yellow
    bgColor: '#450a0a',      // Dark red
    cardBg: '#7f1d1d',       // Crimson dark
    textColor: '#fef2f2',
    stampsCount: 6,
    rewardText: '1/4 de Pollo a la Brasa + Papas GRATIS',
    tagline: 'El sabor tradicional de cada visita'
  },
  {
    id: 'restaurante',
    name: 'Resto-Gourmet',
    category: 'Gastronomía / Café',
    icon: 'Utensils',
    primaryColor: '#065f46', // Emerald Dark
    accentColor: '#10b981',  // Mint
    bgColor: '#022c22',      // Deep forest
    cardBg: '#064e3b',
    textColor: '#ecfdf5',
    stampsCount: 8,
    rewardText: 'Postre gourmet o plato de fondo GRATIS',
    tagline: 'Gana premios degustando nuestros platillos'
  },
  {
    id: 'hotel',
    name: 'Hotel Boutique',
    category: 'Hotelería / Hospedaje',
    icon: 'Hotel',
    primaryColor: '#4c1d95', // Deep Purple
    accentColor: '#c084fc',  // Lavender
    bgColor: '#2e1065',
    cardBg: '#3b0764',
    textColor: '#faf5ff',
    stampsCount: 5,
    rewardText: 'Late Check-out GRATIS + Tragode bienvenida',
    tagline: 'Gracias por preferir tu descanso con nosotros'
  },
  {
    id: 'dental',
    name: 'Clínica Dental Fresh',
    category: 'Salud / Odontología',
    icon: 'Stethoscope',
    primaryColor: '#0284c7', // Sky Blue
    accentColor: '#38bdf8',  // Cyan
    bgColor: '#0c4a6e',
    cardBg: '#075985',
    textColor: '#f0f9ff',
    stampsCount: 4,
    rewardText: 'Limpieza Dental Ultrasónica 100% GRATIS',
    tagline: 'Cuidamos tu sonrisa en cada cita'
  },
  {
    id: 'veterinaria',
    name: 'Pet Care Veterinaria',
    category: 'Mascotas / Veterinaria',
    icon: 'Dog',
    primaryColor: '#d97706', // Warm Amber
    accentColor: '#f97316',  // Orange
    bgColor: '#451a03',
    cardBg: '#78350f',
    textColor: '#fffbeb',
    stampsCount: 6,
    rewardText: 'Baño y corte higiénico GRATIS para tu mascota',
    tagline: 'Amor y salud para tu mejor amigo'
  }
];

export default function App() {
  // Estado general de personalización del negocio
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('nfc_loyalty_config');
    return saved ? JSON.parse(saved) : {
      businessName: 'Barbería Don Carlos',
      category: 'Barbería / Salón',
      iconName: 'Scissors',
      primaryColor: '#1e293b',
      accentColor: '#d97706',
      bgColor: '#0f172a',
      cardBg: '#1e293b',
      textColor: '#f8fafc',
      stampsCount: 6,
      rewardText: 'Corte de cabello GRATIS',
      tagline: '¡Acerca tu teléfono para acumular tu sello!',
      customLogoUrl: ''
    };
  });

  // Estado del progreso del cliente actual (Simulador)
  const [currentStamps, setCurrentStamps] = useState(2);
  const [activeTab, setActiveTab] = useState('client'); // 'client' | 'admin' | 'stand'
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [animatingStamp, setAnimatingStamp] = useState(null);

  // Guardar configuración localmente
  useEffect(() => {
    localStorage.setItem('nfc_loyalty_config', JSON.stringify(config));
  }, [config]);

  // Manejar adición de sello con NFC/QR simulado
  const handleAddStamp = () => {
    if (currentStamps < config.stampsCount) {
      const nextIndex = currentStamps;
      setAnimatingStamp(nextIndex);
      
      setTimeout(() => {
        const updated = currentStamps + 1;
        setCurrentStamps(updated);
        setAnimatingStamp(null);
        if (updated >= config.stampsCount) {
          setShowRewardModal(true);
        }
      }, 400);
    }
  };

  const handleResetStamps = () => {
    setCurrentStamps(0);
    setShowRewardModal(false);
  };

  // Cargar preset de negocio
  const applyPreset = (preset) => {
    setConfig(prev => ({
      ...prev,
      businessName: `${preset.name}`,
      category: preset.category,
      iconName: preset.icon,
      primaryColor: preset.primaryColor,
      accentColor: preset.accentColor,
      bgColor: preset.bgColor,
      cardBg: preset.cardBg,
      textColor: preset.textColor,
      stampsCount: preset.stampsCount,
      rewardText: preset.rewardText,
      tagline: preset.tagline
    }));
  };

  // Renderizar icono dinámico
  const renderBusinessIcon = (iconName, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Scissors': return <Scissors className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Hotel': return <Hotel className={className} />;
      case 'Stethoscope': return <Stethoscope className={className} />;
      case 'Dog': return <Dog className={className} />;
      case 'Coffee': return <Coffee className={className} />;
      case 'Car': return <Car className={className} />;
      default: return <Store className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* HEADER SUPERIOR CON LOGO Y NAVEGACIÓN */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40 px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
              <Wifi className="w-5 h-5 rotate-90" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none text-white flex items-center gap-2">
                NFC Loyalty Pass <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">PRO</span>
              </h1>
              <p className="text-xs text-slate-400">Plataforma Digital de Lealtad (NFC + QR)</p>
            </div>
          </div>

          {/* Selector de Pestañas Principales */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-sm w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveTab('client')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'client' 
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Vista Tarjeta Cliente
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'admin' 
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-4 h-4" />
              Personalizar Negocio
            </button>
            <button
              onClick={() => setActiveTab('stand')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'stand' 
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Store className="w-4 h-4" />
              Display Mostrador (Acrílico)
            </button>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6">

        {/* ===================== TAB 1: VISTA TARJETA CLIENTE ===================== */}
        {activeTab === 'client' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Simulador de Celular / Tarjeta Digital */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="text-center mb-4">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Previsualización en Teléfono
                </span>
                <h2 className="text-xl font-bold mt-2 text-slate-100">Tarjeta Digital de Fidelización</h2>
                <p className="text-sm text-slate-400">Esta es la tarjeta que vera el cliente al tocar el sensor NFC o escanear el QR</p>
              </div>

              {/* Marco del Smartphone */}
              <div className="w-full max-w-[380px] bg-slate-950 rounded-[40px] p-4 border-[6px] border-slate-800 shadow-2xl relative overflow-hidden ring-1 ring-slate-700">
                {/* Notch / Cámara frontal */}
                <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-4 flex justify-center items-center">
                  <div className="w-3 h-3 bg-slate-900 rounded-full border border-slate-700"></div>
                </div>

                {/* Pantalla Interna de la Tarjeta con los estilos del negocio */}
                <div 
                  className="rounded-[28px] p-5 shadow-lg transition-all duration-300 border border-white/10 flex flex-col justify-between min-h-[520px]"
                  style={{ backgroundColor: config.cardBg, color: config.textColor }}
                >
                  {/* Encabezado del Negocio */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md text-white font-bold text-xl overflow-hidden"
                          style={{ backgroundColor: config.accentColor }}
                        >
                          {config.customLogoUrl ? (
                            <img src={config.customLogoUrl} alt="Logo" className="w-full h-full object-cover" />
                          ) : (
                            renderBusinessIcon(config.iconName, "w-7 h-7")
                          )}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-lg leading-tight">{config.businessName}</h3>
                          <span className="text-xs opacity-80 block">{config.category}</span>
                        </div>
                      </div>
                      <div className="p-2 rounded-full bg-white/10 backdrop-blur">
                        <Wifi className="w-4 h-4 rotate-90 text-amber-400" />
                      </div>
                    </div>

                    <div className="my-3 p-2.5 rounded-xl bg-black/20 text-xs text-center border border-white/10">
                      ✨ {config.tagline}
                    </div>
                  </div>

                  {/* Matriz / Grilla de Sellos */}
                  <div className="my-4">
                    <div className="flex justify-between items-center mb-3 text-xs font-semibold">
                      <span>TUS SELLOS ACUMULADOS</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10">
                        {currentStamps} de {config.stampsCount}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {Array.from({ length: config.stampsCount }).map((_, index) => {
                        const isStamped = index < currentStamps;
                        const isAnimating = animatingStamp === index;

                        return (
                          <div
                            key={index}
                            className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden ${
                              isStamped
                                ? 'border-amber-400 bg-amber-500/20 shadow-md scale-100'
                                : 'border-dashed border-white/20 bg-black/10 hover:border-white/40'
                            } ${isAnimating ? 'animate-bounce scale-110 border-amber-300 bg-amber-400/40' : ''}`}
                          >
                            {isStamped ? (
                              <div className="flex flex-col items-center animate-in zoom-in-50 duration-200">
                                <div 
                                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg text-white"
                                  style={{ backgroundColor: config.accentColor }}
                                >
                                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                                </div>
                                <span className="text-[10px] mt-1 font-bold opacity-90">Sello #{index + 1}</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center opacity-40">
                                <span className="text-lg font-bold">{index + 1}</span>
                                <span className="text-[9px]">Visita</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recompensa Objetivo */}
                  <div className="mt-auto">
                    <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 flex items-center gap-3">
                      <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400">
                        <Gift className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 block">Premio al completar:</span>
                        <p className="text-xs font-bold leading-tight mt-0.5">{config.rewardText}</p>
                      </div>
                    </div>

                    {/* Indicador de Footer */}
                    <div className="mt-3 flex items-center justify-between text-[10px] opacity-60">
                      <span>ID: NFC-CARD-2026</span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Verificado por NFC+QR
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel de Control Interactivo de Pruebas */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 shadow-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Simulador de Visitas (Tap / QR)
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  Usa este panel para simular el toque del cliente con su teléfono en el stand de mostrador o el escaneo del código QR.
                </p>

                <div className="mt-6 space-y-4">
                  <button
                    onClick={handleAddStamp}
                    disabled={currentStamps >= config.stampsCount}
                    className={`w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 text-base shadow-xl transition-all ${
                      currentStamps >= config.stampsCount
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    <Wifi className="w-6 h-6 rotate-90" />
                    Simular Tap NFC / QR (+1 Sello)
                  </button>

                  <button
                    onClick={handleResetStamps}
                    className="w-full py-2.5 px-4 rounded-xl font-medium bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reiniciar tarjeta a 0 sellos
                  </button>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-700 text-xs text-slate-400 space-y-2">
                  <div className="flex justify-between">
                    <span>Estado actual:</span>
                    <span className="font-semibold text-slate-200">
                      {currentStamps >= config.stampsCount ? '🎉 RECOMPENSA LISTA' : `${currentStamps}/${config.stampsCount} Sellos acumulados`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-400 h-full transition-all duration-300"
                      style={{ width: `${(currentStamps / config.stampsCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Banner de Valor Comercial */}
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl p-5 border border-amber-500/20">
                <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Ventajas para tu cliente de mostrador:
                </h4>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Sin Papel ni Cartones:</strong> El cliente nunca perderá su tarjeta de fidelización.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Acceso Instantáneo:</strong> Solo requiere acercar el celular (NFC) o apuntar la cámara (QR).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Reutilizable e Ilimitado:</strong> Se renueva automáticamente al canjear el premio.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: PERSONALIZADOR DE NEGOCIO ===================== */}
        {activeTab === 'admin' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              
              {/* Presets Rápidos por Rubro */}
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Plantillas Rápidas por Rubro
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  Selecciona una plantilla base configurada con colores e imágenes adaptadas a cada tipo de negocio local.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset)}
                      className="p-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-700/80 hover:border-amber-500/50 text-left transition-all flex flex-col justify-between group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-lg bg-slate-800 text-amber-400 group-hover:scale-110 transition-transform">
                          {renderBusinessIcon(preset.icon)}
                        </div>
                        <div>
                          <span className="font-bold text-xs text-white block">{preset.name}</span>
                          <span className="text-[10px] text-slate-400">{preset.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.cardBg }}></div>
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.accentColor }}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Formulario de Configuración Personalizada */}
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-amber-400" />
                  Personalización de Marca e Identidad
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre del Negocio</label>
                    <input
                      type="text"
                      value={config.businessName}
                      onChange={(e) => setConfig({ ...config, businessName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Categoría / Rubro</label>
                    <input
                      type="text"
                      value={config.category}
                      onChange={(e) => setConfig({ ...config, category: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Slogan / Mensaje de Bienvenida</label>
                    <input
                      type="text"
                      value={config.tagline}
                      onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Icono del Negocio</label>
                    <select
                      value={config.iconName}
                      onChange={(e) => setConfig({ ...config, iconName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Scissors">Scissors (Barbería / Estética)</option>
                      <option value="Flame">Flame (Pollería / Parrillas)</option>
                      <option value="Utensils">Utensils (Restaurante / Bar)</option>
                      <option value="Hotel">Hotel (Hospedaje)</option>
                      <option value="Stethoscope">Stethoscope (Dental / Salud)</option>
                      <option value="Dog">Dog (Veterinaria / Mascotas)</option>
                      <option value="Coffee">Coffee (Cafetería / Bakery)</option>
                      <option value="Car">Car (Carwash / Automotriz)</option>
                    </select>
                  </div>
                </div>

                {/* Configuración del Juego de Lealtad */}
                <div className="pt-4 border-t border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Número de Sellos para Ganar</label>
                    <select
                      value={config.stampsCount}
                      onChange={(e) => setConfig({ ...config, stampsCount: parseInt(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value={4}>4 Sellos (Fidelización rápida)</option>
                      <option value={6}>6 Sellos (Recomendado estándar)</option>
                      <option value={8}>8 Sellos (Frecuencia media)</option>
                      <option value={10}>10 Sellos (Gran recompensa)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Premio / Recompensa Final</label>
                    <input
                      type="text"
                      value={config.rewardText}
                      onChange={(e) => setConfig({ ...config, rewardText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      placeholder="Ej. Corte Gratis o 20% de Descuento"
                    />
                  </div>
                </div>

                {/* Paleta de Colores */}
                <div className="pt-4 border-t border-slate-700">
                  <label className="block text-xs font-semibold text-slate-300 mb-3">Colores Personalizados de la Tarjeta</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Fondo de Tarjeta</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={config.cardBg}
                          onChange={(e) => setConfig({ ...config, cardBg: e.target.value })}
                          className="w-10 h-10 rounded-lg bg-transparent border border-slate-700 cursor-pointer"
                        />
                        <span className="text-xs font-mono text-slate-300">{config.cardBg}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Color Principal / Sellos</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={config.accentColor}
                          onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                          className="w-10 h-10 rounded-lg bg-transparent border border-slate-700 cursor-pointer"
                        />
                        <span className="text-xs font-mono text-slate-300">{config.accentColor}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Color de Texto</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={config.textColor}
                          onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                          className="w-10 h-10 rounded-lg bg-transparent border border-slate-700 cursor-pointer"
                        />
                        <span className="text-xs font-mono text-slate-300">{config.textColor}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Vista previa en miniatura continua */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-slate-800/80 rounded-2xl p-5 border border-slate-700 text-center">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-3">
                  Vista Previa en Tiempo Real
                </span>
                
                <div 
                  className="rounded-2xl p-4 text-left shadow-xl border border-white/10"
                  style={{ backgroundColor: config.cardBg, color: config.textColor }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: config.accentColor }}
                    >
                      {renderBusinessIcon(config.iconName, "w-5 h-5")}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-tight">{config.businessName}</h4>
                      <span className="text-[10px] opacity-75">{config.category}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 my-3">
                    {Array.from({ length: config.stampsCount }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-12 rounded-xl border flex items-center justify-center ${
                          i < 2 ? 'border-amber-400 bg-amber-500/20' : 'border-dashed border-white/20'
                        }`}
                      >
                        {i < 2 && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                      </div>
                    ))}
                  </div>

                  <div className="p-2 rounded-lg bg-black/20 text-[11px] flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{config.rewardText}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('client')}
                  className="mt-4 w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  Probar tarjeta interactiva <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: STAND / DISPLAY DE MOSTRADOR NFC+QR ===================== */}
        {activeTab === 'stand' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visualizador del Exhibidor Físico Acrílico */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="text-center mb-4">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Diseño de Display Físico
                </span>
                <h2 className="text-xl font-bold mt-2 text-slate-100">Acrílico de Mostrador (NFC + QR)</h2>
                <p className="text-sm text-slate-400">Este es el soporte de exhibición que entregas a tus clientes para colocar en su recepción o caja.</p>
              </div>

              {/* Maqueta del Stand Acrílico */}
              <div className="relative w-full max-w-[360px] bg-slate-900/90 rounded-3xl p-6 border-4 border-slate-700/80 shadow-2xl flex flex-col items-center text-center backdrop-blur bg-gradient-to-b from-slate-800 to-slate-950">
                {/* Tornillos acrílicos decorativos */}
                <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-slate-700 border border-slate-500 shadow-inner"></div>
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-slate-700 border border-slate-500 shadow-inner"></div>
                <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-slate-700 border border-slate-500 shadow-inner"></div>
                <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-slate-700 border border-slate-500 shadow-inner"></div>

                {/* Logo & Header del Stand */}
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg text-white mb-3"
                  style={{ backgroundColor: config.accentColor }}
                >
                  {renderBusinessIcon(config.iconName, "w-9 h-9")}
                </div>

                <h3 className="font-extrabold text-xl text-white tracking-tight">{config.businessName}</h3>
                <p className="text-xs text-amber-400 font-medium mb-4">¡Programa de Fidelización Digital!</p>

                {/* Código QR Generado Visualmente */}
                <div className="p-4 bg-white rounded-2xl shadow-xl border-2 border-amber-500/30 my-2 relative group">
                  <QrCode className="w-40 h-40 text-slate-900" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/80 rounded-2xl transition-opacity text-xs font-bold text-amber-400 p-2">
                    QR codificado para registrar visitas
                  </div>
                </div>

                {/* Zona del Chip NFC */}
                <div className="mt-4 w-full p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-3">
                  <div className="p-2 rounded-full bg-amber-500 text-slate-950 animate-pulse">
                    <Wifi className="w-5 h-5 rotate-90" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-extrabold block">SENSOR TAP NFC</span>
                    <span className="text-xs text-slate-200 font-semibold">Acerca tu celular aquí</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-4 leading-snug">
                  "Suma 1 sello por cada visita. ¡Al completar tus {config.stampsCount} sellos reclamo tu {config.rewardText}!"
                </p>

                {/* Base del soporte acrílico */}
                <div className="w-48 h-3 bg-slate-700 rounded-full mt-6 border border-slate-600 shadow-md"></div>
              </div>
            </div>

            {/* Opciones de Comercialización para la venta de Tarjetas / Stands */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 shadow-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                  <Printer className="w-5 h-5 text-amber-400" />
                  Detalles de Impresión y Configuración
                </h3>
                <p className="text-xs text-slate-300 mb-4">
                  Información técnica para codificar la tarjeta NFC o imprimir el exhibidor de acrílico.
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block mb-1">URL de destino NFC/QR:</span>
                    <code className="text-amber-400 font-mono text-[11px] break-all">
                      https://mi-plataforma-nfc.com/card?biz={encodeURIComponent(config.businessName)}
                    </code>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex justify-between items-center">
                    <div>
                      <span className="text-slate-400 block">Tipo de Chip NFC recomendado:</span>
                      <span className="font-semibold text-white">NTAG213 / NTAG215 (Universal)</span>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">Compatible iOS/Android</span>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="w-full mt-5 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  Imprimir / Exportar Diseño de Stand
                </button>
              </div>

              {/* Guía de Argumento de Venta para Negocios Locales */}
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-3">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Argumento de Venta para ofrecer a Negocios
                </h4>
                <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <p>
                    <strong>¿Por qué un negocio te comprará esta tarjeta/exhibidor NFC+QR?</strong>
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400">
                    <li>Aumenta la tasa de retorno de clientes en un 35% o más.</li>
                    <li>Moderno, ecológico e impactante en el mostrador del negocio.</li>
                    <li>Sin necesidad de que los clientes descarguen aplicaciones pesadas.</li>
                    <li>Costo único o suscripción mensual recurrente.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ===================== MODAL DE CELEBRACIÓN / RECOMPENSA ===================== */}
      {showRewardModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/50 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-950 shadow-lg shadow-amber-500/40 animate-bounce">
              <Gift className="w-10 h-10" />
            </div>

            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">¡FELICIDADES!</span>
            <h3 className="text-2xl font-black text-white mt-1">¡Tarjeta Completa!</h3>

            <p className="text-xs text-slate-300 my-3">
              Has acumulado tus <strong className="text-amber-400">{config.stampsCount} sellos</strong>. Presenta este cupón en caja para canjear:
            </p>

            <div className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-amber-500 my-4 text-left">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Premio Canjeable:</span>
              <p className="text-sm font-bold text-amber-300 mt-1">{config.rewardText}</p>
              <span className="text-[10px] text-slate-400 block mt-2">Negocio: {config.businessName}</span>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleResetStamps}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
              >
                Canjear y Reiniciar Tarjeta
              </button>
              <button
                onClick={() => setShowRewardModal(false)}
                className="w-full py-2 text-slate-400 hover:text-slate-200 text-xs"
              >
                Cerrar vista
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4 text-center text-xs text-slate-500">
        Plataforma Interactiva de Tarjetas NFC + QR | Demostración Comercial para Negocios Locales
      </footer>
    </div>
  );
}