import React, { useState, useEffect, useMemo } from 'react';
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
  Keyboard,
  Fingerprint,
  History,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  LockKeyhole,
  Activity,
  ArrowLeftRight,
  Skull
} from 'lucide-react';

// --- PQC Simulation Hook ---
const usePQCEngine = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  const addLog = (message, type = 'info', meta = '') => {
    setLogs(prev => [
      { id: Math.random(), message, type, meta, time: new Date().toLocaleTimeString() },
      ...prev
    ]);
  };

  const processTransaction = async (amount, recipient) => {
    setIsProcessing(true);
    setLogs([]);
    setProgress(0);
    
    const steps = [
      { msg: "Establishing Quantum-Resistant Tunnel...", type: "info", meta: "Kyber-768", delay: 800 },
      { msg: "Handshake: ML-KEM Encapsulation successful", type: "success", meta: "Shared Secret Derived", delay: 600 },
      { msg: "Computing Classical Hash (SHA-256)...", type: "info", meta: "Standard Digest", delay: 500 },
      { msg: "Signing: ECDSA r|s pair generated", type: "info", meta: "Legacy Node Compatibility", delay: 700 },
      { msg: "Signing: ML-DSA-65 (Dilithium) Signature...", type: "info", meta: "Lattice-based security", delay: 1000 },
      { msg: "Hybrid Payload Bundled", type: "success", meta: "Ready for transmission", delay: 400 },
      { msg: "Relaying to NPCI PQC Gateway...", type: "info", meta: "Encrypted via AES-256-GCM", delay: 1200 },
      { msg: "Gateway: Hybrid Verification PASSED", type: "success", meta: "Dilithium L3 Validated", delay: 600 }
    ];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      addLog(step.msg, step.type, step.meta);
      setProgress(((i + 1) / steps.length) * 100);
      await new Promise(r => setTimeout(r, step.delay));
    }

    setIsProcessing(false);
    return true;
  };

  return { processTransaction, isProcessing, logs, progress };
};

// --- Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-stone-900/40 backdrop-blur-md border border-stone-800 rounded-3xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "maroon" }) => {
  const colors = {
    maroon: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    purple: "bg-rose-900/20 text-rose-300 border-rose-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[color]}`}>
      {children}
    </span>
  );
};

export default function App() {
  const [view, setView] = useState('dashboard'); // dashboard, payment, vault, success
  const { processTransaction, isProcessing, logs, progress } = usePQCEngine();
  const [paymentStep, setPaymentStep] = useState(0); // 0: Start, 1: Scan/ID, 2: Amount, 3: Auth, 4: Signing
  const [method, setMethod] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('1250.00');
  const [showComparison, setShowComparison] = useState(false);

  const startPayment = (type) => {
    setMethod(type);
    setPaymentStep(1);
    setView('payment');
  };

  const handleIdSubmit = (e) => {
    e.preventDefault();
    if (upiId.includes('@')) {
      setRecipient(upiId);
      setPaymentStep(2);
    }
  };

  const handleScanSuccess = () => {
    setRecipient("QuantumStore@ybl");
    setPaymentStep(2);
  };

  const handleAuthSuccess = () => {
    setPaymentStep(4);
    handleExecutePayment();
  };

  const handleExecutePayment = async () => {
    const success = await processTransaction(amount, recipient);
    if (success) {
      setTimeout(() => setView('success'), 500);
    }
  };

  const resetFlow = () => {
    setPaymentStep(0);
    setMethod(null);
    setUpiId('');
    setView('dashboard');
  };

  // --- Views ---

  const Dashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Quantum Shield</h1>
          <p className="text-stone-400 mt-1">Your payments are protected against harvest-now-decrypt-later attacks.</p>
        </div>
        <Badge color="green">Network Safe</Badge>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-rose-500/20 bg-rose-950/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-rose-500/20 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-rose-400" />
            </div>
            <Badge color="maroon">Active</Badge>
          </div>
          <p className="text-sm text-stone-400 font-medium">Security Standard</p>
          <p className="text-xl font-bold text-white">FIPS 203 & 204</p>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-rose-900/30 rounded-xl">
              <LockKeyhole className="w-6 h-6 text-rose-300" />
            </div>
            <Badge color="purple">ML-DSA</Badge>
          </div>
          <p className="text-sm text-stone-400 font-medium">Signing Layer</p>
          <p className="text-xl font-bold text-white">Dilithium-L3</p>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-500/20 rounded-xl">
              <Activity className="w-6 h-6 text-amber-400" />
            </div>
            <Badge color="amber">Optimized</Badge>
          </div>
          <p className="text-sm text-stone-400 font-medium">Avg. Overhead</p>
          <p className="text-xl font-bold text-white">+14.2ms</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white px-1">Quick Pay</h2>
          <button 
            onClick={() => startPayment('scan')}
            className="flex items-center justify-between p-6 bg-stone-900/60 border border-stone-800 rounded-3xl hover:border-rose-500/50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-500/10 rounded-2xl group-hover:bg-rose-500/20 transition-colors">
                <QrCode className="w-8 h-8 text-rose-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Scan Merchant QR</p>
                <p className="text-sm text-stone-500">Fast & Secure Transaction</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-600 group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={() => startPayment('id')}
            className="flex items-center justify-between p-6 bg-stone-900/60 border border-stone-800 rounded-3xl hover:border-rose-900/50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-900/20 rounded-2xl group-hover:bg-rose-900/40 transition-colors">
                <Keyboard className="w-8 h-8 text-rose-300" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Pay via UPI ID</p>
                <p className="text-sm text-stone-500">Manual entry for peer transfer</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white px-1">Security Health</h2>
          <Card className="p-8 flex-1 flex flex-col justify-center items-center text-center">
            <div className="relative mb-6">
              <Shield className="w-20 h-20 text-rose-500/10 fill-rose-500/5" />
              <ShieldCheck className="w-12 h-12 text-rose-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Agile Cryptography</h3>
            <p className="text-stone-400 text-sm max-w-xs leading-relaxed">
              Your device has registered a <strong>Quantum-Ready</strong> hardware security module. 
            </p>
            <button 
              onClick={() => setView('vault')}
              className="mt-6 px-6 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-sm font-bold transition-all border border-rose-500/20"
            >
              Learn More
            </button>
          </Card>
        </div>
      </div>
    </div>
  );

  const PaymentFlow = () => {
    // Step 1: Scan or ID Entry
    if (paymentStep === 1) {
      return (
        <div className="max-w-md mx-auto animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-8">
            <button onClick={resetFlow} className="p-2 bg-stone-800 rounded-full text-stone-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold text-white">{method === 'scan' ? 'Scan to Pay' : 'Enter Receiver Details'}</h2>
            <div className="w-9"></div>
          </div>

          {method === 'scan' ? (
            <div className="space-y-6">
              <div className="relative aspect-square bg-stone-950 rounded-[2.5rem] overflow-hidden border border-stone-800 shadow-2xl group ring-1 ring-stone-800">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(159,18,57,0.1),transparent)]"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                   <div className="w-full h-full border-2 border-dashed border-rose-500/30 rounded-3xl relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-rose-600 shadow-[0_0_20px_rgba(159,18,57,0.8)] animate-scan-line"></div>
                      <QrCode className="w-full h-full p-12 text-stone-800 opacity-50" />
                   </div>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                   <button 
                     onClick={handleScanSuccess}
                     className="w-full py-4 bg-rose-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-black/40 hover:bg-rose-700 transition-all"
                   >
                     <Camera className="w-5 h-5" /> Simulate QR Scan
                   </button>
                </div>
              </div>
              <p className="text-center text-stone-500 text-sm">Align QR code within the frame</p>
            </div>
          ) : (
            <Card className="p-8">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-rose-400" />
              </div>
              <form onSubmit={handleIdSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Receiver UPI ID</label>
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="username@bank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-2xl py-4 px-6 text-xl text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-stone-700"
                  />
                </div>
                <button 
                  disabled={!upiId.includes('@')}
                  className="w-full py-4 bg-rose-800 disabled:opacity-30 hover:bg-rose-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-black/20"
                >
                  Verify Recipient
                </button>
              </form>
            </Card>
          )}
        </div>
      );
    }

    // Step 2: Amount Entry
    if (paymentStep === 2) {
      return (
        <div className="max-w-md mx-auto animate-in slide-in-from-bottom-6 duration-400">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setPaymentStep(1)} className="p-2 bg-stone-800 rounded-full text-stone-400"><ArrowRight className="w-5 h-5 rotate-180" /></button>
            <h2 className="text-xl font-bold text-white">Payment Amount</h2>
            <div className="w-9"></div>
          </div>

          <Card className="p-8">
            <div className="flex items-center gap-4 mb-8 p-4 bg-stone-950 rounded-2xl border border-stone-800">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-700 to-black rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {recipient[0].toUpperCase()}
              </div>
              <div>
                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Paying to</p>
                <p className="font-bold text-white truncate max-w-[200px]">{recipient}</p>
              </div>
            </div>
            
            <div className="relative mb-8 group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-600 text-3xl font-light">₹</span>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-3xl py-10 pl-14 pr-6 text-5xl font-bold text-white focus:outline-none focus:border-rose-500 transition-all text-center"
              />
            </div>

            <button 
              onClick={() => setPaymentStep(3)}
              className="w-full py-5 bg-rose-800 hover:bg-rose-700 text-white text-lg font-bold rounded-2xl transition-all shadow-xl shadow-black/40"
            >
              Continue Securely
            </button>
          </Card>
        </div>
      );
    }

    // Step 3: Biometric Auth
    if (paymentStep === 3) {
      return (
        <div className="max-w-md mx-auto text-center animate-in zoom-in-95 duration-400">
          <div className="mb-12">
            <div className="w-24 h-24 bg-stone-900 border border-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 relative group cursor-pointer" onClick={handleAuthSuccess}>
              <Fingerprint className="w-12 h-12 text-rose-400 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 border-2 border-rose-500/30 rounded-full animate-ping scale-75 opacity-20"></div>
            </div>
            <h2 className="text-2xl font-bold text-white">Authorize Transaction</h2>
            <p className="text-stone-400 mt-2">Tap fingerprint sensor to sign request</p>
          </div>

          <Card className="p-6 text-left">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-stone-800">
              <span className="text-stone-400 text-sm">Amount</span>
              <span className="text-white font-bold text-lg">₹{amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-400 text-sm">Security Policy</span>
              <Badge color="green">PQC-Hybrid enforced</Badge>
            </div>
          </Card>
        </div>
      );
    }

    // Step 4: PQC Signing (Executing)
    if (paymentStep === 4) {
      return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
          <Card className="p-1">
            <div className="h-1 bg-rose-700 transition-all duration-300 rounded-full" style={{ width: `${progress}%` }}></div>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-8 flex flex-col justify-center items-center text-center bg-rose-900/10 border-rose-500/20">
              <div className="relative mb-8">
                 <div className="w-32 h-32 border-4 border-rose-500/10 rounded-full flex items-center justify-center">
                    <Cpu className="w-12 h-12 text-rose-400 animate-pulse" />
                 </div>
                 <svg className="absolute top-0 left-0 w-32 h-32 -rotate-90">
                    <circle 
                      cx="64" cy="64" r="60" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      className="text-rose-700"
                      strokeDasharray="377"
                      strokeDashoffset={377 - (377 * progress / 100)}
                    />
                 </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">PQC Signing Engine</h3>
              <p className="text-stone-400 text-sm">Generating dual-layer signatures for maximum longevity.</p>
            </Card>

            <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 overflow-hidden flex flex-col h-[380px]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Live Transaction Logs
                </h4>
              </div>
              <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 bg-stone-950/50 rounded-xl border border-stone-800/50 animate-in slide-in-from-left-4 duration-300">
                    <div className={`mt-0.5 p-1 rounded-md ${
                      log.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {log.type === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${log.type === 'success' ? 'text-green-400' : 'text-stone-200'}`}>
                        {log.message}
                      </p>
                      <p className="text-[10px] text-stone-500 font-mono mt-0.5 flex justify-between items-center">
                        <span>{log.meta}</span>
                        <span>{log.time}</span>
                      </p>
                    </div>
                  </div>
                ))}
                {logs.length === 0 && (
                  <div className="h-full flex items-center justify-center text-stone-600 text-sm italic">
                    Initializing...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const SuccessView = () => (
    <div className="max-w-md mx-auto text-center animate-in zoom-in-95 duration-500">
      <Card className="p-10 border-green-500/30">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Payment Sent</h2>
        <p className="text-stone-400 mb-8">
          ₹{amount} successfully sent to<br/><span className="text-white font-medium">{recipient}</span>
        </p>
        
        <div className="bg-stone-950 rounded-2xl p-5 mb-8 text-left border border-stone-800 space-y-3">
           <div className="flex justify-between items-center">
             <span className="text-xs text-stone-500">Protection Layer</span>
             <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">Dilithium-Hybrid</span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-xs text-stone-500">Auth Method</span>
             <span className="text-xs text-stone-300 font-medium flex items-center gap-1">
               <Fingerprint className="w-3 h-3" /> Biometric
             </span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-xs text-stone-500">Transaction ID</span>
             <span className="text-xs text-stone-500 font-mono">TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
           </div>
        </div>

        <button 
          onClick={resetFlow}
          className="w-full py-4 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-2xl transition-all border border-stone-700"
        >
          Return to Dashboard
        </button>
      </Card>
    </div>
  );

  const VaultView = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <button onClick={resetFlow} className="flex items-center gap-2 text-rose-400 text-sm font-bold hover:text-rose-300 transition-colors mb-4">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to App
          </button>
          <h2 className="text-4xl font-bold text-white">Quantum Resilience</h2>
          <p className="text-stone-400 mt-2 text-lg">Why legacy cryptography is no longer enough for digital payments.</p>
        </div>
        
        {/* Toggle Bar */}
        <div className="bg-stone-900/80 border border-stone-800 p-1.5 rounded-2xl flex items-center gap-1">
          <button 
            onClick={() => setShowComparison(false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${!showComparison ? 'bg-rose-800 text-white shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
          >
            Core Concepts
          </button>
          <button 
            onClick={() => setShowComparison(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${showComparison ? 'bg-rose-800 text-white shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
          >
            Tech Comparison
          </button>
        </div>
      </header>

      {!showComparison ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
          <section className="space-y-4">
            <Card className="p-8 border-amber-500/20 bg-amber-500/5">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">The "Harvest Now" Threat</h3>
              <p className="text-stone-400 leading-relaxed text-sm">
                Adversaries are currently intercepting and storing encrypted payment metadata. Once a Cryptographically Relevant Quantum Computer (CRQC) is built, they will be able to decrypt your transaction history retroactively.
              </p>
            </Card>
            
            <Card className="p-8">
              <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center mb-6">
                <RefreshCcw className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Crypto Agility</h3>
              <p className="text-stone-400 leading-relaxed text-sm">
                Our plugin is designed for seamless transitions. If one lattice-based algorithm is found weak, the SDK can be hot-swapped for a different NIST standard without requiring bank-side core logic changes.
              </p>
            </Card>
          </section>

          <section className="space-y-6">
            <h3 className="text-lg font-bold text-white px-1">Applied Algorithms</h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-5 bg-stone-900/60 border border-stone-800 rounded-3xl">
                <div className="w-10 h-10 shrink-0 bg-stone-950 rounded-xl flex items-center justify-center border border-stone-800">
                  <Lock className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white">ML-KEM (Kyber)</h4>
                  <p className="text-xs text-stone-500 mt-1">Used for Key Encapsulation. Ensures that even the communication channel between your app and the bank is quantum-safe.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-stone-900/60 border border-stone-800 rounded-3xl">
                <div className="w-10 h-10 shrink-0 bg-stone-950 rounded-xl flex items-center justify-center border border-stone-800">
                  <Shield className="w-5 h-5 text-rose-300" />
                </div>
                <div>
                  <h4 className="font-bold text-white">ML-DSA (Dilithium)</h4>
                  <p className="text-xs text-stone-500 mt-1">Primary signature algorithm. Provides the mathematical proof that the payment request was authorized by you.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-stone-900/60 border border-stone-800 rounded-3xl opacity-50">
                <div className="w-10 h-10 shrink-0 bg-stone-950 rounded-xl flex items-center justify-center border border-stone-800">
                  <Zap className="w-5 h-5 text-stone-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white">ECDSA (Legacy)</h4>
                  <p className="text-xs text-stone-500 mt-1">Retained for backward compatibility with current UPI nodes during the transition period.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
          <Card className="p-0 overflow-hidden border-rose-500/20">
            <div className="grid grid-cols-3 bg-stone-950 border-b border-stone-800 p-4 font-bold text-xs uppercase tracking-widest text-stone-500">
               <div>Feature</div>
               <div>Existing (Legacy)</div>
               <div className="text-rose-400">Shield UPI (PQC)</div>
            </div>
            
            <div className="divide-y divide-stone-800/30">
              {[
                { label: "Attack Resistance", legacy: "Vulnerable to Shor's", pqc: "Quantum-Resistant", v: true },
                { label: "HNDL Protection", legacy: "None (Fatal)", pqc: "Enforced", v: true },
                { label: "Key Strength", legacy: "256-bit ECDSA", pqc: "Lattice-based L3", v: false },
                { label: "Signature Size", legacy: "Small (64 bytes)", pqc: "Large (2420 bytes)", v: false, note: "Balanced via SDK" },
                { label: "Security Lifespan", legacy: "Expires ~2030", pqc: "Decades (Agile)", v: false },
                { label: "Complexity", legacy: "Prime/Elliptic", pqc: "LWE/Lattices", v: false }
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 p-4 items-center text-sm">
                   <div className="font-medium text-stone-400">{row.label}</div>
                   <div className="flex items-center gap-2">
                      {row.v ? <Skull className="w-3.5 h-3.5 text-red-500/50" /> : <div className="w-3.5" />}
                      <span className={row.v ? 'text-red-400/80' : 'text-stone-500'}>{row.legacy}</span>
                   </div>
                   <div className="flex items-center gap-2 font-bold text-white">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                      {row.pqc}
                   </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="p-6 bg-red-500/5 border-red-500/20">
                <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                  <Skull className="w-4 h-4" /> Vulnerability Results
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Legacy UPI apps rely on ECDSA. A quantum computer with ~4000 logical qubits can solve the Elliptic Curve Discrete Logarithm Problem in minutes, effectively breaking all current bank signatures.
                </p>
             </Card>
             <Card className="p-6 bg-green-500/5 border-green-500/20">
                <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Defense Results
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Shield UPI utilizes Module-Lattice signatures (ML-DSA). These problems are conjectured to be hard for both classical and quantum computers, securing your assets against future compute scaling.
                </p>
             </Card>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0a0a] text-stone-200 font-sans selection:bg-rose-500/30">
      {/* Background elements */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-rose-900/10 blur-[150px] -z-10 rounded-full animate-pulse"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-red-950/10 blur-[150px] -z-10 rounded-full animate-pulse delay-700"></div>
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.1] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0a0a]/80 backdrop-blur-xl border-b border-stone-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={resetFlow}>
            <div className="w-10 h-10 bg-rose-800 rounded-xl flex items-center justify-center shadow-lg shadow-rose-950/40 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
               <h1 className="text-lg font-bold text-white leading-tight">Shield UPI</h1>
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-[9px] text-rose-400 font-bold tracking-[0.2em] uppercase">Post-Quantum SDK</p>
               </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => { resetFlow(); setView('dashboard'); }} 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'dashboard' ? 'bg-white/5 text-white' : 'text-stone-500 hover:text-white'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setView('vault')} 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'vault' ? 'bg-white/5 text-white' : 'text-stone-500 hover:text-white'}`}
            >
              Vault
            </button>
            <div className="w-px h-4 bg-stone-800 mx-2"></div>
            <button className="p-2 text-stone-500 hover:text-white transition-colors">
              <History className="w-5 h-5" />
            </button>
          </div>

          <div className="p-1 bg-stone-900 border border-stone-800 rounded-full flex items-center gap-3 px-3">
             <div className="w-6 h-6 bg-gradient-to-tr from-rose-800 to-black rounded-full border border-white/20"></div>
             <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest hidden sm:inline">Anjali Tiwari</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {view === 'dashboard' && <Dashboard />}
        {view === 'payment' && <PaymentFlow />}
        {view === 'success' && <SuccessView />}
        {view === 'vault' && <VaultView />}
      </main>

      {/* Footer / Meta */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 px-8 border-t border-stone-900 bg-[#0d0a0a]/90 backdrop-blur-md flex justify-between items-center z-40">
        <div className="flex gap-4">
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
             <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Gateway Verified</span>
           </div>
           <div className="hidden sm:flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-rose-700"></div>
             <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">NIST FIPS-203</span>
           </div>
        </div>
        <p className="text-[10px] text-stone-700 font-mono">ENCLAVE_ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-line {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 3s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(41, 37, 36, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(159, 18, 57, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(159, 18, 57, 0.5);
        }
        @font-face {
          font-family: 'Geist';
          src: url('https://cdn.jsdelivr.net/npm/geist@1.0.3/dist/fonts/geist-sans/Geist-Medium.woff2') format('woff2');
        }
        body {
          font-family: 'Geist', sans-serif;
        }
      `}} />
    </div>
  );
}