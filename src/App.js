import React, { useState, useMemo } from 'react';
import { Search, AlertCircle, CheckCircle, XCircle, Heart, Flag, Package, BarChart3, Home, Info, List as ListIcon, Star, TrendingUp, Shield, Award, Sparkles, ChevronRight } from 'lucide-react';
import productsData from './data.json';

const PalestineFlag = () => (
  <div className="relative w-full h-16 shadow-2xl rounded-xl overflow-hidden group hover:scale-105 transition-transform duration-300">
    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
    <div className="flex flex-col h-full">
      <div className="h-1/3 bg-black"></div>
      <div className="h-1/3 bg-white"></div>
      <div className="h-1/3 bg-green-600"></div>
    </div>
    <div className="absolute left-0 top-0 w-0 h-0 border-t-[32px] border-t-transparent border-b-[32px] border-b-transparent border-l-[40px] border-l-red-600 drop-shadow-2xl"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>
);

const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 10}s`,
        }}
      />
    ))}
  </div>
);

const BoycottApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showStats, setShowStats] = useState(true);
  const products = productsData.products;

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    ).slice(0, 8);
  }, [searchTerm, products]);

  const stats = useMemo(() => {
    const boycotted = products.filter(p => p.boycott_status === 'boycotté').length;
    const tunisian = products.filter(p => p.tunisian_product).length;
    const total = products.length;
    return { boycotted, tunisian, total };
  }, [products]);

  const categories = useMemo(() => {
    const cats = {};
    products.forEach(p => {
      cats[p.category] = (cats[p.category] || 0) + 1;
    });
    return Object.entries(cats).sort((a, b) => b[1] - a[1]);
  }, [products]);

  const categoryIcons = {
    'Boissons': '🥤',
    'Eau embouteillée': '💧',
    'Eau':  '💧',
    'Chocolat': '🍫',
    'Café': '☕',
    'Fast-food': '🍔',
    'Produits laitiers': '🥛',
    'Glaces': '🍦',
    'Condiments': '🧂',
    'Snacks': '🍿',
    'Thé': '🍵',
    'Cosmétiques': '💄',
    'Maquillage': '💋',
    'Puériculture': '👶',
    'Rasage': '🪒',
    'Soins capillaires': '💇',
    'Hygiène dentaire': '🦷',
    'Lessive': '🧺',
    'Hygiène féminine': '🌸',
    'Vêtements/Chaussures': '👟',
    'Électronique': '💻',
    'default': '📦'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-green-950 relative overflow-hidden">
      {/* Animated Background */}
      <FloatingParticles />

      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-xl bg-gradient-to-r from-black/80 via-red-900/80 to-green-900/80 border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-green-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Heart className="text-white fill-white" size={32} />
                </div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-red-200 to-green-200 bg-clip-text text-transparent">
                  استغني - Estaghni
                </h1>
                <p className="text-red-200 text-sm mt-1 flex items-center gap-2">
                  <Sparkles size={16} className="text-yellow-400" />
                  <span>Pour une consommation éthique et solidaire</span>
                  <span className="text-2xl">🇵🇸</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowStats(!showStats)}
              className="group relative px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all duration-300 border border-white/20 hover: border-white/40 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              <BarChart3 size={24} className="text-white group-hover:rotate-12 transition-transform" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
            </button>
          </div>

          {/* Palestine Flag */}
          <div className="relative w-full max-w-2xl mx-auto mb-6">
            <PalestineFlag />
          </div>

          {/* Stats Cards */}
          {showStats && (
            <div className="grid grid-cols-3 gap-4 animate-slideDown">
              <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="text-blue-400" size={28} />
                    <TrendingUp className="text-green-400" size={20} />
                  </div>
                  <div className="text-4xl font-black text-white mb-1">{stats.total}</div>
                  <div className="text-sm text-white/80 font-semibold">Total Produits</div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-red-500/20 to-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <AlertCircle className="text-red-400" size={28} />
                    <Shield className="text-red-300" size={20} />
                  </div>
                  <div className="text-4xl font-black text-white mb-1">{stats.boycotted}</div>
                  <div className="text-sm text-red-200 font-semibold">À Boycotter</div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-green-500/20 to-green-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="text-green-400" size={28} />
                    <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  </div>
                  <div className="text-4xl font-black text-white mb-1">{stats.tunisian}</div>
                  <div className="text-sm text-green-200 font-semibold flex items-center gap-1">
                    <span>🇹🇳</span>
                    <span>Produits Locaux</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8 bg-black/20 backdrop-blur-xl p-2 rounded-3xl border border-white/10 shadow-2xl">
          {[
            { id: 'home', label: 'Accueil', icon: Home },
            { id: 'categories', label: 'Catégories', icon: ListIcon },
            { id: 'about', label: 'À propos', icon: Info }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all duration-300 relative overflow-hidden group ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-500 to-green-600 text-white shadow-xl scale-105'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-green-400 animate-pulse opacity-20"></div>
              )}
              <tab.icon size={22} className={activeTab === tab.id ? 'animate-bounce' : ''} />
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Search Box */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-purple-500 to-green-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Search className="text-gray-400" size={28} />
                  </div>
                  <input
                    type="text"
                    placeholder="🔍 Rechercher un produit...  (Coca-Cola, Nestlé, Boga...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 border-3 border-gray-200 rounded-2xl focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/20 text-lg font-semibold bg-white shadow-inner transition-all duration-300"
                  />
                </div>

                {/* Search Results */}
                {searchTerm && filteredProducts.length > 0 && (
                  <div className="mt-6 border-t-2 border-gray-200 pt-6 animate-slideDown">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-gray-600 font-bold flex items-center gap-2">
                        <Sparkles className="text-yellow-500" size={18} />
                        <span>{filteredProducts.length} résultat(s) trouvé(s)</span>
                      </p>
                    </div>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                      {filteredProducts.map((product, index) => (
                        <button
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className="w-full text-left p-5 rounded-2xl border-2 border-gray-100 hover:border-red-400 bg-white hover:bg-gradient-to-r hover:from-red-50 hover:to-green-50 transition-all duration-300 hover: shadow-xl hover:scale-[1.02] group animate-slideUp"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">{categoryIcons[product.category] || categoryIcons.default}</span>
                                <h3 className="font-black text-xl text-gray-900 group-hover:text-red-600 transition-colors">
                                  {product.name}
                                </h3>
                              </div>
                              <p className="text-sm text-gray-600 font-semibold mb-2">{product.brand}</p>
                              <div className="flex items-center gap-2">
                                <Package size={16} className="text-gray-400" />
                                <span className="text-xs text-gray-500 font-medium">{product.category}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {product.boycott_status === 'boycotté' ? (
                                <span className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-black shadow-lg flex items-center gap-2 hover:scale-110 transition-transform">
                                  <XCircle size={18} />
                                  BOYCOTT
                                </span>
                              ) : product.tunisian_product ?  (
                                <span className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-black shadow-lg flex items-center gap-2 hover:scale-110 transition-transform">
                                  <CheckCircle size={18} />
                                  🇹🇳 LOCAL
                                </span>
                              ) : (
                                <span className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-black shadow-lg flex items-center gap-2 hover:scale-110 transition-transform">
                                  <CheckCircle size={18} />
                                  OK
                                </span>
                              )}
                              <ChevronRight className="text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" size={20} />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {searchTerm && filteredProducts.length === 0 && (
                  <div className="mt-6 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl text-center border-3 border-dashed border-gray-300 animate-shake">
                    <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-800 font-black text-lg mb-2">Aucun produit trouvé pour "{searchTerm}"</p>
                    <p className="text-sm text-gray-600 font-semibold">Essayez avec un autre nom de produit ou marque</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            {selectedProduct && (
              <div className="relative group animate-scaleIn">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-green-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-start gap-4">
                      <span className="text-5xl">{categoryIcons[selectedProduct.category] || categoryIcons.default}</span>
                      <div>
                        <h2 className="text-4xl font-black text-gray-900 mb-2">{selectedProduct.name}</h2>
                        <p className="text-xl text-gray-600 font-semibold">{selectedProduct.brand}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:rotate-90 duration-300 shadow-lg hover:shadow-xl"
                    >
                      <XCircle size={32} />
                    </button>
                  </div>

                  {/* Status Card */}
                  {selectedProduct.boycott_status === 'boycotté' ?  (
                    <div className="relative bg-gradient-to-br from-red-50 via-red-100 to-orange-50 border-4 border-red-400 rounded-3xl p-10 mb-8 shadow-2xl overflow-hidden group/status">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse"></div>
                      <div className="relative">
                        <div className="flex items-center gap-5 mb-8">
                          <div className="relative">
                            <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                            <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-5 rounded-full shadow-2xl">
                              <AlertCircle className="text-white" size={48} />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-red-900 mb-2 flex items-center gap-2">
                              ⛔ PRODUIT À BOYCOTTER
                            </h3>
                            <p className="text-red-700 font-bold text-lg">❌ Ne pas acheter ce produit</p>
                          </div>
                        </div>

                        <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                          <h4 className="font-black text-red-600 mb-6 text-xl flex items-center gap-3">

                            <Flag className="text-red-600" size={24} />
                            Raisons du boycott : 
                          </h4>
                          <ul className="space-y-4">
                            {selectedProduct.boycott_reasons?.map((reason, idx) => (
                              <li key={idx} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow animate-slideRight" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">{idx + 1}</span>
                                <span className="text-red-900 font-bold text-lg flex-1">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : selectedProduct.tunisian_product ? (
                    <div className="relative bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 border-4 border-green-400 rounded-3xl p-10 mb-8 shadow-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-pulse"></div>
                      <div className="relative">
                        <div className="flex items-center gap-5 mb-6">
                          <div className="relative">
                            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                            <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-5 rounded-full shadow-2xl">
                              <CheckCircle className="text-white" size={48} />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-green-900 mb-2">🇹🇳 PRODUIT TUNISIEN</h3>
                            <p className="text-green-700 font-bold text-lg">⭐ Soutenez l'économie locale !</p>
                          </div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                          <p className="text-green-900 font-bold text-lg leading-relaxed">
                            Ce produit est fabriqué en Tunisie.  En l'achetant, vous soutenez l'économie locale et les producteurs tunisiens.  🌟
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 border-4 border-blue-400 rounded-3xl p-10 mb-8 shadow-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 animate-pulse"></div>
                      <div className="relative flex items-center gap-5">
                        <div className="relative">
                          <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-full shadow-2xl">
                            <CheckCircle className="text-white" size={48} />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-3xl font-black text-blue-900 mb-2">✅ PRODUIT ACCEPTABLE</h3>
                          <p className="text-blue-700 font-bold text-lg">Pas de problème éthique majeur identifié</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Alternatives */}
                  {selectedProduct.alternatives && selectedProduct.alternatives.length > 0 && (
                    <div className="relative bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 rounded-2xl p-8 border-3 border-green-400 shadow-xl mb-8">
                      <div className="absolute top-4 right-4">
                        <Star className="text-yellow-400 fill-yellow-400 animate-spin-slow" size={32} />
                      </div>
                      <h4 className="font-black text-green-600 mb-6 text-xl flex items-center gap-3">

                        <CheckCircle className="text-green-600" size={24} />
                        ✨ Alternatives recommandées : 
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {selectedProduct.alternatives.map((alt, idx) => (
                          <span key={idx} className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-base font-black shadow-xl hover:scale-110 hover:rotate-2 transition-transform cursor-pointer animate-bounceIn" style={{ animationDelay: `${idx * 0.1}s` }}>
                            ✅ {alt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group/card relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-3 border-gray-200 hover:border-gray-400 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-center gap-3 text-gray-600 mb-4">
                          <Flag size={24} className="text-gray-500" />
                          <span className="text-sm font-black uppercase tracking-wide">Pays d'origine</span>
                        </div>
                        <p className="text-gray-900 font-black text-2xl">{selectedProduct.country_origin}</p>
                      </div>
                    </div>
                    <div className="group/card relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-3 border-gray-200 hover:border-gray-400 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-center gap-3 text-gray-600 mb-4">
                          <Package size={24} className="text-gray-500" />
                          <span className="text-sm font-black uppercase tracking-wide">Catégorie</span>
                        </div>
                        <p className="text-gray-900 font-black text-2xl">{selectedProduct.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Welcome Cards */}
            {! selectedProduct && ! searchTerm && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="group relative animate-slideRight">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20 hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-10 animate-pulse"></div>
                      <div className="relative bg-gradient-to-r from-red-500 to-red-600 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-2xl">
                        <Search className="text-white" size={40} />
                      </div>
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-6">🎯 Comment ça marche ?</h3>
                    <ol className="space-y-5">
                      {[
                        "Tapez le nom d'un produit dans la barre de recherche",
                        "Sélectionnez-le dans la liste des résultats",
                        "Découvrez son statut éthique et les raisons",
                        "Trouvez des alternatives locales et éthiques"
                      ].map((step, idx) => (
                        <li key={idx} className="flex items-start gap-4 group/item animate-slideRight" style={{ animationDelay: `${idx * 0.1}s` }}>
                          <span className="flex-shrink-0 bg-gradient-to-r from-red-500 to-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-lg group-hover/item:scale-110 transition-transform">
                            {idx + 1}
                          </span>
                          <span className="text-gray-700 font-bold text-lg flex-1 group-hover/item:text-red-600 transition-colors">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="group relative animate-slideLeft">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-green-600 rounded-3xl shadow-2xl p-10 text-white hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-10 animate-pulse"></div>
                      <div className="relative bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm shadow-2xl">
                        <Heart className="text-white fill-white" size={40} />
                      </div>
                    </div>
                    <h3 className="text-3xl font-black mb-6 flex items-center gap-2">
                      💡 Le saviez-vous ?
                      <Sparkles className="text-yellow-300 animate-pulse" size={28} />
                    </h3>
                    <div className="space-y-5">
                      <p className="text-white/95 font-bold text-lg leading-relaxed bg-black/20 rounded-2xl p-5 backdrop-blur-sm">
                        Chaque achat est un vote.  En choisissant des produits éthiques et locaux, vous soutenez une économie plus juste et durable.
                      </p>
                      <p className="text-white/95 font-bold text-lg leading-relaxed bg-black/20 rounded-2xl p-5 backdrop-blur-sm flex items-center gap-3">
                        <span className="text-3xl">🇵🇸</span>
                        <span>Ensemble, faisons la différence pour la Palestine et pour un monde meilleur. </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="relative group animate-fadeIn">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover: opacity-50 transition-opacity"></div>
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20">
              <h2 className="text-4xl font-black text-gray-900 mb-8 flex items-center gap-4">
                <span className="bg-gradient-to-r from-red-500 to-green-600 p-4 rounded-2xl shadow-xl">
                  <Package className="text-white" size={36} />
                </span>
                📦 Catégories de produits
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(([category, count], idx) => (
                  <div key={category} className="group/cat relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-3 border-gray-200 hover:border-red-400 transition-all duration-300 hover: shadow-2xl hover:scale-105 cursor-pointer animate-scaleIn" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover/cat:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl group-hover/cat:scale-125 transition-transform">
                          {categoryIcons[category] || categoryIcons.default}
                        </span>
                        <h3 className="font-black text-gray-900 text-xl group-hover/cat:text-red-600 transition-colors">
                          {category}
                        </h3>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                        <span className="relative bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-3 rounded-full font-black text-lg shadow-xl group-hover/cat:scale-110 transition-transform inline-block">
                          {count}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="relative group animate-fadeIn">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover: opacity-50 transition-opacity"></div>
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20">
              <h2 className="text-4xl font-black text-gray-900 mb-10 flex items-center gap-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-xl">
                  <Info className="text-white" size={36} />
                </span>
                ℹ️ À propos d'Estaghni
              </h2>

              <div className="space-y-8">
                <div className="relative bg-gradient-to-r from-red-50 via-white to-green-50 rounded-3xl p-10 border-3 border-red-200 shadow-xl overflow-hidden group/section hover:scale-[1.02] transition-transform animate-slideUp">
                  <div className="absolute top-0 right-0 text-9xl opacity-5">🇵🇸</div>
                  <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <Heart className="text-red-500 fill-red-500" size={32} />
                    🇵🇸 Notre mission
                  </h3>
                  <p className="text-gray-800 font-bold text-xl leading-relaxed">
                    Estaghni (استغني) signifie "passe-t'en" en arabe. Notre plateforme aide les consommateurs à faire des choix éthiques en identifiant les produits à boycotter et en proposant des alternatives locales et solidaires.
                  </p>
                </div>

                <div className="relative bg-gradient-to-r from-green-50 via-emerald-50 to-blue-50 rounded-3xl p-10 border-3 border-green-200 shadow-xl overflow-hidden hover:scale-[1.02] transition-transform animate-slideUp" style={{ animationDelay: '0.1s' }}>
                  <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                    <Shield className="text-green-600" size={32} />
                    🌍 Pourquoi boycotter ? 
                  </h3>
                  <ul className="space-y-5">
                    {[
                      "Refuser de financer des entreprises qui soutiennent l'oppression",
                      "Promouvoir l'économie locale et les producteurs tunisiens",
                      "Encourager des pratiques commerciales éthiques et durables",
                      "Exercer notre pouvoir de consommateurs pour le changement"
                    ].map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow group/item animate-slideRight" style={{ animationDelay:  `${idx * 0.1}s` }}>
                        <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg group-hover/item:scale-110 transition-transform">
                          ✓
                        </span>
                        <span className="text-gray-800 font-bold text-lg flex-1">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 rounded-3xl p-10 border-3 border-yellow-200 shadow-xl overflow-hidden hover:scale-[1.02] transition-transform animate-slideUp" style={{ animationDelay: '0.2s' }}>
                  <div className="absolute top-4 right-4">
                    <Star className="text-yellow-400 fill-yellow-400 animate-spin-slow" size={64} />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <Award className="text-yellow-600" size={32} />
                    💪 Ensemble, agissons
                  </h3>
                  <p className="text-gray-800 font-bold text-xl leading-relaxed">
                    Chaque produit boycotté est un message envoyé.  Chaque produit local acheté est un soutien à notre économie. Ensemble, nous pouvons faire la différence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative mt-20 backdrop-blur-xl bg-gradient-to-r from-black/90 via-red-900/90 to-green-900/90 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-green-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-red-500 to-green-600 p-6 rounded-full shadow-2xl">
                  <Heart className="text-white fill-white" size={48} />
                </div>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <p className="text-3xl font-black text-white flex items-center justify-center gap-3">
                <span>🇵🇸</span>
                <span className="bg-gradient-to-r from-white via-green-200 to-red-200 bg-clip-text text-transparent">
                  Free Palestine - فلسطين حرة
                </span>
                <span>🇵🇸</span>
              </p>
              <p className="text-white/90 text-xl font-bold">
                Estaghni - Consommation Éthique et Solidaire
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 text-white/70 text-sm">
              <p className="font-semibold">Chaque achat compte</p>
              <span>•</span>
              <p className="font-semibold">Chaque choix fait la différence</p>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              {[...Array(3)].map((_, i) =>(
                <div key={i} className="w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity:  1; transform: scale(1); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        . animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation:  slideUp 0.6s ease-out forwards;
        }
        .animate-slideDown {
          animation:  slideDown 0.6s ease-out;
        }
        .animate-slideRight {
          animation: slideRight 0.6s ease-out;
        }
        . animate-slideLeft {
          animation: slideLeft 0.6s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
        .animate-bounceIn {
          animation:  bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        . custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ef4444, #22c55e);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #dc2626, #16a34a);
        }
      `}</style>
    </div>
  );
};

export default BoycottApp;