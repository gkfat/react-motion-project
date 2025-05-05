import './App.css';

import {
    useEffect,
    useState,
} from 'react';

import {
    AnimatePresence,
    motion,
} from 'framer-motion';

import {
    Box,
    Card,
    CssBaseline,
} from '@mui/material';

const MotionBox = motion(Box);

const cardsCfg = [
    {
        id: 0,
        delay: 0.1,
        top: 0,
        left: 0,
        svgPath: 'M10,20 C40,10 60,40 90,20',
    },
    {
        id: 1,
        delay: 0.4,
        top: 0,
        right: 0,
        svgPath: 'M10,10 L90,10 L90,90 L10,90 Z',
    },
    {
        id: 2,
        delay: 0.6,
        left: 0,
        bottom: 0,
        svgPath: 'M50,10 L10,90 L90,90 Z',
    },
    {
        id: 3,
        delay: 0.9,
        right: 0,
        bottom: 0,
        svgPath: 'M10,50 Q50,10 90,50 Q50,90 10,50 Z',
    },
];

function AnimatedCard({
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
            exit={{
                opacity: 0,
                transition: { duration: 0.6 },
            }}
            transition={{
                duration: 1.5,
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
                            duration: 1.6,
                            delay,
                            ease: 'easeInOut',
                        }}
                    />
                </svg>
            </Card>
        </MotionBox>
    );
}

function App() {
    const [show, setShow] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const [colorChangedEnd, setColorChangedEnd] = useState(false);
    const [hideCards, setHideCards] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const handleCardClick = (id: number) => {
        if (selectedCardId !== null) return;

        setSelectedCardId(id);

        const selectedCfg = cardsCfg.find((cfg) => cfg.id === id);
        if (!selectedCfg) return;

        const getDelay = (selectedCfg.delay ?? 0) + 1.6;

        // 卡片變色完成
        setTimeout(() => {
            setColorChangedEnd(true);
        }, getDelay * 1000);

        // 其他卡片淡出
        setTimeout(() => {
            setHideCards(true);
        }, getDelay * 1000);
    };

    return (
        <>
            <CssBaseline />

            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    bgcolor: '#f5f5f5', 
                }}
            >
                <Card
                    variant="outlined"
                    sx={{
                        width: 400,
                        height: 500,
                        p: 3,
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%', 
                        }}
                    >
                        <AnimatePresence>
                            {show && (cardsCfg.map((cfg) => {
                                const isThisSelected = selectedCardId === cfg.id;
                                const shouldRender = isThisSelected || !hideCards;

                                return (
                                    shouldRender && (
                                        <AnimatedCard
                                            key={cfg.id}
                                            delay={cfg.delay}
                                            top={cfg.top}
                                            left={cfg.left}
                                            right={cfg.right}
                                            bottom={cfg.bottom}
                                            svgPath={cfg.svgPath}
                                            hide={hideCards && !isThisSelected}
                                            isSelected={isThisSelected}
                                            colorChangedEnd={colorChangedEnd}
                                            onClick={() => handleCardClick(cfg.id)}
                                        />
                                    )
                                );
                            }))}
                        </AnimatePresence>
                    </Box>
                </Card>
            </Box>
        </>
    );
}

export default App;
