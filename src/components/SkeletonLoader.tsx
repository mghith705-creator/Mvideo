import { type ReactNode } from 'react';

type SkeletonProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  radius?: string;
  children?: ReactNode;
};

export function SkeletonLoader({ className = '', width = '100%', height = '16px', radius = '4px', children }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-surface rounded-${radius === '4px' ? 'md' : 'lg'} ${className}`}
      style={{ width, height }}
    >
      {children}
    </div>
  );
}

export function VideoCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden">
      <div className="h-48 bg-surface flex items-center justify-center">
        <SkeletonLoader width="60%" height="40%" radius="8px" />
      </div>
      <div className="p-4 space-y-3">
        <SkeletonLoader className="h-4 w-3/4" />
        <SkeletonLoader className="h-3 w-1/2" />
        <div className="flex items-center gap-2">
          <SkeletonLoader width="32px" height="32px" radius="full" />
          <SkeletonLoader className="h-5 w-48" />
        </div>
      </div>
    </div>
  );
}

export function PlaylistSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden">
      <div className="h-48 bg-surface">
        <SkeletonLoader width="80%" height="60%" radius="8px" />
      </div>
      <div className="p-4 space-y-3">
        <SkeletonLoader className="h-4 w-3/4" />
        <SkeletonLoader className="h-3 w-1/2" />
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <SkeletonLoader width="14px" height="14px" radius="full" />
          <SkeletonLoader className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-border-color shadow-sm p-6">
      <div className="flex flex-col items-center text-center space-y-3">
        <SkeletonLoader width="96px" height="96px" radius="full" />
        <SkeletonLoader className="h-5 w-32" />
        <SkeletonLoader className="h-4 w-48" />
      </div>
      <div className="mt-6 space-y-3">
        <SkeletonLoader className="h-10 w-1/3" />
        <SkeletonLoader className="h-10 w-1/2" />
        <SkeletonLoader className="h-10 w-2/3" />
      </div>
    </div>
  );
}
