"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity, Brain, Database, FileText, Globe, LineChart,
  Cpu, Smartphone, ChevronLeft,
  ChevronRight, AlertCircle, TrendingUp, Users, HeartPulse, Building2,
  Play, Pause, ArrowRight, X, Zap, Instagram, Facebook, Mail, Maximize2, Minimize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════
   DESIGN SYSTEM - Zimbabwe Heritage × Health-Tech Fusion
   Color range: earthy ochre, deep forest green, royal gold, charcoal
   ═══════════════════════════════════════════════════════════════════ */

const designSystem = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Inter:wght@400;500;600;700;800;900&display=swap');

  :root {
    --gold: #C8A44E;
    --gold-bright: #E8C86A;
    --ochre: #D4A843;
    --forest: #1B5E38;
    --forest-bright: #22c55e;
    --stone: #2A2520;
    --stone-light: #3D3630;
    --charcoal: #0A0908;
    --parchment: #F2E8D5;
  }

  @keyframes floatUp { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-12px); } }
  @keyframes shimmer { 0%{ background-position: -200% center; } 100%{ background-position: 200% center; } }
  @keyframes pulseGold { 0%,100%{ box-shadow: 0 0 20px rgba(200,164,78,0.15); } 50%{ box-shadow: 0 0 60px rgba(200,164,78,0.4); } }
  @keyframes breathe { 0%,100%{ opacity:0.3; } 50%{ opacity:0.7; } }

  .font-serif { font-family: 'Playfair Display', Georgia, serif; }
  .font-sans { font-family: 'Inter', system-ui, sans-serif; }

  .glass-heritage {
    background: linear-gradient(135deg, rgba(42,37,32,0.85) 0%, rgba(10,9,8,0.92) 100%);
    backdrop-filter: blur(30px) saturate(200%);
    border: 1px solid rgba(200,164,78,0.12);
  }
  .glass-dark {
    background: rgba(10,9,8,0.75);
    backdrop-filter: blur(25px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.06);
  }

  .gold-shimmer {
    background: linear-gradient(90deg, var(--gold), var(--gold-bright), var(--gold));
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }
  .text-glow-gold { text-shadow: 0 0 30px rgba(200,164,78,0.5), 0 0 60px rgba(200,164,78,0.2); }
  .text-glow-green { text-shadow: 0 0 30px rgba(34,197,94,0.4), 0 0 60px rgba(34,197,94,0.15); }

  .hover-tilt { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1); }
  .hover-tilt:hover { transform: perspective(800px) rotateY(-4deg) rotateX(2deg) translateY(-8px); }

  .chevron-pattern {
    background-image: repeating-linear-gradient(
      60deg, transparent, transparent 8px,
      rgba(200,164,78,0.03) 8px, rgba(200,164,78,0.03) 9px
    ), repeating-linear-gradient(
      -60deg, transparent, transparent 8px,
      rgba(200,164,78,0.03) 8px, rgba(200,164,78,0.03) 9px
    );
  }

  .custom-scrollbar::-webkit-scrollbar { width: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: rgba(200,164,78,0.05); }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(200,164,78,0.25); border-radius: 20px; }

  .img-vignette {
    mask-image: radial-gradient(ellipse 100% 90% at 50% 50%, black 20%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 100% 90% at 50% 50%, black 20%, transparent 80%);
  }
  .img-fade {
    mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
  }
`;

/* ═══════════════════════════════════════════════════════════════════
   SLIDE COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

const WalkthroughModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80">
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-[0_0_120px_rgba(200,164,78,0.15)] relative glass-heritage">
        <button onClick={onClose} className="absolute top-10 right-10 text-white/30 hover:text-white transition-colors z-[600] flex items-center gap-2 group">
          <span className="text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity font-sans">Close</span>
          <X className="w-7 h-7" />
        </button>
        <div className="aspect-video bg-black flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-transparent to-transparent z-10" />
          <div className="aspect-video bg-black relative overflow-hidden group w-full h-full shadow-2xl">
            <video
              className="w-full h-full object-cover"
              src="/vision.mp4"
              autoPlay
              muted
              loop
              controls
              playsInline
              preload="auto"
            />
          </div>
          <div className="absolute bottom-12 left-12 z-20 flex items-center gap-6">
            <div className="flex -space-x-3">{[1, 2, 3].map(i => <div key={i} className="w-11 h-11 rounded-full border-2 border-black bg-[var(--charcoal)] flex items-center justify-center"><Cpu className="w-5 h-5" style={{ color: 'var(--gold)' }} /></div>)}</div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="text-white font-black text-sm uppercase tracking-tight font-sans">Sukanov Technologies</div>
              <div className="text-slate-500 text-[10px] uppercase font-bold font-sans flex items-center gap-2">
                <Globe className="w-3 h-3" /> sukanovtech.zw
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const PopWords = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0.5, y: 40 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", damping: 12, stiffness: 200 }
            }
          }}
          className="inline-block mr-[0.25em] whitespace-nowrap"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const CoreCrisisSlide = () => {
  const [selectedCrisis, setSelectedCrisis] = useState<string | null>(null);
  const crises = [
    { id: 'fragmentation', title: 'Data Sovereignty Collapse', desc: 'Patient records for 16M citizens scattered across 1,500+ clinics with zero interoperability. No unified patient matching, no longitudinal history.', icon: <FileText className="w-6 h-6" /> },
    { id: 'ncd', title: 'The NCD Crisis Matrix', desc: 'Hypertension, Diabetes & Respiratory disease account for 40% of adult mortality. 64% of diabetics remain undiagnosed until emergency presentation.', icon: <Activity className="w-6 h-6" /> },
    { id: 'emergency', title: 'Golden Hour Inefficiency', desc: 'No continuous vital monitoring means cardiac events are detected only on arrival at already-overwhelmed ICUs, after 70% of intervention window has closed.', icon: <HeartPulse className="w-6 h-6" /> },
  ];

  const crisisDetails: Record<string, { headline: string; context: string; rationale: string; stats: { label: string; value: string; role: string }[]; color: string }> = {
    'fragmentation': {
      headline: 'THE DATA SILO PARADOX',
      context: 'Zimbabwe\'s Ministry of Health and Child Care (MoHCC) oversees a network of 1,500+ facilities across 10 provinces. Each facility operates its own record-keeping method-predominantly paper-based-creating vast information islands.',
      rationale: "A patient treated for hypertension at Parirenyatwa Hospital has no linked records when they visit a rural clinic in Mashonaland. This 'Historical Blindness' forces physicians into high-risk clinical guesses, causes redundant diagnostic testing, and makes drug interaction tracking impossible. The WHO estimates this fragmentation costs the Zimbabwean health system over $400M annually in diagnostic redundancy alone.",
      stats: [
        { label: 'Patient Matching Error Rate', value: '82%', role: 'Preventable with EMR' },
        { label: 'Avg. Record Retrieval', value: '45 min', role: 'Clinical Delay' },
        { label: 'Annual System Waste', value: '$410M', role: 'Diagnostic Redundancy' }
      ],
      color: 'var(--ochre)'
    },
    'ncd': {
      headline: 'SCALING MORTALITY CURVES',
      context: 'Non-Communicable Diseases have overtaken infectious disease as the leading cause of death in Sub-Saharan Africa. Zimbabwe, with its dual HIV/NCD burden, faces a compounding crisis that existing infrastructure cannot address.',
      rationale: "Hypertension, Type 2 Diabetes, and Chronic Respiratory Disease are the silent engines of productivity loss. Without centralized telemetry, these conditions remain undetected until they manifest as high-cost clinical emergencies-strokes, renal failure, diabetic ketoacidosis. The current system identifies patients only after a primary crisis event, by which point treatment costs have escalated 10-20× compared to early intervention.",
      stats: [
        { label: 'Undiagnosed Diabetes', value: '64%', role: 'Shadow Crisis' },
        { label: 'MoHCC NCD Burden', value: '40%', role: 'Of All Deaths' },
        { label: 'HIV/NCD Comorbidity', value: '1.2M', role: 'Citizens Affected' }
      ],
      color: '#ef4444'
    },
    'emergency': {
      headline: 'THE REACTION GAP',
      context: 'Zimbabwe\'s emergency medical infrastructure is concentrated in Harare and Bulawayo. Rural populations-comprising 68% of the country-face average ambulance response times exceeding 4 hours, with many areas having no ambulance service at all.',
      rationale: "The current system is 'Threshold Reactive'-alerting only when a crisis occurs. By the time a cardiac patient reaches a Harare ICU, 70% of the optimal intervention window (the 'Golden Hour') has passed. ChroniBook moves the needle from 'Emergency Reaction' to 'Predictive Prevention' by continuously monitoring vitals and flagging deterioration trajectories up to 48 hours before clinical symptoms manifest.",
      stats: [
        { label: 'Predictive Horizon', value: '48h', role: 'Our Target' },
        { label: 'Current ER Delay', value: '+3.5h', role: 'Average Wait' },
        { label: 'Survival Impact', value: '-65%', role: 'Without Early Alert' }
      ],
      color: 'var(--forest-bright)'
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start text-left max-w-7xl mx-auto py-8">
      <div className="space-y-8">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] font-black uppercase tracking-[0.3em] font-sans">
            <AlertCircle className="w-4 h-4" /> Operational Fragility Report
          </div>
          <h3 className="text-5xl md:text-6xl font-black text-white leading-[0.95] font-serif italic">
            <PopWords text="Structural Failures" className="block" />
            <PopWords text="Costing Lives." />
          </h3>
          <p className="text-lg text-slate-400 font-sans max-w-lg leading-relaxed">Isolated paper records, unmanaged chronic conditions, and delayed telemetry are the primary systemic drivers of healthcare mortality in Zimbabwe.</p>
        </div>

        <div className="space-y-3">
          {crises.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCrisis(selectedCrisis === item.id ? null : item.id)}
              className={`group relative p-6 cursor-pointer rounded-2xl border transition-all duration-500 overflow-hidden ${selectedCrisis === item.id ? 'glass-heritage border-[var(--gold)]/30 scale-[1.02]' : 'glass-dark hover:border-white/10'}`}
            >
              <div className="flex gap-5 items-start relative z-10">
                <div className={`p-3.5 rounded-xl border transition-all ${selectedCrisis === item.id ? 'bg-[var(--gold)]/10 border-[var(--gold)]/30 text-[var(--gold)]' : 'bg-white/5 border-white/5 text-white/60 group-hover:text-white'}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <strong className="text-white text-lg font-black uppercase tracking-tight font-sans">{item.title}</strong>
                    <ChevronRight className={`w-4 h-4 text-white/20 transition-transform ${selectedCrisis === item.id ? 'rotate-90' : ''}`} />
                  </div>
                  <p className="text-slate-400 text-sm font-sans leading-relaxed">{item.desc}</p>
                </div>
              </div>
              {selectedCrisis === item.id && <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-red-500 via-[var(--gold)] to-green-500" />}
            </div>
          ))}
        </div>
      </div>

      <div className="relative min-h-[550px]">
        <AnimatePresence mode="wait">
          {selectedCrisis ? (
            <motion.div
              key={selectedCrisis}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 120, damping: 25 }}
              className="glass-heritage p-12 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative overflow-hidden h-full flex flex-col justify-between chevron-pattern"
            >
              <div className="absolute top-0 right-0 w-80 h-80 blur-[120px] rounded-full opacity-20" style={{ background: crisisDetails[selectedCrisis].color }} />

              <div className="relative z-10 space-y-6">
                <h4 className="text-4xl font-black font-serif italic tracking-tight" style={{ color: crisisDetails[selectedCrisis].color }}>{crisisDetails[selectedCrisis].headline}</h4>

                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-sans" style={{ color: crisisDetails[selectedCrisis].color }}>Context</div>
                    <p className="text-slate-300 text-base font-sans leading-relaxed">{crisisDetails[selectedCrisis].context}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-sans" style={{ color: crisisDetails[selectedCrisis].color }}>Deep Analysis</div>
                    <p className="text-slate-200 text-base font-sans leading-relaxed italic">&quot;{crisisDetails[selectedCrisis].rationale}&quot;</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  {crisisDetails[selectedCrisis].stats.map((s, i) => (
                    <div key={i} className="glass-dark p-5 rounded-2xl hover:border-white/10 transition-colors">
                      <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1.5 font-sans">{s.label}</div>
                      <div className="text-3xl font-black text-white mb-1 tracking-tight font-sans">{s.value}</div>
                      <div className="text-[9px] font-bold uppercase tracking-widest font-sans opacity-60" style={{ color: crisisDetails[selectedCrisis].color }}>{s.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setSelectedCrisis(null)} className="mt-8 group flex items-center gap-3 text-slate-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest font-sans relative z-10">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Return to Threat Matrix
              </button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-heritage rounded-[2.5rem] border-red-500/10 py-20 px-12 h-full flex flex-col items-center justify-center text-center chevron-pattern">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-red-500/15 blur-[60px] rounded-full" style={{ animation: 'breathe 4s ease-in-out infinite' }} />
                <AlertCircle className="w-28 h-28 text-red-600/80 relative z-10" />
              </div>
              <div className="text-8xl font-black text-white font-serif italic tracking-tighter mb-3">~40%</div>
              <div className="text-xs font-black text-red-500 uppercase tracking-[0.5em] mb-10 font-sans">Adult Mortality Index</div>
              <p className="text-slate-400 max-w-md mx-auto leading-relaxed font-sans text-base">Non-Communicable Diseases (NCDs) are the dominant threat to national health stability, compounded by fragmented data and zero continuous monitoring.</p>
              <p className="text-[10px] uppercase tracking-[0.3em] font-black mt-12 font-sans" style={{ color: 'var(--gold)', opacity: 0.4 }}>Select a crisis to decrypt the full analysis →</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const NationalPlatformSlide = () => {
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const pillars = [
    { id: 'emr', title: 'Unified Data Backbone', desc: 'FHIR-compliant national EMR providing secure digital health identity for every citizen from birth.', icon: <Database />, detail: 'Built on HL7 FHIR R4, our EMR creates a longitudinal patient record spanning all 1,500+ facilities. Each citizen receives a unique health identifier linked to biometric verification, enabling seamless record portability even across paper-based facilities via offline QR-code sync.' },
    { id: 'ai', title: 'Telemetry Infrastructure', desc: 'Real-time vital sign streaming from wearable biosensors to cloud-based clinical dashboards.', icon: <Activity />, detail: 'Our edge-to-cloud pipeline processes SpO2, HRV, ECG, and estimated blood pressure from commodity wearables. Data normalisation happens at the edge device level, with encrypted streams feeding into our Temporal Fusion Transformer models for real-time anomaly detection.' },
    { id: 'hospital', title: 'Clinical Command Hubs', desc: 'Live dashboards for triage prioritisation and resource allocation across hospital networks.', icon: <Building2 />, detail: 'Hospital administrators and clinicians access a unified command interface showing real-time patient acuity scores, bed occupancy, equipment availability, and predicted admission surges. The system automatically redistributes patient loads across connected facilities.' },
    { id: 'analytics', title: 'Population Health Intel', desc: 'Macro-level epidemiological intelligence for precision government health policy.', icon: <LineChart />, detail: 'Aggregated, anonymised health data provides MoHCC with real-time dashboards on disease prevalence, treatment efficacy, drug supply chain needs, and emerging outbreak patterns across all provinces-enabling data-driven policy decisions for the first time.' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-500 text-[10px] font-black uppercase tracking-[0.3em] font-sans">
          <Globe className="w-4 h-4" /> National Health Strategy v2.0
        </div>
        <h3 className="text-5xl md:text-7xl font-black text-white font-serif italic leading-[0.9]">
          <PopWords text="Transforming Isolation" className="block" />
          <PopWords text="into" className="mr-4" />
          <span className="text-glow-green" style={{ color: 'var(--forest-bright)' }}><PopWords text="Interoperability." /></span>
        </h3>
        <p className="text-xl text-slate-400 font-sans leading-relaxed max-w-2xl">We are deploying the first truly unified national health data grid in the SADC region-connecting patients, providers, and policy makers through a single interoperable data stream.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {pillars.map((item, i) => (
          <div
            key={i}
            onClick={() => setActivePillar(activePillar === item.id ? null : item.id)}
            className={`hover-tilt cursor-pointer glass-heritage p-10 rounded-[2rem] transition-all group ${activePillar === item.id ? 'border-green-500/30 ring-1 ring-green-500/10' : ''}`}
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-green-500/30 group-hover:bg-green-500/5 transition-all text-slate-400 group-hover:text-green-400">
              {React.cloneElement(item.icon as React.ReactElement, { className: "w-7 h-7" } as any)}
            </div>
            <h4 className="text-xl font-black text-white mb-3 font-sans uppercase tracking-tight">{item.title}</h4>
            <p className="text-slate-400 text-sm font-sans leading-relaxed mb-4">{item.desc}</p>
            <AnimatePresence>
              {activePillar === item.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="pt-4 mt-4 border-t border-white/10">
                    <p className="text-slate-300 text-sm font-sans leading-relaxed italic">{item.detail}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const AiLayerSlide = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const features = [
    { id: 'sensors', title: 'Proprietary Wearable SDK', desc: 'Multi-device biometric stream normalisation for clinical precision.', icon: <Smartphone /> },
    { id: 'forecasting', title: 'Crisis Forecasting Engine', desc: 'Temporal Fusion Transformers recognising catastrophic physiological trends.', icon: <Brain /> },
    { id: 'synth', title: 'Autonomous Clinical Notes', desc: 'NLP synthesis of raw telemetry into actionable physician-ready summaries.', icon: <Activity /> }
  ];

  const featureDetails: Record<string, { headline: string; context: string; rationale: string; metrics: { label: string; value: string }[] }> = {
    'sensors': {
      headline: 'BIO-STREAM TELEMETRY',
      context: 'Most wearable health devices output proprietary data formats with varying sampling rates and accuracy profiles. Our SDK sits between the device layer and the clinical cloud.',
      rationale: "We normalise SpO2, HRV, ECG wavelet data, and multi-wavelength PPG blood pressure estimates from heterogeneous wearables into a clinically-standardised stream. Edge processing on the device handles noise filtering and baseline calibration, reducing cloud bandwidth requirements by 85% while maintaining diagnostic-grade fidelity.",
      metrics: [{ label: 'PPG/BP Correlation', value: '0.89' }, { label: 'Edge Latency', value: '<500ms' }, { label: 'Battery Impact', value: '+7 Days' }]
    },
    'forecasting': {
      headline: 'THE PREDICTION ENGINE',
      context: 'Traditional vital sign monitoring uses static thresholds-alerting when a value exceeds a predefined limit. This approach catches crises in progress, not crises in formation.',
      rationale: "Our Temporal Fusion Transformers (TFTs) analyse the subtle interplay between vitals over rolling 72-hour windows. The model learns individual patient baselines and detects deviation trajectories-recognising that a gradual, correlated shift in HRV and SpO2 often precedes a cardiac event by 24-48 hours. This gives clinicians a predictive horizon orders of magnitude longer than traditional threshold monitoring.",
      metrics: [{ label: 'Anomaly Accuracy', value: '96.2%' }, { label: 'Prediction Horizon', value: '48 Hrs' }, { label: 'False Positive Rate', value: '<3%' }]
    },
    'synth': {
      headline: 'AUTONOMOUS CLINICAL SYNTHESIS',
      context: 'Physicians in resource-limited settings spend up to 40% of their time on documentation rather than patient care. ChroniBook automates the data-to-insight pipeline.',
      rationale: "Our LLM-powered synthesis layer processes days of biometric telemetry, lab results, and medication history into a single actionable clinical summary. Risk-stratified patients are automatically flagged to the top of the triage dashboard with generated recommendations. All outputs include provenance citations back to the source data, ensuring full auditability and human-in-the-loop validation.",
      metrics: [{ label: 'Admin Time Saved', value: '-80%' }, { label: 'FHIR Compliance', value: '100%' }, { label: 'Generation Latency', value: '<2s' }]
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start text-left max-w-7xl mx-auto">
      <div className="space-y-8">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border font-sans text-[10px] font-black uppercase tracking-[0.3em]" style={{ borderColor: 'rgba(200,164,78,0.3)', background: 'rgba(200,164,78,0.05)', color: 'var(--gold)' }}>
            <Zap className="w-4 h-4" /> Neural Engine Active
          </div>
          <h3 className="text-5xl md:text-7xl font-black text-white font-serif italic leading-[0.9]">
            <PopWords text="Deep Learning" className="block" />
            <PopWords text="On Live" className="mr-4" />
            <span className="text-glow-gold" style={{ color: 'var(--gold)' }}><PopWords text="Vitals." /></span>
          </h3>
          <p className="text-xl text-slate-400 font-sans max-w-lg leading-relaxed">Raw biometric data is noise. Our proprietary AI layer transforms it into a predictive health shield for every connected citizen.</p>
        </div>

        <div className="space-y-3">
          {features.map((item) => (
            <div key={item.id} onClick={() => setSelectedFeature(selectedFeature === item.id ? null : item.id)} className={`flex gap-5 items-center p-6 cursor-pointer rounded-2xl border transition-all duration-400 ${selectedFeature === item.id ? 'glass-heritage border-[var(--gold)]/20' : 'glass-dark hover:border-white/10'}`}>
              <div className={`p-3.5 rounded-xl border transition-all ${selectedFeature === item.id ? 'text-[var(--gold)]' : 'text-white/40'}`} style={selectedFeature === item.id ? { borderColor: 'rgba(200,164,78,0.3)', background: 'rgba(200,164,78,0.08)' } : { borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.03)' }}>
                {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" } as any)}
              </div>
              <div className="flex-1">
                <strong className="text-white block text-lg font-black uppercase tracking-tight font-sans">{item.title}</strong>
                <span className="text-slate-400 text-sm font-sans">{item.desc}</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-white/20 transition-transform ${selectedFeature === item.id ? 'rotate-90' : ''}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="glass-heritage p-14 rounded-[2.5rem] relative min-h-[550px] flex flex-col justify-center shadow-[0_40px_80px_rgba(0,0,0,0.5)] chevron-pattern">
        <AnimatePresence mode="wait">
          {selectedFeature ? (
            <motion.div key={selectedFeature} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <h4 className="text-4xl font-black font-serif italic" style={{ color: 'var(--gold)' }}>{featureDetails[selectedFeature].headline}</h4>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-sans" style={{ color: 'var(--gold)' }}>Context</div>
                <p className="text-slate-300 text-base font-sans leading-relaxed">{featureDetails[selectedFeature].context}</p>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-sans" style={{ color: 'var(--gold)' }}>Technical Detail</div>
                <p className="text-slate-200 text-base font-sans leading-relaxed italic">&quot;{featureDetails[selectedFeature].rationale}&quot;</p>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {featureDetails[selectedFeature].metrics.map((m, i) => (
                  <div key={i} className="glass-dark p-5 rounded-2xl">
                    <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1.5 font-sans">{m.label}</div>
                    <div className="text-3xl font-black text-white tracking-tight font-sans">{m.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="text-center flex flex-col items-center opacity-30">
              <Brain className="w-24 h-24 mb-8" />
              <p className="max-w-xs mx-auto font-serif italic text-lg">Select a neural component to decrypt the full technical breakdown.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const RoadmapSlide = () => {
  const phases = [
    { phase: '01', title: 'Clinical Pilot', date: 'Q1 2027', desc: 'Deploy at 5 high-traffic urban hospitals in Harare. Validate EMR integration, wearable data pipeline, and clinical alert accuracy with real patients.', icon: <Building2 />, status: 'Active' },
    { phase: '02', title: 'Network Expansion', date: 'Q3 2027', desc: 'Secure MoHCC endorsement. Integrate with PSMAS and private insurance systems. Expand to 25 facilities across Harare, Bulawayo, and Mutare.', icon: <Users />, status: 'Planned' },
    { phase: '03', title: 'National Integration', date: '2028', desc: 'Full alignment with the National e-Health Strategy. Deploy population health dashboards for MoHCC. Target 500+ connected facilities nationwide.', icon: <Globe />, status: 'Projected' },
    { phase: '04', title: 'Continental Scale', date: '2029+', desc: 'Export the interoperable health grid model to SADC member states-starting with Zambia, Mozambique, and Malawi through existing MoU frameworks.', icon: <TrendingUp />, status: 'Vision' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-[0.3em] font-sans mx-auto">
          <TrendingUp className="w-4 h-4" /> Execution Timeline
        </div>
        <h3 className="text-5xl md:text-7xl font-black text-white font-serif italic leading-[0.9]">
          <PopWords text="Strategic" className="mr-4" />
          <span className="gold-shimmer"><PopWords text="Roadmap." /></span>
        </h3>
        <p className="text-xl text-slate-400 font-sans leading-relaxed">From Harare pilot to continental deployment-a phased infrastructure rollout designed for clinical validation at each stage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {phases.map((p, i) => (
          <div key={i} className="hover-tilt glass-heritage p-10 rounded-[2rem] group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex justify-between items-start mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] font-sans" style={{ color: 'var(--gold)', opacity: 0.5 }}>Phase {p.phase}</span>
              <span className="text-[9px] font-black uppercase tracking-widest font-sans px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/40">{p.status}</span>
            </div>
            <div className="text-white/30 group-hover:text-white/60 transition-colors mb-6">
              {React.cloneElement(p.icon as React.ReactElement, { className: "w-8 h-8" } as any)}
            </div>
            <h4 className="text-2xl font-black text-white mb-2 font-sans uppercase tracking-tight">{p.title}</h4>
            <p className="text-sm font-sans mb-4" style={{ color: 'var(--gold)', opacity: 0.7 }}>{p.date}</p>
            <p className="text-slate-400 text-sm font-sans leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const BreakEvenSlide = () => {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const scenarios = [
    {
      id: 'conservative',
      label: 'Conservative',
      breakEven: 'Month 22',
      desc: '60% adoption by Month 12, facility licensing at $8k/mo avg'
    },
    {
      id: 'base',
      label: 'Base Case',
      breakEven: 'Month 18',
      desc: '80% adoption by Month 12, facility licensing at $12k/mo avg'
    },
    {
      id: 'optimistic',
      label: 'Optimistic',
      breakEven: 'Month 14',
      desc: '95% adoption by Month 12, facility licensing at $15k/mo + premium SLAs'
    }
  ];

  const unitEconomics = [
    { label: 'Cost per Facility (Setup)', value: '$45k', desc: 'EMR deployment, wearables, training' },
    { label: 'Monthly Recurring', value: '$12k', desc: 'Cloud, support, data delivery' },
    { label: 'Revenue per Facility', value: '$14-18k/mo', desc: 'Subscription tier, analytics premium' },
    { label: 'Gross Margin', value: '72%', desc: 'After COGS & cloud infrastructure' }
  ];

  const milestones = [
    { month: 'Month 6', event: 'Pilot complete at 5 facilities', progress: 25 },
    { month: 'Month 12', event: 'Expanded to 25 facilities', progress: 50 },
    { month: 'Month 18', event: 'Break-even achieved', progress: 75 },
    { month: 'Month 24', event: 'Positive cash flow (Base case)', progress: 100 }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-500 text-[10px] font-black uppercase tracking-[0.3em] font-sans">
          <TrendingUp className="w-4 h-4" /> Financial Viability
        </div>
        <h3 className="text-5xl md:text-7xl font-black text-white font-serif italic leading-[0.9]">
          <PopWords text="Path to" className="mr-4" />
          <span className="text-glow-green" style={{ color: 'var(--forest-bright)' }}><PopWords text="Profitability." /></span>
        </h3>
        <p className="text-xl text-slate-400 font-sans leading-relaxed">Unit economics designed for rapid facility onboarding and sustainable margin growth across the national grid.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            onClick={() => setActiveMetric(activeMetric === scenario.id ? null : scenario.id)}
            className={`cursor-pointer hover-tilt glass-heritage p-10 rounded-[2rem] transition-all ${activeMetric === scenario.id ? 'border-green-500/30 ring-1 ring-green-500/10 scale-[1.02]' : ''}`}
          >
            <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 font-sans" style={{ color: 'var(--gold)', opacity: 0.6 }}>Scenario</div>
            <h4 className="text-2xl font-black text-white mb-4 font-sans uppercase tracking-tight">{scenario.label}</h4>
            <div className="mb-4 pb-4 border-b border-white/10">
              <div className="text-4xl font-black font-sans" style={{ color: 'var(--forest-bright)' }}>{scenario.breakEven}</div>
              <div className="text-xs text-slate-400 font-sans mt-1">to break-even</div>
            </div>
            <p className="text-sm text-slate-400 font-sans leading-relaxed">{scenario.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-heritage p-12 rounded-[2.5rem] space-y-6 chevron-pattern">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/30 text-[var(--gold)] text-[9px] font-bold uppercase tracking-widest font-sans">
            Unit Economics
          </div>
          <div className="space-y-5">
            {unitEconomics.map((item, i) => (
              <div key={i} className="border-b border-white/10 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white font-black font-sans text-sm uppercase tracking-tight">{item.label}</span>
                  <span className="text-2xl font-black font-sans" style={{ color: 'var(--gold)' }}>{item.value}</span>
                </div>
                <p className="text-xs text-slate-400 font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-heritage p-12 rounded-[2.5rem] space-y-6 chevron-pattern">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/30 text-[var(--gold)] text-[9px] font-bold uppercase tracking-widest font-sans">
            Revenue Drivers
          </div>
          <div className="space-y-5">
            <div className="border-b border-white/10 pb-4">
              <div className="text-white font-black font-sans text-sm uppercase tracking-tight mb-2">Facility Licensing Model</div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">Monthly SaaS subscription (Tier 1: $8k, Tier 2: $12k, Tier 3: $18k) based on patient volume and premium analytics add-ons.</p>
            </div>
            <div className="border-b border-white/10 pb-4">
              <div className="text-white font-black font-sans text-sm uppercase tracking-tight mb-2">Data Analytics Premium</div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">Ministry of Health aggregate dashboards: $50k/year. Private insurers epidemiological feeds: $25k/year per carrier.</p>
            </div>
            <div>
              <div className="text-white font-black font-sans text-sm uppercase tracking-tight mb-2">Target Customer Base</div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">25 facilities by Month 12 → 100+ facilities by Month 24 → 500+ national grid by 2028.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-heritage p-12 rounded-[2.5rem] space-y-8 chevron-pattern">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/30 text-[var(--gold)] text-[9px] font-bold uppercase tracking-widest font-sans">
          Growth Milestones
        </div>
        <div className="space-y-6">
          {milestones.map((m, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-black text-white uppercase tracking-tight font-sans">{m.month}</div>
                  <p className="text-xs text-slate-400 font-sans mt-1">{m.event}</p>
                </div>
                <div className="text-sm font-black font-sans" style={{ color: 'var(--gold)' }}>{m.progress}%</div>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${m.progress}%`, background: 'linear-gradient(90deg, var(--forest-bright), var(--gold))' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-heritage p-10 rounded-[2rem] text-center hover-tilt">
          <div className="text-5xl font-black font-sans mb-2" style={{ color: 'var(--forest-bright)' }}>$8.4M</div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 font-sans">Year 3 Projected Revenue</div>
          <p className="text-xs text-slate-400 font-sans mt-3">Based on 100+ facility base case</p>
        </div>
        <div className="glass-heritage p-10 rounded-[2rem] text-center hover-tilt">
          <div className="text-5xl font-black font-sans mb-2" style={{ color: 'var(--gold)' }}>6.5x</div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 font-sans">ROI on $2.5M Seed</div>
          <p className="text-xs text-slate-400 font-sans mt-3">24-month return horizon</p>
        </div>
        <div className="glass-heritage p-10 rounded-[2rem] text-center hover-tilt">
          <div className="text-5xl font-black font-sans mb-2" style={{ color: 'var(--forest-bright)' }}>45%</div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 font-sans">EBITDA by Year 2</div>
          <p className="text-xs text-slate-400 font-sans mt-3">Margin expansion with scale</p>
        </div>
      </div>
    </div>
  );
};

const InvestmentAskSlide = () => {
  const categories = [
    {
      id: 'software',
      name: 'Neural Pipeline',
      amount: '$1.25M',
      icon: <Database />,
      detail: 'Retaining Zimbabwe\'s top tier-1 engineering talent (competing with $5k/mo remote roles), regional cloud redundancy at Liquid Intelligent Data Centers, and FHIR-compliant EMR integration for 25 facilities.'
    },
    {
      id: 'ai',
      name: 'Clinical AI Lab',
      amount: '$700k',
      icon: <Brain />,
      detail: 'Clinical validation studies at Parirenyatwa & Sally Mugabe Hospitals, proprietary training datasets for African biometric markers, and commercial-grade solar power for 24/7 compute uptime.'
    },
    {
      id: 'ops',
      name: 'Grid Deployment',
      amount: '$550k',
      icon: <Activity />,
      detail: 'Secure procurement of 5,000 medical telemetry wearables, managing 20-40% import duties & taxes, and field operations for facility-wide solar-backup installs to ensure data continuity during load-shedding.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-16 items-center">
      <div className="flex-1 space-y-12">
        <div className="space-y-5">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] font-sans" style={{ color: 'var(--gold)' }}>Investment Prospectus v1.0</div>
          <h3 className="text-7xl md:text-9xl font-black text-white font-serif italic tracking-tighter leading-none">
            <PopWords text="$2.5M" className="block" />
            <span style={{ color: 'var(--gold)' }}><PopWords text="Seed." /></span>
          </h3>
          <p className="text-2xl text-slate-400 font-sans max-w-xl italic leading-relaxed">Seeking strategic capital to build and validate Zimbabwe&apos;s first national healthcare telemetry grid.</p>
        </div>

        <div className="space-y-4">
          {categories.map((cat, i) => (
            <div key={i} className="glass-heritage p-10 rounded-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[var(--gold)]/30 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white/40" style={{ background: 'rgba(200,164,78,0.08)', border: '1px solid rgba(200,164,78,0.15)' }}>
                  {React.cloneElement(cat.icon as React.ReactElement, { className: "w-7 h-7" } as any)}
                </div>
                <div>
                  <div className="text-white font-black text-xl uppercase tracking-tight font-sans">{cat.name}</div>
                  <p className="text-slate-500 text-sm font-sans mt-1 max-w-md">{cat.detail}</p>
                </div>
              </div>
              <div className="font-black text-4xl tracking-tighter font-sans shrink-0" style={{ color: 'var(--gold)' }}>{cat.amount}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 glass-heritage p-12 rounded-[2.5rem] space-y-8 relative overflow-hidden group border border-[var(--gold)]/10">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <TrendingUp className="w-32 h-32" />
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/30 text-[var(--gold)] text-[9px] font-bold uppercase tracking-widest font-sans">
            Strategic Rationale
          </div>
          <h4 className="text-3xl font-serif italic font-black text-white">Why $2.5M?</h4>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-2 shrink-0" />
              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                <span className="text-white font-black">Talent Retention:</span> We compete for Zimbabwe&apos;s best engineers who earn $4k-$7k/mo in remote US/EU roles. Our Seed preserves a 24-month runway for a tier-1 technical cohort.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                <span className="text-white font-black">Harare Logistics:</span> Medical-grade telemetry hardware attracts up to 40% combined duties at ports. We are budgeting for an initial grid of 5,000 active citizen nodes.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--forest-bright)] mt-2 shrink-0" />
              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                <span className="text-white font-black">Energy Autonomy:</span> 24/7 monitoring requires decentralized solar backup for every facility to bypass load-shedding and ensure zero clinical data loss.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 font-sans">Projected IRR</div>
                <div className="text-2xl font-black text-white font-sans">32%</div>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 font-sans">Break-Even</div>
                <div className="text-2xl font-black text-white font-sans">Month 18</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   ADVANCED 3D SCENE - Zimbabwe Heritage × Health Grid
   Lerp-based camera interpolation for silky-smooth transitions
   ═══════════════════════════════════════════════════════════════════ */

const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0908, 0.012);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;

    // --- Heritage Grid (stone-textured ground plane) ---
    const gridGeo = new THREE.PlaneGeometry(200, 200, 80, 80);
    const gridPositions = gridGeo.attributes.position;
    for (let i = 0; i < gridPositions.count; i++) {
      const z = (Math.random() - 0.5) * 1.5;
      gridPositions.setZ(i, z);
    }
    gridGeo.computeVertexNormals();
    const gridMat = new THREE.MeshBasicMaterial({ color: 0x1a1510, wireframe: true, transparent: true, opacity: 0.12 });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2;
    gridMesh.position.y = -15;
    scene.add(gridMesh);

    // --- Gold Particle Constellation ---
    const particleCount = 5000;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 120;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 120;

      const t = Math.random();
      if (t < 0.5) {
        // Gold particles
        pColors[i * 3] = 0.78 + Math.random() * 0.12;
        pColors[i * 3 + 1] = 0.64 + Math.random() * 0.1;
        pColors[i * 3 + 2] = 0.18 + Math.random() * 0.1;
      } else if (t < 0.8) {
        // Forest green particles
        pColors[i * 3] = 0.08;
        pColors[i * 3 + 1] = 0.55 + Math.random() * 0.25;
        pColors[i * 3 + 2] = 0.15;
      } else {
        // Dim ochre/stone particles
        pColors[i * 3] = 0.2 + Math.random() * 0.1;
        pColors[i * 3 + 1] = 0.15 + Math.random() * 0.08;
        pColors[i * 3 + 2] = 0.08;
      }
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.08, vertexColors: true, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // --- Great Zimbabwe-Inspired Geometric Structures ---
    const structures = new THREE.Group();

    // Central Toroidal Monument (inspired by the Great Enclosure)
    const torusGeo = new THREE.TorusGeometry(8, 0.3, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0xC8A44E, wireframe: true, transparent: true, opacity: 0.08 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 2;
    structures.add(torus);

    // Inner Torus (representing the conical tower)
    const innerTorusGeo = new THREE.TorusGeometry(5, 0.2, 12, 80);
    const innerTorusMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, wireframe: true, transparent: true, opacity: 0.06 });
    const innerTorus = new THREE.Mesh(innerTorusGeo, innerTorusMat);
    innerTorus.rotation.x = Math.PI / 2;
    innerTorus.rotation.z = Math.PI / 6;
    structures.add(innerTorus);

    // Chevron-pattern wireframe pillars
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const pillarGeo = new THREE.CylinderGeometry(0.15, 0.15, 12, 6);
      const pillarMat = new THREE.MeshBasicMaterial({ color: 0xC8A44E, wireframe: true, transparent: true, opacity: 0.04 });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(Math.cos(angle) * 12, 0, Math.sin(angle) * 12);
      structures.add(pillar);
    }

    // Floating icosahedron nodes (data nexus points)
    for (let i = 0; i < 6; i++) {
      const icoGeo = new THREE.IcosahedronGeometry(Math.random() * 2 + 1, 1);
      const icoMat = new THREE.MeshBasicMaterial({ color: i < 3 ? 0xC8A44E : 0x22c55e, wireframe: true, transparent: true, opacity: 0.05 });
      const ico = new THREE.Mesh(icoGeo, icoMat);
      ico.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 40);
      structures.add(ico);
    }

    scene.add(structures);

    // --- Connection Lines (neural network effect) ---
    const lineGroup = new THREE.Group();
    const lineMat = new THREE.LineBasicMaterial({ color: 0xC8A44E, transparent: true, opacity: 0.04 });

    for (let i = 0; i < 30; i++) {
      const lineGeo = new THREE.BufferGeometry();
      const p1 = new THREE.Vector3((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 60);
      const p2 = new THREE.Vector3((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 60);
      lineGeo.setFromPoints([p1, p2]);
      lineGroup.add(new THREE.Line(lineGeo, lineMat));
    }
    scene.add(lineGroup);

    camera.position.set(0, 8, 35);

    // --- Lerp Utility for Silky Camera Interpolation ---
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
    const LERP_FACTOR = 0.04; // Lower = smoother/heavier feel

    // Camera target state (GSAP writes here, render loop lerps toward it)
    const camTarget = { x: 0, y: 8, z: 35 };
    const structTarget = { ry: 0 };

    // --- GSAP Scroll-driven Camera Path (writes to targets, NOT directly to camera) ---
    const scrollTL = gsap.timeline({
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1.5 }
    });

    // Hero → Heritage Gallery: gentle orbit right
    scrollTL.to(camTarget, { z: 20, y: 4, x: 12, ease: "none" }, 0);

    // Gallery → Crisis: wider orbit
    scrollTL.to(camTarget, { z: 15, y: 2, x: 20, duration: 1, ease: "power2.inOut" }, 1);

    // Crisis → Platform: rise and look down at grid
    scrollTL.to(camTarget, { z: 25, y: 22, x: -15, duration: 2, ease: "power2.inOut" }, 2);
    scrollTL.to(structTarget, { ry: Math.PI * 0.5, duration: 3, ease: "none" }, 2);

    // Platform → AI: deep zoom into structure core
    scrollTL.to(camTarget, { z: 8, y: -3, x: 5, duration: 2, ease: "power3.inOut" }, 4);

    // AI → Roadmap: high-altitude orbit
    scrollTL.to(camTarget, { z: 42, y: 28, x: -5, duration: 2, ease: "power2.inOut" }, 5);
    scrollTL.to(structTarget, { ry: Math.PI, duration: 2, ease: "none" }, 5);

    // Roadmap → Investment: final descent
    scrollTL.to(camTarget, { z: 20, y: 5, x: 0, duration: 2, ease: "power2.out" }, 6);

    // --- Mouse Parallax ---
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Render Loop with Lerp Interpolation ---
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Lerp camera position toward GSAP-driven target (silky smooth even on fast scroll)
      camera.position.x = lerp(camera.position.x, camTarget.x + mouse.current.x * 2.5, LERP_FACTOR);
      camera.position.y = lerp(camera.position.y, camTarget.y - mouse.current.y * 1.5, LERP_FACTOR);
      camera.position.z = lerp(camera.position.z, camTarget.z, LERP_FACTOR);

      // Lerp structure rotation
      structures.rotation.y = lerp(structures.rotation.y, structTarget.ry, LERP_FACTOR * 0.8);

      particles.rotation.y = elapsed * 0.02;
      particles.rotation.x = Math.sin(elapsed * 0.01) * 0.1;

      torus.rotation.z = elapsed * 0.1;
      innerTorus.rotation.z = -elapsed * 0.15;

      structures.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh && child.geometry.type === 'IcosahedronGeometry') {
          child.position.y += Math.sin(elapsed * 0.5 + i) * 0.003;
          child.rotation.x = elapsed * 0.2 + i;
          child.rotation.y = elapsed * 0.15 + i;
        }
      });

      lineGroup.rotation.y = elapsed * 0.015;

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" style={{ zIndex: -1 }} />;
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN APPLICATION
   ═══════════════════════════════════════════════════════════════════ */

export default function SlideDeck() {
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 120, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, scrollTrigger: { trigger: section, start: "top 85%", end: "top 35%", scrub: 1.5 } }
      );
      gsap.to(section, {
        opacity: 0, y: -120, scale: 0.92,
        scrollTrigger: { trigger: section, start: "bottom 15%", end: "bottom -5%", scrub: 1.5 }
      });
    });
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden selection:bg-[var(--gold)]/30 cursor-default font-sans" style={{ background: 'var(--charcoal)', color: '#e2e8f0' }}>
      <style dangerouslySetInnerHTML={{ __html: designSystem }} />
      <ThreeScene />

      {/* ─── Persistent Navigation ─── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center justify-between w-[95%] max-w-7xl px-10 py-5 glass-heritage rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.5)] opacity-20 hover:opacity-100 transition-all duration-700">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => scrollToSection('vision')}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(200,164,78,0.3)]" style={{ background: 'var(--gold)' }}>
            <Activity className="w-7 h-7" style={{ color: 'var(--charcoal)' }} />
          </div>
          <div>
            <span className="font-black text-2xl tracking-tighter block leading-none text-white font-sans">CHRONIBOOK</span>
            <span className="text-[9px] font-black tracking-[0.6em] uppercase font-sans" style={{ color: 'var(--gold)' }}>National Health Grid</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-10">
          {[
            { name: 'Vision', id: 'vision' },
            { name: 'Threat', id: 'threat' },
            { name: 'Core', id: 'core' },
            { name: 'Neural', id: 'neural' },
            { name: 'Roadmap', id: 'roadmap' },
            { name: 'Capital', id: 'capital' }
          ].map((link, i) => (
            <button key={i} onClick={() => scrollToSection(link.id)} className="text-[10px] font-black tracking-[0.4em] uppercase opacity-30 hover:opacity-100 transition-all font-sans" style={{ color: 'var(--parchment)' }}>{link.name}</button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowWalkthrough(true)} className="hidden md:flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-xs hover:scale-105 transition-all font-sans shadow-[0_10px_30px_rgba(200,164,78,0.3)]" style={{ background: 'var(--gold)', color: 'var(--charcoal)' }}>
            <Play className="w-3 h-3 fill-current" /> WATCH VISION
          </button>
          <button onClick={toggleFullscreen} className="p-3.5 rounded-full border border-white/10 text-white/70 font-black hover:bg-white/5 transition-all" title="Toggle fullscreen">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <Link href="/" className="px-8 py-3.5 rounded-full border border-white/10 text-white/70 font-black text-xs hover:bg-white/5 transition-all uppercase tracking-widest font-sans">Exit</Link>
        </div>
      </nav>

      {/* ─── Scroll Container ─── */}
      <div className="relative">

        {/* HERO - with Victoria Falls background */}
        <section id="vision" className="h-screen flex flex-col items-center justify-center text-center px-6 relative z-10">
          <div className="absolute inset-0 z-0 opacity-20 img-fade">
            <Image src="/heritage/victoria-falls.png" alt="Victoria Falls" fill className="object-cover" priority sizes="100vw" />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--charcoal)] via-transparent to-[var(--charcoal)]" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease: "easeOut" }} className="flex flex-col items-center">
            <div className="mb-14 relative group">
              <div className="absolute inset-0 blur-[50px] group-hover:blur-[70px] transition-all rounded-full" style={{ background: 'rgba(200,164,78,0.25)' }} />
              <div className="w-24 h-24 flex items-center justify-center relative z-10" style={{ color: 'var(--gold)' }}>
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                  <path d="M50 5 L20 42 L80 42 Z" /><path d="M50 95 L30 50 L70 50 Z" /><circle cx="50" cy="48" r="4" />
                </svg>
              </div>
            </div>

            <h1 className="text-7xl md:text-[10rem] font-black leading-[0.82] tracking-tighter mb-12 font-serif italic uppercase">
              The Ecosystem <br /> of <span className="text-glow-green" style={{ color: 'var(--forest-bright)' }}>Predictive</span> <br /> <span className="text-glow-gold gold-shimmer">Survival.</span>
            </h1>

            <div className="flex gap-3 h-1.5 w-56 mb-14">
              <div className="flex-1 rounded-full" style={{ background: 'var(--forest-bright)' }} />
              <div className="flex-1 rounded-full" style={{ background: 'var(--gold)' }} />
              <div className="flex-1 rounded-full bg-red-600" />
            </div>

            <p className="max-w-2xl text-xl md:text-2xl text-slate-400 font-sans leading-relaxed mb-16 italic px-4">
              Deploying Zimbabwe&apos;s first national AI-powered health telemetry grid for <span className="text-white font-black">Cardiovascular</span>, <span className="text-white font-black">Metabolic</span> &amp; <span className="text-white font-black">Respiratory</span> defense.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-4xl glass-heritage p-8 rounded-[2rem] mb-16">
              {[
                { val: "16M", label: "Citizens", color: 'var(--forest-bright)' },
                { val: "1.2M+", label: "Chronic NCDs", color: '#ef4444' },
                { val: "$600K", label: "Pre-Seed", color: 'var(--gold)' },
                { val: "2028", label: "Grid Launch", color: 'var(--parchment)' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-black font-sans" style={{ color: stat.color }}>{stat.val}</div>
                  <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase font-sans">{stat.label}</div>
                </div>
              ))}
            </div>

          </motion.div>
          <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-25 animate-pulse">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase font-sans">Phase Into Records</span>
            <ChevronRight className="w-5 h-5 rotate-90" />
          </div>
        </section>

        {/* CRISIS - Great Zimbabwe ruins background */}
        <section id="threat" className="reveal-section min-h-screen flex items-center justify-center p-8 md:p-20 relative z-20">
          <div className="absolute inset-0 z-0 opacity-[0.18] img-fade">
            <Image src="/heritage/great-zimbabwe.png" alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="w-full max-w-7xl relative z-10"><CoreCrisisSlide /></div>
        </section>

        {/* INFRASTRUCTURE - health-tech command center background */}
        <section id="core" className="reveal-section min-h-screen flex items-center justify-center p-8 md:p-20 relative z-20">
          <div className="absolute inset-0 z-0 opacity-[0.18] img-fade">
            <Image src="/heritage/health-tech-command.png" alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="w-full max-w-7xl relative z-10"><NationalPlatformSlide /></div>
        </section>

        {/* NEURAL CORE - Nyanga mountains background */}
        <section id="neural" className="reveal-section min-h-screen flex items-center justify-center p-8 md:p-20 relative z-20">
          <div className="absolute inset-0 z-0 opacity-[0.15] img-fade">
            <Image src="/heritage/nyanga-mountains.png" alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="w-full max-w-7xl relative z-10"><AiLayerSlide /></div>
        </section>

        {/* ROADMAP - Hwange elephants background */}
        <section id="roadmap" className="reveal-section min-h-screen flex items-center justify-center p-8 md:p-20 relative z-20">
          <div className="absolute inset-0 z-0 opacity-[0.18] img-fade">
            <Image src="/heritage/hwange-elephants.png" alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="w-full max-w-7xl relative z-10"><RoadmapSlide /></div>
        </section>

        {/* INVESTMENT - Victoria Falls background */}
        <section id="capital" className="reveal-section min-h-screen flex items-center justify-center p-8 md:p-20 relative z-20">
          <div className="absolute inset-0 z-0 opacity-[0.15] img-fade">
            <Image src="/heritage/victoria-falls.png" alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="w-full max-w-7xl relative z-10"><InvestmentAskSlide /></div>
        </section>

        {/* CLOSING */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative z-10">
          <div className="space-y-12 max-w-4xl">
            <div className="flex justify-center gap-4 h-1.5 w-48 mx-auto mb-16 opacity-40">
              <div className="flex-1 rounded-full" style={{ background: 'var(--forest-bright)' }} /><div className="flex-1 rounded-full" style={{ background: 'var(--gold)' }} /><div className="flex-1 bg-red-600 rounded-full" />
            </div>
            <h3 className="text-5xl md:text-8xl font-black text-white/15 font-serif italic tracking-tighter leading-none uppercase">Data Is No Longer <br /> a Silent Witness.</h3>

            {/* Contact Nexus */}
            <div className="flex flex-wrap justify-center gap-8 py-8 px-4 glass-heritage rounded-3xl border border-white/5">
              <a href="mailto:sukanovtech@gmail.com" className="flex items-center gap-4 group">
                <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-[var(--gold)]/20 transition-all border border-white/10">
                  <Mail className="w-6 h-6 text-[var(--gold)]" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-sans">Email Us</div>
                  <div className="text-white font-bold font-sans">sukanovtech@gmail.com</div>
                </div>
              </a>
              <div className="flex items-center gap-6">
                <a href="https://instagram.com/sukanovtech.zw" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 hover:bg-[var(--gold)]/20 transition-all border border-white/10 group">
                  <Instagram className="w-6 h-6 text-[var(--gold)]" />
                </a>
                <a href="https://facebook.com/sukanovtech.zw" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 hover:bg-[var(--gold)]/20 transition-all border border-white/10 group">
                  <Facebook className="w-6 h-6 text-[var(--gold)]" />
                </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link href="/" className="px-12 py-6 rounded-full font-black text-xl font-sans hover:scale-105 transition-transform flex items-center gap-4" style={{ background: 'var(--gold)', color: 'var(--charcoal)' }}>RETURN TO HQ <ArrowRight /></Link>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 rounded-full border border-white/10 text-white/70 font-black text-xl font-sans hover:bg-white/5 transition-all">REPLAY CINEMATIC</button>
            </div>
          </div>
          <div className="absolute bottom-12 text-[10px] font-black text-slate-700 tracking-[0.8em] uppercase font-sans">ChroniBook EMR / Harare HQ / 2026</div>
        </section>
      </div>

      <AnimatePresence>
        {showWalkthrough && <WalkthroughModal isOpen={showWalkthrough} onClose={() => setShowWalkthrough(false)} />}
      </AnimatePresence>
    </main>
  );
}
