'use client'

/**
 * infinite-drag-scroll.tsx
 * Infinite drag + wheel scroll gallery grid.
 * Based on the shadcn community component pattern.
 * Features:
 *   - Staggered scale+fade entrance animation on each tile (random delay)
 *   - Infinite wrap in X and Y via framer-motion wrap()
 *   - Wheel scroll (Y + X trackpad), ctrl+wheel zoom blocked
 *   - Touch drag with momentum on mobile
 *   - bgColor prop for seamless canvas background
 */

import {
  animate,
  cubicBezier,
  motion,
  useMotionValue,
  wrap,
} from 'framer-motion';
import {
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
} from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export type GridVariant = 'default' | 'masonry' | 'polaroid';

// ─── Context ──────────────────────────────────────────────────────────────────
const GridVariantContext = createContext<GridVariant | undefined>(undefined);

// ─── Entrance animation variants (matches the reference template exactly) ─────
const tileVariants = {
  initial: { opacity: 0, scale: 0.3 },
  animate: () => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: Math.random() + 1.5,
      duration: 1.4,
      ease: [0.18, 0.71, 0.11, 1] as [number, number, number, number],
    },
  }),
};

// ─── DraggableContainer ───────────────────────────────────────────────────────
export const DraggableContainer = ({
  className,
  children,
  variant,
  bgColor = '#F2F1E6',
}: {
  className?: string;
  children: React.ReactNode;
  variant?: GridVariant;
  bgColor?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isDragging, setIsDragging] = useState(false);
  const handleIsDragging = () => setIsDragging(true);
  const handleIsNotDragging = () => setIsDragging(false);

  useEffect(() => {
    const container = ref.current?.getBoundingClientRect();
    if (!container) return;

    const { width, height } = container;

    const xDrag = x.on('change', (latest) => {
      x.set(wrap(-(width / 2), 0, latest));
    });

    const yDrag = y.on('change', (latest) => {
      y.set(wrap(-(height / 2), 0, latest));
    });

    const handleWheelScroll = (e: WheelEvent) => {
      // Block ctrl+scroll browser zoom — no canvas zoom
      if (e.ctrlKey) {
        e.preventDefault();
        return;
      }
      if (!isDragging) {
        animate(y, y.get() - e.deltaY * 2.7, {
          type: 'tween',
          duration: 1.2,
          ease: cubicBezier(0.18, 0.71, 0.11, 1),
        });
        animate(x, x.get() - e.deltaX * 2.7, {
          type: 'tween',
          duration: 1.2,
          ease: cubicBezier(0.18, 0.71, 0.11, 1),
        });
      }
    };

    window.addEventListener('wheel', handleWheelScroll, { passive: false });

    return () => {
      xDrag();
      yDrag();
      window.removeEventListener('wheel', handleWheelScroll);
    };
  }, [x, y, isDragging]);

  return (
    <GridVariantContext.Provider value={variant}>
      {/* Outer clip */}
      <div className="h-dvh overflow-hidden" style={{ background: bgColor }}>
        {/* Inner framer-motion overflow shield — prevents scroll bleed */}
        <motion.div className="h-dvh overflow-hidden">
          {/* Draggable canvas */}
          <motion.div
            ref={ref}
            className={cn(
              'grid h-fit w-fit cursor-grab grid-cols-[repeat(2,1fr)] active:cursor-grabbing will-change-transform',
              className,
            )}
            style={{ x, y, background: bgColor }}
            drag
            dragMomentum={true}
            dragTransition={{
              timeConstant: 200,
              power: 0.28,
              restDelta: 0,
              bounceStiffness: 0,
            }}
            onPointerDown={handleIsDragging}
            onPointerUp={handleIsNotDragging}
            onPointerLeave={handleIsNotDragging}
            onPointerCancel={handleIsNotDragging}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </GridVariantContext.Provider>
  );
};

// ─── GridBody ─────────────────────────────────────────────────────────────────
// Renders children 4× so wrap() always has content to loop through.
export const GridBody = memo(
  ({
    children,
    className,
    columns = 5,
  }: {
    children: React.ReactNode;
    className?: string;
    /** Number of grid columns. Defaults to 5. */
    columns?: number;
  }) => {
    const variant = useContext(GridVariantContext);

    const gridBodyStyles = cva('grid h-fit w-fit', {
      variants: {
        variant: {
          default: 'gap-14 p-7 md:gap-[60px] md:p-[60px]',
          masonry: 'gap-x-14 px-7 md:gap-x-[60px] md:px-[60px] md:py-[60px]',
          polaroid: 'gap-x-14 px-7 md:gap-x-[60px] md:px-[60px] md:py-[60px]',
        },
      },
      defaultVariants: { variant: 'default' },
    });

    return (
      <>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className={cn(gridBodyStyles({ variant, className }))}
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {children}
          </div>
        ))}
      </>
    );
  },
);
GridBody.displayName = 'GridBody';

// ─── GridItem ─────────────────────────────────────────────────────────────────
// Uses motion.div with staggered scale+fade entrance (matches reference template).
export const GridItem = ({
  children,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
}) => {
  const variant = useContext(GridVariantContext);

  const gridItemStyles = cva(
    // will-change-transform removed: tiles are static after entrance animation;
    // only the parent draggable canvas needs it. 36+ promoted layers = wasted GPU RAM.
    'overflow-hidden cursor-pointer w-full h-full relative',
    {
      variants: {
        variant: {
          default: 'rounded-sm',
          masonry: 'rounded-sm even:mt-[55%]',
          polaroid:
            'border-[10px] border-b-[28px] border-white shadow-xl even:rotate-3 odd:-rotate-2 hover:rotate-0 transition-transform ease-out duration-300 even:mt-[55%]',
        },
      },
      defaultVariants: { variant: 'default' },
    },
  );

  return (
    <motion.div
      className={cn(gridItemStyles({ variant }), className)}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      variants={tileVariants}
      initial="initial"
      animate="animate"
      custom={undefined}
    >
      {children}
    </motion.div>
  );
};
