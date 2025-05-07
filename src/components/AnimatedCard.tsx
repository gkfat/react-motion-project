import { motion } from 'framer-motion';

import {
    Box,
    Card,
} from '@mui/material';

import { ANIMATION_DURATION } from '../constants';

const MotionBox = motion(Box);

export function AnimatedCard({
    delay = 0,
    top,
    left,
    right,
    bottom,
    svgPath,
    hide,
    isSelected = false,
    colorChangedEnd = false,
    onClick,
}: {
  delay?: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  svgPath: string;
  hide: boolean;
  isSelected?: boolean;
  colorChangedEnd?: boolean;
  onClick?: () => void;
}) {
    return (
        <MotionBox
            initial={{
                top: top !== undefined ? top - 50 : undefined,
                left: left !== undefined ? left - 50 : undefined,
                right: right !== undefined ? right - 50 : undefined,
                bottom: bottom !== undefined ? bottom - 50 : undefined,
                opacity: 0,
            }}
            animate={
                isSelected && colorChangedEnd
                    ? {
                        top: '50%',
                        left: '50%',
                        translateX: '-50%',
                        translateY: '-50%',
                        opacity: 1,
                        scale: 1.3,
                        zIndex: 10,
                    }
                    : {
                        top,
                        left,
                        right,
                        bottom,
                        opacity: hide ? 0 : 1,
                        scale: 1,
                        zIndex: 1,
                    }
            }
            exit={
                hide && !isSelected
                    ? {
                        opacity: 0,
                        transition: { duration: ANIMATION_DURATION },
                    }
                    : isSelected
                        ? {
                            opacity: 0,
                            transition: { duration: ANIMATION_DURATION },
                        }
                        : undefined
            }
            transition={{
                duration: ANIMATION_DURATION * 2,
                delay, 
            }}
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                position: 'absolute',
                width: 140,
                height: 180,
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: '#fff',
                    position: 'relative', 
                }}
            >
                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                    }}
                >
                    <motion.path
                        key={isSelected ? 'selected' : 'normal'}
                        d={svgPath}
                        fill="none"
                        stroke={
                            isSelected
                                ? colorChangedEnd ? '#ff5722' : '#d2691e'
                                : '#888'
                        } 
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: ANIMATION_DURATION,
                            delay,
                            ease: 'easeInOut',
                        }}
                    />
                </svg>
            </Card>
        </MotionBox>
    );
}