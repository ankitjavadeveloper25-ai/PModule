import React from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  ShieldCheck,
  CheckCircle2,
  Lock,
  HardDrive,
  Flame,
  Clock,
  Code2,
  Calendar,
  BarChart3,
  Sparkles,
  ArrowRight,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { config } from '../config/env';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 overflow-hidden">
        {/* Ambient glow backgrounds */}
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-primary/15 blur-[140px] pointer-events-none rounded-full"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 -right-20 w-[450px] h-[350px] bg-brand-purple/15 blur-[120px] pointer-events-none rounded-full"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-card/80 border border-brand-border-light shadow-glass mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-xs font-semibold text-brand-text">
              Winter ARC Pro v{config.appVersion} for Windows 10 & 11
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-brand-dim" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            Master Your 90-Day Discipline Challenge on{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-sky-300 to-brand-purple">
              Windows
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
            The premier offline-first desktop productivity suite. Track daily habits, prepare for technical placements, and conquer deep work sessions with local SQLite privacy and Ed25519 cryptographic licensing.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link to="/download" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-glow"
                leftIcon={<Download className="w-5 h-5" />}
              >
                Download Free Installer
              </Button>
            </Link>
            <Link to="/pricing" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View Plans (from ₹50)
              </Button>
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-brand-dim">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald" /> Native Windows MSI Installer
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-primary" /> 100% Local SQLite Storage
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-purple" /> 14-Day Offline Grace Period
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-amber" /> Zero Third-Party Trackers
            </span>
          </div>

          {/* Desktop Preview Card */}
          <div className="mt-16 sm:mt-20 relative max-w-5xl mx-auto">
            <div className="relative rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-brand-border-light/40 to-brand-border/20 border border-brand-border-light shadow-2xl backdrop-blur-xl">
              {/* Fake Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-brand-surface rounded-t-xl border-b border-brand-border text-xs text-brand-dim">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-brand-muted">Winter ARC Pro — Desktop Edition v{config.appVersion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Ed25519 Verified
                  </Badge>
                </div>
              </div>

              {/* Window Content Mockup */}
              <div className="bg-brand-bg rounded-b-xl p-6 sm:p-8 text-left space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-brand-card border border-brand-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-brand-dim">ARC Streak</span>
                      <Flame className="w-4 h-4 text-brand-amber" />
                    </div>
                    <p className="text-2xl font-black text-white mt-2">Day 42 / 90</p>
                    <p className="text-xs text-brand-emerald mt-1">46.6% Protocol Complete</p>
                  </div>
                  <div className="p-4 rounded-xl bg-brand-card border border-brand-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-brand-dim">Today's Habits</span>
                      <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                    </div>
                    <p className="text-2xl font-black text-white mt-2">6 / 6 Done</p>
                    <p className="text-xs text-brand-primary mt-1">100% Completion Rate</p>
                  </div>
                  <div className="p-4 rounded-xl bg-brand-card border border-brand-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-brand-dim">Focus Blocks</span>
                      <Clock className="w-4 h-4 text-brand-purple" />
                    </div>
                    <p className="text-2xl font-black text-white mt-2">4h 15m</p>
                    <p className="text-xs text-brand-muted mt-1">Pomodoro Deep Work</p>
                  </div>
                  <div className="p-4 rounded-xl bg-brand-card border border-brand-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-brand-dim">Placement Prep</span>
                      <Code2 className="w-4 h-4 text-brand-emerald" />
                    </div>
                    <p className="text-2xl font-black text-white mt-2">128 Solved</p>
                    <p className="text-xs text-brand-dim mt-1">DSA Roadmap: Phase 3</p>
                  </div>
                </div>

                {/* Heatmap Graphic Representation */}
                <div className="p-5 rounded-xl bg-brand-card/60 border border-brand-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      90-Day Winter ARC Consistency Heatmap
                    </span>
                    <span className="text-xs text-brand-dim">Local SQLite Persistence</span>
                  </div>
                  <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto py-2">
                    {Array.from({ length: 90 }).map((_, i) => {
                      const level = i < 42 ? (i % 5 === 0 ? 4 : i % 3 === 0 ? 3 : 2) : 0;
                      const colors = [
                        'bg-brand-border/40',
                        'bg-sky-950',
                        'bg-sky-800',
                        'bg-sky-600',
                        'bg-brand-primary',
                      ];
                      return (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-sm ${colors[level]} transition-colors`}
                          title={`Day ${i + 1}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Product Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4">
            Engineered for Deep Focus
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Serious Transformation, Not Casual Logging
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted">
            Winter ARC Pro is built directly in Java & JavaFX for Windows. No web wrappers, no slow electron bloat, and no cloud leaks of your personal discipline journal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">90-Day Challenge Matrix</h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Embark on an unbroken 90-day consistency arc. Track your daily habit checklist, analyze streak drop-offs, and unlock visual milestone achievements.
            </p>
            <ul className="text-xs text-brand-dim space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" /> Milestone badges & level progression
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" /> Visual calendar grid with quick-log
              </li>
            </ul>
          </Card>

          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Pomodoro Deep Work Timer</h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Integrated focus sessions with ambient sounds, audio alerts, and distraction-free study blocks. Measure your deep work hours and eliminate multitasking.
            </p>
            <ul className="text-xs text-brand-dim space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" /> Configurable work & break intervals
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" /> Daily timeline and study session logs
              </li>
            </ul>
          </Card>

          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Placement & DSA Prep Tracker</h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Purpose-built for engineering students and developers. Track Data Structures & Algorithms topic mastery, LeetCode problem difficulty, and company target dates.
            </p>
            <ul className="text-xs text-brand-dim space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" /> Topic-by-topic placement prep roadmaps
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" /> Revision reminders and interview targets
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Free vs Pro Plan Comparison */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">
            Plan Comparison
          </Badge>
          <h2 className="text-3xl font-extrabold text-white">Free Edition vs. Pro Access</h2>
          <p className="mt-3 text-sm text-brand-muted">
            Start completely free or unlock unlimited discipline power for just ₹50 or ₹100.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-brand-card rounded-2xl border border-brand-border overflow-hidden">
            <thead>
              <tr className="border-b border-brand-border bg-brand-surface/60">
                <th className="p-4 sm:p-5 text-sm font-semibold text-white">Feature Capability</th>
                <th className="p-4 sm:p-5 text-sm font-semibold text-brand-muted">Free Edition</th>
                <th className="p-4 sm:p-5 text-sm font-semibold text-brand-primary">Pro Plans (₹50 / ₹100)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-sm">
              <tr>
                <td className="p-4 font-medium text-white">Active Habit Tracking</td>
                <td className="p-4 text-brand-muted">Up to 5 Habits</td>
                <td className="p-4 text-brand-primary font-semibold">Unlimited Habits</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">90-Day Winter ARC Challenge Matrix</td>
                <td className="p-4 text-brand-muted">Basic Daily Check</td>
                <td className="p-4 text-brand-primary font-semibold">Full Matrix & Checkpoints</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Pomodoro Deep Work Timer</td>
                <td className="p-4 text-brand-muted">Standard 25m Timer</td>
                <td className="p-4 text-brand-primary font-semibold">Custom Intervals & Audio Alerts</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Technical Placement & DSA Roadmap</td>
                <td className="p-4 text-brand-dim">—</td>
                <td className="p-4 text-brand-primary font-semibold">Included in Pro Plan B</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Analytics, Heatmap & Milestone Badges</td>
                <td className="p-4 text-brand-muted">Current Week Only</td>
                <td className="p-4 text-brand-primary font-semibold">Lifetime History & Export</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Local SQLite Privacy & Data Export</td>
                <td className="p-4 text-brand-emerald font-semibold">✓ Supported</td>
                <td className="p-4 text-brand-emerald font-semibold">✓ Supported</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Offline Cryptographic Licensing (Ed25519)</td>
                <td className="p-4 text-brand-dim">—</td>
                <td className="p-4 text-brand-primary font-semibold">14-Day Offline Grace Period</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Link to="/pricing">
            <Button variant="primary" size="md">
              Compare Full Pricing & Select Plan
            </Button>
          </Link>
        </div>
      </section>

      {/* Security & Offline-First Pillar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-card via-brand-surface to-brand-card border border-brand-border-light relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <Badge variant="primary">Architectural Integrity</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Your Habits Belong on Your Machine. Not on Someone Else's Cloud.
              </h2>
              <p className="text-base text-brand-muted leading-relaxed">
                Most habit trackers store your private thoughts, routines, and schedules on centralized servers. Winter ARC Pro stores everything locally in an encrypted SQLite database on your Windows machine.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary mt-1">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Local Database</h4>
                    <p className="text-xs text-brand-muted mt-1">All reflections, journal logs, and habits stay on your drive.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-purple/10 text-brand-purple mt-1">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Ed25519 Signatures</h4>
                    <p className="text-xs text-brand-muted mt-1">Cryptographically signed tokens keep your Pro access verified offline.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-bg/80 border border-brand-border space-y-4">
              <h4 className="text-sm font-mono font-bold text-brand-primary">How Activation Works:</h4>
              <ol className="text-xs text-brand-muted space-y-3 font-mono leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">1.</span>
                  <span>Select ₹50 Plan A or ₹100 Plan B on our website.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">2.</span>
                  <span>Pay securely through Razorpay UPI, Netbanking, or Cards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">3.</span>
                  <span>Backend generates an Ed25519 cryptographically signed token.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">4.</span>
                  <span>Launch desktop app and click "Sync License" in Account View.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">5.</span>
                  <span>Desktop verifies signature offline using embedded public keys.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to start CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Begin Your 90-Day Winter ARC Today
        </h2>
        <p className="text-brand-muted text-base max-w-xl mx-auto">
          Download the native Windows installer and experience a productivity tool designed for uninterrupted concentration.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link to="/download">
            <Button variant="primary" size="lg" leftIcon={<Download className="w-5 h-5" />}>
              Download for Windows (72.88 MB)
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="outline" size="lg">
              Explore ₹50 & ₹100 Plans
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
