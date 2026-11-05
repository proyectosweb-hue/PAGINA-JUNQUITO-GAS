import React, { useEffect, useState, useRef, Children } from 'react';
interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
}
export function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [once]);
  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up':
        return 'translate3d(0, 40px, 0)';
      case 'left':
        return 'translate3d(-40px, 0, 0)';
      case 'right':
        return 'translate3d(40px, 0, 0)';
      case 'none':
        return 'translate3d(0, 0, 0)';
    }
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
        willChange: 'opacity, transform'
      }}>
      
      {children}
    </div>);

}
interface StaggerChildrenProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  duration?: number;
}
export function StaggerChildren({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up',
  duration = 0.5
}: StaggerChildrenProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) =>
      <AnimateOnScroll
        delay={index * staggerDelay}
        direction={direction}
        duration={duration}>
        
          {child}
        </AnimateOnScroll>
      )}
    </div>);

}