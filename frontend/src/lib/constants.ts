import { ChartBarIcon, ComputerDesktopIcon, CpuChipIcon, GlobeAltIcon, ShieldCheckIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export const FEATURES = [
  {
    title: "Global Monitoring",
    description: "Monitor your sites from 120+ locations worldwide, getting real user experience data from every continent.",
    icon: GlobeAltIcon,
    color: "bg-gradient-to-br from-blue-500/30 to-blue-600/30 text-blue-400",
  },
  {
    title: "Real-time Alerts",
    description: "Get instant notifications via SMS, email, Slack, Discord, or webhook when your services experience downtime.",
    icon: ShieldCheckIcon,
    color: "bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 text-emerald-400",
  },
  {
    title: "Performance Metrics",
    description: "Track page load times, server response, and content delivery performance with detailed analytics.",
    icon: ChartBarIcon,
    color: "bg-gradient-to-br from-purple-500/30 to-purple-600/30 text-purple-400",
  },
  {
    title: "Synthetic Monitoring",
    description: "Simulate user interactions to detect issues before your customers experience them.",
    icon: ComputerDesktopIcon,
    color: "bg-gradient-to-br from-pink-500/30 to-pink-600/30 text-pink-400",
  },
  {
    title: "API Monitoring",
    description: "Keep track of your API endpoints' availability, performance, and correctness with our specialized tools.",
    icon: CpuChipIcon,
    color: "bg-gradient-to-br from-amber-500/30 to-amber-600/30 text-amber-400",
  },
  {
    title: "Team Collaboration",
    description: "Work together effectively with role-based access, shared dashboards, and collaborative issue resolution.",
    icon: UserGroupIcon,
    color: "bg-gradient-to-br from-teal-500/30 to-teal-600/30 text-teal-400",
  },
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for small websites and personal projects",
    features: [
      "10 monitors",
      "1-minute check intervals",
      "7-day data retention",
      "Email alerts",
      "Basic uptime reporting",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: 79,
    description: "Ideal for growing businesses and professional sites",
    features: [
      "50 monitors",
      "30-second check intervals",
      "30-day data retention",
      "Email, SMS & Slack alerts",
      "Advanced performance metrics",
      "API access",
      "24/7 support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    description: "For large-scale applications and critical infrastructure",
    features: [
      "Unlimited monitors",
      "10-second check intervals",
      "1-year data retention",
      "All notification channels",
      "Custom metrics & KPIs",
      "Full API access",
      "Dedicated support manager",
      "Service Level Agreement",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "BetterUptime has been a game changer for our team. Since implementing it, our response time to incidents has decreased by 70%, and our overall uptime has improved to 99.99%.",
    author: "Sarah Johnson",
    role: "CTO at TechFlow",
    avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote:
      "The real-time alerts and comprehensive dashboard give us peace of mind knowing our systems are constantly monitored. The ROI has been incredible.",
    author: "Michael Chen",
    role: "DevOps Lead at Datastack",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote:
      "I've used many monitoring solutions, but BetterUptime's interface and alert system are by far the most intuitive. Our team was able to set everything up in minutes.",
    author: "Emma Rodriguez",
    role: "Engineering Manager at Streamly",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
];

export const STATS = [
  { value: "99.99%", label: "Average uptime", suffix: "" },
  { value: "120", label: "Global locations", suffix: "+" },
  { value: "15", label: "Second response time", suffix: "s" },
  { value: "10k", label: "Happy customers", suffix: "+" },
];