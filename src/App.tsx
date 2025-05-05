import './App.css';

import {
    useEffect,
    useState,
} from 'react';

import { motion } from 'framer-motion';

import {
    Box,
    Card,
    CardContent,
    CssBaseline,
    Grid,
    Typography,
} from '@mui/material';

function TitleBlock() {
    return (
        <>
            <Typography
                variant="h6"
                align="center"
            >
                歡迎進駐 匠藝幾何世界
            </Typography>
            <Typography
                variant="h6"
                align="center"
            >
                靜下心，抽取專屬心靈卡牌
            </Typography>
        </>
    );
}

const MotionBox = motion(Box);

function AnimatedCard({
    delay = 0,
    initialX,
    initialY,
    title,
}: {
  delay?: number;
  initialX: number;
  initialY: number;
  title: string;
}) {
    return (
        <MotionBox
            initial={{
                x: initialX,
                y: initialY,
                opacity: 0,
            }}
            animate={{
                x: 0,
                y: 0,
                opacity: 1, 
            }}
            transition={{
                duration: 1.2,
                delay, 
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    width: '100px',
                    height: '140px',
                    bgcolor: '#fff',
                    position: 'relative', 
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '-10px',
                        right: '-10px',
                        border: '1px solid #eee',
                    }}
                >
                    <Typography
                        textAlign="center"
                    >
                        {title}
                    </Typography>
                </Box>
            </Card>
        </MotionBox>
    );
}

function App() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <>
            <CssBaseline />

            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#f5f5f5', 
                }}
            >
                <Card
                    variant="outlined"
                    sx={{ width: 320 }}
                >
                    <CardContent>
                        {/* 標題區域 */}
                        <TitleBlock />

                        {/* 卡片區域 */}
                        <Box mt={3}>
                            <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                            >
                                {show && (
                                    <>
                                        <Grid sx={{ mx: 2 }}>
                                            <AnimatedCard
                                                delay={0.1}
                                                initialX={-15}
                                                initialY={-15}
                                                title="毅力"
                                            />
                                        </Grid>
                                        <Grid sx={{ mx: 2 }}>
                                            <AnimatedCard
                                                delay={0.2}
                                                initialX={15}
                                                initialY={-15}
                                                title="樂觀"
                                            />
                                        </Grid>
                                        <Grid sx={{ mx: 2 }}>
                                            <AnimatedCard
                                                delay={0.3}
                                                initialX={-15}
                                                initialY={15}
                                                title="積極"
                                            />
                                        </Grid>
                                        <Grid sx={{ mx: 2 }}>
                                            <AnimatedCard
                                                delay={0.4}
                                                initialX={15}
                                                initialY={15}
                                                title="執著"
                                            />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}

export default App;
