import { motion } from 'framer-motion';

import { ANIMATION_DURATION } from '../constants';

interface Props {
    selectedMenuText: string | null;
}

export function MenuTitleBar(props: Props) {
    const { selectedMenuText } = props;

    return (
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
    );
}