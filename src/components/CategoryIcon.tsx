import React from 'react';
import {
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  Calculator,
  Code2,
  Compass,
  Cpu,
  Feather,
  FileText,
  Filter,
  Globe,
  GraduationCap,
  HeartPulse,
  Home,
  Image,
  Landmark,
  Layers,
  Leaf,
  Link,
  Mail,
  MapPin,
  Music,
  PlayCircle,
  Scale,
  Share2,
  ShieldAlert,
  ShoppingBag,
  Smile,
  Sparkles,
  Terminal,
  TrendingUp,
  Unlock,
  UserCheck,
  Users,
  Video,
  Workflow,
  Zap,
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Zap':
      return <Zap className={className} />;
    case 'Image':
      return <Image className={className} />;
    case 'Video':
      return <Video className={className} />;
    case 'Music':
      return <Music className={className} />;
    case 'UserCheck':
      return <UserCheck className={className} />;
    case 'Share2':
      return <Share2 className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Code2':
      return <Code2 className={className} />;
    case 'ShieldAlert':
      return <ShieldAlert className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Feather':
      return <Feather className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Scale':
      return <Scale className={className} />;
    case 'Calculator':
      return <Calculator className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'Brain':
      return <Brain className={className} />;
    case 'Landmark':
      return <Landmark className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Terminal':
      return <Terminal className={className} />;
    case 'Link':
      return <Link className={className} />;
    case 'PlayCircle':
      return <PlayCircle className={className} />;
    case 'Mail':
      return <Mail className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    case 'Home':
      return <Home className={className} />;
    case 'Filter':
      return <Filter className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    case 'Building2':
      return <Building2 className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'Workflow':
      return <Workflow className={className} />;
    case 'Leaf':
      return <Leaf className={className} />;
    case 'Unlock':
      return <Unlock className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Smile':
      return <Smile className={className} />;
    default:
      return <Zap className={className} />;
  }
};
