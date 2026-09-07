import React from 'react';

export const AVATAR_OPTIONS = [
  { id: 'lion', name: 'Leo the Lion', emoji: '🦁', bg: 'bg-amber-100 text-amber-700 border-amber-300' },
  { id: 'unicorn', name: 'Luna the Unicorn', emoji: '🦄', bg: 'bg-pink-100 text-pink-700 border-pink-300' },
  { id: 'dino', name: 'Rex the T-Rex', emoji: '🦖', bg: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { id: 'robot', name: 'Sparky the Robot', emoji: '🤖', bg: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
  { id: 'astronaut', name: 'Comet the Astronaut', emoji: '👨‍🚀', bg: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
  { id: 'owl', name: 'Professor Ollie', emoji: '🦉', bg: 'bg-purple-100 text-purple-700 border-purple-300' },
  { id: 'panda', name: 'Pippa the Panda', emoji: '🐼', bg: 'bg-rose-100 text-rose-700 border-rose-300' },
  { id: 'fox', name: 'Flash the Fox', emoji: '🦊', bg: 'bg-orange-100 text-orange-700 border-orange-300' }
];

interface AvatarIconProps {
  avatarId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AvatarIcon: React.FC<AvatarIconProps> = ({ avatarId, size = 'md', className = '' }) => {
  const avatar = AVATAR_OPTIONS.find(a => a.id === avatarId) || AVATAR_OPTIONS[0];

  const sizeClasses = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-10 h-10 text-xl',
    lg: 'w-14 h-14 text-2xl',
    xl: 'w-20 h-20 text-4xl'
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center rounded-2xl border-2 shadow-xs select-none transition-transform hover:scale-105 ${avatar.bg} ${sizeClasses} ${className}`}
      title={avatar.name}
    >
      <span>{avatar.emoji}</span>
    </div>
  );
};
