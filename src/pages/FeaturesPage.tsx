import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Code2,
  BarChart3,
  Flame,
  CheckCircle2,
  HardDrive,
  Bell,
  BookOpen,
  Target,
  FolderGit2,
  Layers,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

interface FeatureItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  benefit: string;
  tierRequirement: 'FREE' | 'PRO';
  desktopView: string;
  capabilities: string[];
}

export const FeaturesPage: React.FC = () => {
  const desktopModules: FeatureItem[] = [
    {
      id: 'dashboard',
      title: 'Unified Command Dashboard',
      category: 'Overview & Metrics',
      icon: <BarChart3 className="w-6 h-6 text-brand-primary" />,
      description:
        'A distraction-free executive overview showing daily habit completion, focus hours logged, placement problems solved, and active streak status.',
      benefit: 'Gives you instantaneous clarity on your discipline progress the second you sit at your desk.',
      tierRequirement: 'FREE',
      desktopView: 'DashboardView.java',
      capabilities: [
        'Donut progress ring visualizing daily completion rate',
        'Real-time metrics for current streak and total active days',
        'Consistency heatmap matrix',
        'One-click quick-log for daily checklist items',
      ],
    },
    {
      id: 'challenge-matrix',
      title: '90-Day Winter ARC Challenge',
      category: 'Core Protocol',
      icon: <Flame className="w-6 h-6 text-brand-amber" />,
      description:
        'The centerpiece protocol: a structured 90-day consistency framework with milestone checkpoints at Day 15, 30, 60, and 90.',
      benefit: 'Turns an intimidating multi-month goal into daily manageable execution blocks.',
      tierRequirement: 'PRO',
      desktopView: 'WinterArcManagerView.java & ChallengeCalendarView.java',
      capabilities: [
        'Visual 90-day calendar grid with status indicators',
        'Automatic streak calculation and recovery tracking',
        'Milestone achievement badges unlocked as you progress',
        'Daily discipline notes and reflection prompt integration',
      ],
    },
    {
      id: 'focus-timer',
      title: 'Pomodoro Deep Work Timer',
      category: 'Focus & Productivity',
      icon: <Clock className="w-6 h-6 text-brand-purple" />,
      description:
        'A dedicated study and work timer with configurable work blocks (25m / 50m) and short/long break intervals.',
      benefit: 'Protects against cognitive fatigue and eliminates digital distractions during study blocks.',
      tierRequirement: 'FREE',
      desktopView: 'FocusTimerView.java',
      capabilities: [
        'Configurable focus intervals and audio notification chimes',
        'Study session tagging (DSA, Development, Reading, Fitness)',
        'Timeline conflict alerts when sessions overlap with scheduled tasks',
        'Full historical study session analytics and weekly totals',
      ],
    },
    {
      id: 'placement-prep',
      title: 'Technical Interview & DSA Roadmap',
      category: 'Career Acceleration',
      icon: <Code2 className="w-6 h-6 text-brand-emerald" />,
      description:
        'A specialized engineering tracker for tracking Data Structures, Algorithms, LeetCode problem difficulty, and company target timelines.',
      benefit: 'Keeps software developers systematically prepared for technical screening rounds.',
      tierRequirement: 'PRO',
      desktopView: 'PlacementPrepView.java',
      capabilities: [
        'DSA topic categorization: Arrays, Trees, Graphs, Dynamic Programming',
        'Problem difficulty breakdown: Easy, Medium, Hard with revisit dates',
        'Company target dates and application pipeline status',
        'Coding problem review reminders based on spaced repetition',
      ],
    },
    {
      id: 'my-habits',
      title: 'Multi-Frequency Habit System',
      category: 'Discipline Architecture',
      icon: <CheckCircle2 className="w-6 h-6 text-brand-primary" />,
      description:
        'Create and track routines across daily, weekly, or custom schedules. Free tier supports up to 5 habits; Pro unlocks unlimited tracking.',
      benefit: 'Enforces deliberate routine building without clutter or artificial complexity.',
      tierRequirement: 'FREE',
      desktopView: 'MyHabitsView.java',
      capabilities: [
        'Daily, weekly, and custom interval frequency models',
        'Color-coded category tags (Physical, Mental, Professional, Health)',
        'Habit streak counters with milestone completion alerts',
        'Unlimited habits supported under Pro Plan A & B',
      ],
    },
    {
      id: 'planner',
      title: 'Daily Task & Weekly Planner',
      category: 'Execution & Planning',
      icon: <Calendar className="w-6 h-6 text-sky-400" />,
      description:
        'An organized task manager with priority tiers (Urgent, High, Normal, Low) and scheduled due dates.',
      benefit: 'Prevents task fragmentation by keeping your daily to-do list alongside your habit matrix.',
      tierRequirement: 'FREE',
      desktopView: 'PlannerView.java',
      capabilities: [
        'Priority matrix with visual badges',
        'Due-date reminders and overdue alerts',
        'Direct linkage between tasks and broader life projects',
        'Quick task rescheduling and backlog management',
      ],
    },
    {
      id: 'journal',
      title: 'Reflections & Daily Journal',
      category: 'Mental Clarity',
      icon: <BookOpen className="w-6 h-6 text-brand-secondary" />,
      description:
        'A private daily journal for morning intentions and evening debriefs, saved locally on your machine.',
      benefit: 'Provides the psychological foundation for long-term consistency through honest self-reflection.',
      tierRequirement: 'FREE',
      desktopView: 'JournalReflectionsView.java',
      capabilities: [
        'Date-stamped entries with markdown formatting support',
        'Mental state & energy rating tracking',
        'Historical search across journal entries',
        '100% private: stored in local SQLite without cloud synchronization',
      ],
    },
    {
      id: 'projects-goals',
      title: 'Quarterly Goals & Project Mapping',
      category: 'High-Level Strategy',
      icon: <Target className="w-6 h-6 text-brand-rose" />,
      description:
        'Connect individual habits and daily focus blocks to high-level quarterly milestones and personal projects.',
      benefit: 'Ensures that your daily discipline aligns directly with your long-term life objectives.',
      tierRequirement: 'PRO',
      desktopView: 'GoalsMilestonesView.java & ProjectsView.java',
      capabilities: [
        'Target date milestone tracking with progress bars',
        'Project-level habit grouping',
        'Quarterly reviews and outcome evaluations',
        'Visual roadmap timeline view',
      ],
    },
    {
      id: 'backup-restore',
      title: 'Local SQLite Database Sovereignty',
      category: 'Data Ownership',
      icon: <HardDrive className="w-6 h-6 text-brand-emerald" />,
      description:
        'One-click JSON and SQLite database export/import. Your data remains on your Windows filesystem under your control.',
      benefit: 'Guarantees that your personal productivity records are never locked behind a proprietary cloud wall.',
      tierRequirement: 'FREE',
      desktopView: 'BackupRestoreView.java',
      capabilities: [
        'Complete local SQLite database export to `.db` or JSON format',
        'Safe database restoration with automatic schema migration runner',
        'Zero network transfer of habit entries, journals, or reflections',
        'Runs completely offline without requiring an active internet connection',
      ],
    },
  ];

  return (
    <div className="py-12 md:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="primary">Authentic Desktop Features</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Every Screen Built for Unbroken Focus
        </h1>
        <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
          Winter ARC Pro is built from the ground up as a native Windows desktop client in Java 21 & JavaFX. Here is exactly what is implemented and available in the application today.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {desktopModules.map((item) => (
          <Card key={item.id} hoverEffect className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-brand-surface border border-brand-border">
                  {item.icon}
                </div>
                {item.tierRequirement === 'PRO' ? (
                  <Badge variant="primary" size="sm">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Pro Tier
                  </Badge>
                ) : (
                  <Badge variant="neutral" size="sm">
                    Free Tier
                  </Badge>
                )}
              </div>

              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-brand-dim">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
              </div>

              <p className="text-sm text-brand-muted leading-relaxed">{item.description}</p>

              <div className="p-3 rounded-xl bg-brand-surface/60 border border-brand-border text-xs text-brand-text">
                <span className="font-semibold text-brand-primary block mb-1">Key Benefit:</span>
                {item.benefit}
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-semibold text-white block">Key Capabilities:</span>
                <ul className="text-xs text-brand-dim space-y-1.5">
                  {item.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-[11px] text-brand-dim font-mono">
              <span>Class: {item.desktopView.split(' ')[0]}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-brand-card border border-brand-border text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Experience the Desktop Client in Action
        </h2>
        <p className="text-sm sm:text-base text-brand-muted max-w-xl mx-auto">
          Download the latest Windows installer and start tracking your 90-day protocol today.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/download">
            <Button variant="primary" size="md" leftIcon={<Download className="w-4 h-4" />}>
              Download MSI Installer
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="outline" size="md">
              View Pricing (₹50 / ₹100)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
