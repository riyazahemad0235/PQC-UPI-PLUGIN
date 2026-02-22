import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Zap, 
  AlertTriangle, 
  Search, 
  QrCode,
  Smartphone,
  Server,
  Database,
  RefreshCcw,
  Info,
  Camera,
  User,
  X,
  Keyboard
} from 'lucide-react';

const usePQCPlugin = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [{ id: Date.now(), message, type, time: new Date().toLocaleTimeString() }, ...prev]);
  };

  const processPayment = async (amount, recipient) => {
    setIsProcessing(true);
    setLogs([]);
    
    addLog(`Initiating Secure Tunnel to ${recipient}...`, "info");
    await new Promise(r => setTimeout(r, 600));
    
    addLog("PQC Hybrid SDK Triggered", "success");
    await new Promise(r => setTimeout(r, 600));
    
    addLog("Generating Classical Signature (ECDSA)...", "info");
    await new Promise(r => setTimeout(r, 700));
    
    addLog("Generating Quantum Signature (ML-DSA/Dilithium)...", "info");
    await new Promise(r => setTimeout(r, 900));
    
    addLog("Hybrid Payload Encapsulated (Kyber)...", "success");
    await new Promise(r => setTimeout(r, 500));

    addLog("Transmitting to Payment Gateway...", "info");
    await new Promise(r => setTimeout(r, 1000));
    
    addLog("Gateway: Verifying Classical Signature...", "info");
    await new Promise(r => setTimeout(r, 600));
    
    addLog("Gateway: Verifying PQC Signature...", "info");
    await new Promise(r => setTimeout(r, 400));
    
    addLog("Fail-Forward Policy: VALIDATED", "success");
    setIsProcessing(false);
    return true;
  };

  return { processPayment, isProcessing, logs };
};

export default function App() {
  const [view, setView] = useState('dashboard');
  const { processPayment, isProcessing, logs } = usePQCPlugin();
  const [paymentStep, setPaymentStep] = useState(0);
  const [method, setMethod] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('500.00');

  const startPayment = (type) => {
    setMethod(type);
    setPaymentStep(1);
  };

  const handleIdSubmit = (e) => {
    e.preventDefault();
    if (upiId.includes('@')) {
      setRecipient(upiId);
      setPaymentStep(2);
    }
  };

  const handleScanSuccess = () => {
    setRecipient("Merchant_QR_7721");
    setPaymentStep(2);
  };

  const handlePay = async () => {
    setPaymentStep(3);
    const success = await processPayment(amount, recipient);
    if (success) setPaymentStep(4);
  };

  const resetFlow = () => {
    setPaymentStep(0);
    setMethod(null);
    setUpiId('');
    setView('dashboard');
  };

  const renderDashboard = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-indigo-500/30 p-6 rounded-2xl shadow-xl hover:shadow-indigo-500/10 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-white">Security Status</h3>
          </div>
          <p className="text-3xl font-bold text-green-400">Quantum-Safe</p>
          <p className="text-slate-400 text-sm mt-2">Hybrid Dilithium + ECDSA Active</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <RefreshCcw className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="font-semibold text-white">Crypto Agility</h3>
          </div>
          <p className="text-3xl font-bold text-white">Level 4</p>
          <p className="text-slate-400 text-sm mt-2">NIST Round 3 Standards</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white">Latency</h3>
          </div>
          <p className="text-3xl font-bold text-white">+12ms</p>
          <p className="text-slate-400 text-sm mt-2">Optimized for Mobile SDK</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-8 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-6">
          <Smartphone className="w-10 h-10 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">PQC-Secured Gateway</h2>
        <p className="text-slate-400 max-w-sm mb-8">Initiate a payment using quantum-resilient signatures to protect against "Harvest Now, Decrypt Later" attacks.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
           <button 
             onClick={() => { setView('payment'); startPayment('scan'); }}
             className="flex flex-col items-center gap-3 p-6 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl transition-all group"
           >
             <QrCode className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
             <span className="font-bold text-white">Scan QR Code</span>
           </button>
           <button 
             onClick={() => { setView('payment'); startPayment('id'); }}
             className="flex flex-col items-center gap-3 p-6 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl transition-all group"
           >
             <Keyboard className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
             <span className="font-bold text-white">Enter UPI ID</span>
           </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentFlow = () => {
    if (paymentStep === 0) return renderDashboard();
    
    if (paymentStep === 1) {
      return (
        <div className="max-w-md mx-auto animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-6">
             <button onClick={resetFlow} className="p-2 hover:bg-slate-800 rounded-full text-slate-400"><X /></button>
             <h2 className="text-xl font-bold text-white">{method === 'scan' ? 'Scan Merchant QR' : 'Manual Entry'}</h2>
             <div className="w-8"></div>
          </div>

          {method === 'scan' ? (
            <div className="relative aspect-square bg-black rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl group">
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                 <div className="w-64 h-64 border-2 border-indigo-500/50 rounded-2xl relative">
                    <div className="absolute inset-0 border-2 border-indigo-400 rounded-2xl animate-pulse"></div>
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)] animate-scan"></div>
                    <QrCode className="w-full h-full p-12 text-slate-800" />
                 </div>
              </div>
              <div className="absolute bottom-8 left-0 right-0 px-8">
                 <button 
                   onClick={handleScanSuccess}
                   className="w-full py-4 bg-indigo-600/90 backdrop-blur-md text-white font-bold rounded-xl flex items-center justify-center gap-2"
                 >
                   <Camera className="w-5 h-5" /> Simulate Scan
                 </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-purple-400" />
              </div>
              <form onSubmit={handleIdSubmit} className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Receiver UPI ID</label>
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="name@bank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 px-6 text-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <button 
                  disabled={!upiId.includes('@')}
                  className="w-full py-4 bg-purple-600 disabled:opacity-50 hover:bg-purple-500 text-white font-bold rounded-xl transition-all"
                >
                  Verify & Continue
                </button>
              </form>
            </div>
          )}
        </div>
      );
    }

    if (paymentStep === 2) {
      return (
        <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-4 mb-8 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
              {recipient[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm text-slate-400">Paying to</p>
              <p className="font-bold text-white">{recipient}</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-6">Enter Amount</h2>
          <div className="relative mb-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-3xl">₹</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl py-6 pl-12 pr-6 text-4xl font-bold text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button 
            onClick={handlePay}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20"
          >
            Pay Securely (PQC)
          </button>
        </div>
      );
    }

    if (paymentStep === 3) {
      return (
        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in duration-500">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                Hybrid PQC Signing Layer
              </h2>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-75"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-150"></span>
              </div>
            </div>

            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 animate-in slide-in-from-left duration-300">
                  <div className={`mt-1 p-1 rounded-md ${
                    log.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {log.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${log.type === 'success' ? 'text-green-400' : 'text-slate-300'}`}>
                      {log.message}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto bg-slate-900 border border-green-500/30 rounded-3xl p-8 text-center shadow-2xl animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Transaction Success</h2>
        <p className="text-slate-400 mb-8">
          Sent <strong>₹{amount}</strong> to <strong>{recipient}</strong> securely.
        </p>
        <div className="bg-slate-950 rounded-2xl p-4 mb-8 text-left border border-slate-800">
           <div className="flex justify-between mb-2">
             <span className="text-xs text-slate-500">Protection</span>
             <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Hybrid Dilithium-L3</span>
           </div>
           <div className="flex justify-between">
             <span className="text-xs text-slate-500">Policy</span>
             <span className="text-xs text-green-400 font-bold">Fail-Forward Enabled</span>
           </div>
        </div>
        <button 
          onClick={resetFlow}
          className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all"
        >
          Finish
        </button>
      </div>
    );
  };

  const renderInfo = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Info className="w-6 h-6 text-indigo-400" />
          Quantum Resilient Infrastructure
        </h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          Our UPI Plugin uses a modular SDK approach. Instead of replacing the banking core, we wrap transaction signatures in a post-quantum shield.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-indigo-400 font-bold mb-2 text-sm uppercase">Signature 1: ECDSA</h3>
              <p className="text-slate-400 text-sm">Maintains backward compatibility with all existing UPI apps and bank nodes.</p>
           </div>
           <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-purple-400 font-bold mb-2 text-sm uppercase">Signature 2: Dilithium</h3>
              <p className="text-slate-400 text-sm">NIST-standard lattice-based signature providing 128-bit quantum security.</p>
           </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetFlow}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
               <h1 className="text-lg font-bold text-white leading-tight">PQC UPI</h1>
               <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase">Plugin SDK v1.0</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setView('dashboard')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'dashboard' ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-400 hover:text-white'}`}>Home</button>
            <button onClick={() => setView('info')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'info' ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-400 hover:text-white'}`}>Architecture</button>
          </div>

          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500"></div>
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Network Secure</span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
        {view === 'dashboard' && renderDashboard()}
        {view === 'payment' && renderPaymentFlow()}
        {view === 'info' && renderInfo()}</div>
      </main>

      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] -z-10 rounded-full"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] -z-10 rounded-full"></div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 10%; }
          100% { top: 90%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4f46e5;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}
