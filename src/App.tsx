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
    Button,
    Card,
    CssBaseline,
} from '@mui/material';

const MotionBox = motion(Box);

const ANIMATION_DURATION = 0.5;

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

function App() {
    const [show, setShow] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const [colorChangedEnd, setColorChangedEnd] = useState(false);
    const [hideCards, setHideCards] = useState(false);
    const [shouldFadeOutSelectedCard, setShouldFadeOutSelectedCard] = useState(false);

    const [showTitleBar, setShowTitleBar] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedMenuText, setSelectedMenuText] = useState<string | null>(null);
    const [hideMenu, setHideMenu] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const sleepSeconds = (seconds: number) => new Promise(
        (resolve) => {
            setTimeout(() => resolve(null), seconds * 1000);
        },
    );

    const handleCardClick = async (id: number) => {
        if (selectedCardId !== null) return;

        // 選中卡片開始變色
        setSelectedCardId(id);
        await sleepSeconds(1.5);

        // 卡片變色完成
        setColorChangedEnd(true);
        // 其他卡片淡出
        setHideCards(true);
        await sleepSeconds(1.5);

        // 選中卡片淡出
        setShouldFadeOutSelectedCard(true);
        await sleepSeconds(1);

        // 顯示選單標題列
        setShowTitleBar(true);
        await sleepSeconds(0.5);
      
        setShowMenu(true);
    };

    const handleMenuSelect = async (text: string) => {
        await sleepSeconds(0.5);

        setSelectedMenuText(text);

        await sleepSeconds(1);

        setHideMenu(true); // 開始 menu 淡出動畫
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
                                const shouldRender = isThisSelected
                                    ? !shouldFadeOutSelectedCard
                                    : !hideCards;

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

                        <AnimatePresence>
                            {showTitleBar && !hideMenu &&(
                                <motion.div
                                    initial={{
                                        y: -60,
                                        opacity: 0, 
                                    }}
                                    animate={{
                                        y: 0,
                                        opacity: 1, 
                                    }}
                                    exit={{
                                        y: -60,
                                        opacity: 0, 
                                    }}
                                    transition={{ duration: ANIMATION_DURATION }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: 60,
                                        border: '1px solid #1976d2',
                                        backgroundColor: '#fff',
                                        borderRadius: 10,
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '0 24px',
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        zIndex: 100,
                                        overflow: 'hidden',
                                    }}
                                >
                                    {selectedMenuText && (
                                        <motion.div
                                            initial={{
                                                width: 0,
                                                opacity: 0, 
                                            }}
                                            animate={{
                                                width: '100%',
                                                opacity: 1, 
                                            }}
                                            transition={{ duration: ANIMATION_DURATION }}
                                            style={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                color: '#1976d2',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {selectedMenuText}
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showMenu && !hideMenu && (
                                <motion.div
                                    initial={{
                                        y: -20,
                                        opacity: 0, 
                                    }}
                                    animate={{
                                        y: 0,
                                        opacity: 1, 
                                    }}
                                    exit={{
                                        y: -20,
                                        opacity: 0, 
                                    }}
                                    transition={{ duration: ANIMATION_DURATION }}
                                    style={{
                                        position: 'absolute',
                                        top: 60,
                                        left: 20,
                                        right: 20,
                                        padding: 16,
                                        border: '1px solid #1976d2',
                                        borderTop: 'none',
                                        borderBottomRightRadius: 10,
                                        borderBottomLeftRadius: 10,
                                    }}
                                >
                                    {[
                                        '選單 1',
                                        '選單 2',
                                        '選單 3',
                                    ].map((text) => (
                                        <Button
                                            key={text}
                                            variant="outlined"
                                            sx={{
                                                mb: 2,
                                                width: '100%',
                                                backgroundColor: selectedMenuText === text ? '#1976d2' : '',
                                                color: selectedMenuText === text ? '#fff' : '#1976d2',
                                            }}
                                            onClick={() => handleMenuSelect(text)}
                                        >
                                            {text}
                                        </Button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </Box>
                </Card>
            </Box>
        </>
    );
}

export default App;
