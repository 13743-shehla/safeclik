
import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Mail,
  Globe,
  Lock,
  CheckCircle2,
  RefreshCw,
  Info
} from 'lucide-react';
import { mockOSINTScanResult } from '../../data/mockData';
import { OSINTScanResult } from '../../types';
import { Badge } from '../../components/Badge';



  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setScanning(true);
    setTimeout(() => {
      const currentDomain = domainInput.trim() export const OSINTPage: React.FC = () => {
  const [domainInput, setDomainInput] = useState('example.com');

  // Məlumatlardakı acmecorp.com ifadələrini dinamik olaraq dəyişən köməkçi funksiya
  const getFormattedMockData = (domain: string) => ({
    ...mockOSINTScanResult,
    domain: domain,
    mail_security: {
      ...mockOSINTScanResult.mail_security,
      details: mockOSINTScanResult.mail_security.details.replaceAll('acmecorp.com', domain)
    },
    vulnerability_indicators: mockOSINTScanResult.vulnerability_indicators.map(item => 
      item.replaceAll('acmecorp.com', domain)
    ),
    recommendations: mockOSINTScanResult.recommendations.map(item => 
      item.replaceAll('acmecorp.com', domain)
    )
  });

  const [scanResult, setScanResult] = useState<OSINTScanResult>(getFormattedMockData('example.com'));
  const [scanning, setScanning] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setScanning(true);
    setTimeout(() => {
      const currentDomain = domainInput.trim() || 'example.com';
      setScanResult({
        ...getFormattedMockData(currentDomain),
        scan_date: new Date().toISOString(),
        exposure_score: Math.floor(Math.random() * 30) + 20,
        mail_security: {
          ...mockOSINTScanResult.mail_security,
          details: `v=DMARC1; p=reject; rua=mailto:dmarc-reports@${currentDomain}`
        }
      });
      setScanning(false);
    }, 1200);
  };|| 'example.com';
      setScanResult({
        ...mockOSINTScanResult,
        domain: currentDomain,
        scan_date: new Date().toISOString(),
        exposure_score: Math.floor(Math.random() * 30) + 20,
        mail_security: {
          ...mockOSINTScanResult.mail_security,
          details: `v=DMARC1; p=reject; rua=mailto:dmarc-reports@${currentDomain}`
        },
        vulnerability_indicators: mockOSINTScanResult.vulnerability_indicators.map(item =>
          item.replaceAll('acmecorp.com', currentDomain)
        )
      });
      setScanning(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">OSINT Awareness & Exposure Audit</h1>
            <Badge variant="purple" size="sm" dot>PASSIVE AUDIT ONLY</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Safe educational reconnaissance demonstrating what threat actors can see from public DNS and breach archives.
          </p>
        </div>
      </div>

      {/* Domain Scanner Input Card */}
      <div className="cyber-card p-6 border-slate-800 bg-slate-900/90 space-y-4">
        <form onSubmit={handleScan} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              required
              placeholder="e.g. example.com"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono transition-colors"
            />
            <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>

          <button
            type="submit"
            disabled={scanning}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {scanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>{scanning ? 'Running Passive OSINT Scan...' : 'Audit Domain Exposure'}</span>
          </button>
        </form>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Info className="w-3.5 h-3.5" />
          <span>Non-intrusive: Only inspects public DNS records, mail authentication, and synthetic breach metadata.</span>
        </div>
      </div>

      {/* Results Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Exposure Score Card */}
        <div className="cyber-card p-6 border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
          <span className="text-xs font-mono uppercase text-slate-400">Public Exposure Risk</span>
          
          <div className="w-28 h-28 rounded-full border-4 border-slate-800 flex flex-col items-center justify-center bg-slate-950">
            <span className="text-3xl font-extrabold text-cyan-400 font-mono">{scanResult.exposure_score}</span>
            <span className="text-[10px] text-slate-500">/ 100</span>
          </div>

          <Badge variant="cyan" size="md">
            LOW ATTACK SURFACE
          </Badge>

          <p className="text-[11px] text-slate-400">
            Domain <code>{scanResult.domain}</code> has strict mail spoofing prevention configured.
          </p>
        </div>

        {/* Mail Spoofing Defense (SPF / DMARC) */}
        <div className="lg:col-span-2 cyber-card p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-400" />
              <span>Mail Authentication & Anti-Spoofing Posture</span>
            </h2>
            <Badge variant="emerald" size="sm">STRONG</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">SPF (Sender Policy Framework)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400">
                Authorizes permitted mail servers, preventing unauthorized senders from using <code>@{scanResult.domain}</code>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">DMARC Enforcement</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400">
                Policy set to <code>p=reject</code>. Deceptive emails spoofing this domain are rejected by major mail providers.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-slate-400">
            <strong>Raw DNS Policy Record:</strong> {scanResult.mail_security.details}
          </div>
        </div>

      </div>

      {/* Vulnerability Indicators & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Indicators */}
        <div className="cyber-card p-6 border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Public Footprint Observations</span>
          </h2>

          <div className="space-y-2.5">
            {scanResult.vulnerability_indicators.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="cyber-card p-6 border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Remediation & Defense Advice</span>
          </h2>

          <div className="space-y-2.5">
            {scanResult.recommendations.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
