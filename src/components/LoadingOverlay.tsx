import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingOverlayProps {
    message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Génération de la recette en cours...' }) => (
    <Box
        sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
        }}
    >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
            {message}
        </Typography>
    </Box>
);

export default LoadingOverlay;