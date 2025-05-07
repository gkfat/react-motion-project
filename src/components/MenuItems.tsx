import { motion } from 'framer-motion';

import { Button } from '@mui/material';

import { ANIMATION_DURATION } from '../constants';

interface Props {
    selectedMenuText: string | null;
    handleMenuSelect: (title: string) => void;
}

export function MenuItems(props: Props) {
    const {
        selectedMenuText,
        handleMenuSelect, 
    } = props;

    const menuItems = [
        '選單 1',
        '選單 2',
        '選單 3',
    ];

    return  (
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
            {menuItems.map((title, i) => (
                <Button
                    key={i}
                    variant="outlined"
                    sx={{
                        mb: 2,
                        width: '100%',
                        backgroundColor: selectedMenuText === title ? '#1976d2' : '',
                        color: selectedMenuText === title ? '#fff' : '#1976d2',
                    }}
                    onClick={() => handleMenuSelect(title)}
                >
                    {title}
                </Button>
            ))}
        </motion.div>
    );
}