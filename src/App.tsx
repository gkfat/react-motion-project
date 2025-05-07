import {
    useEffect,
    useState,
} from 'react';

import { AnimatePresence } from 'framer-motion';

import {
    Box,
    Card,
    CssBaseline,
} from '@mui/material';

import { AnimatedCard } from './components/AnimatedCard';
import { MenuItems } from './components/MenuItems';
import { MenuTitleBar } from './components/MenuTitleBar';

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
                            {showTitleBar && !hideMenu && (
                                <MenuTitleBar
                                    selectedMenuText={selectedMenuText}
                                />
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showMenu && !hideMenu && (
                                <MenuItems
                                    selectedMenuText={selectedMenuText}
                                    handleMenuSelect={handleMenuSelect}
                                />
                            )}
                        </AnimatePresence>

                    </Box>
                </Card>
            </Box>
        </>
    );
}

export default App;
