import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MapLegend = ({ breaks = [], colors = [], title = "Preço Médio" }) => {
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                bgcolor: "white",
                borderRadius: 1,
                boxShadow: 2,
                p: 2,
                zIndex: 1000,
                minWidth: 120
            }}
        >
            <Typography variant="subtitle2" gutterBottom>
                {title}
            </Typography>
            {breaks.map((brk, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                    <Box sx={{
                        width: 18,
                        height: 18,
                        bgcolor: colors[idx],
                        border: "1px solid #ccc",
                        mr: 1
                    }} />
                    <Typography variant="body2">
                        Até R$ {Number(brk).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                    </Typography>
                </Box>
            ))}
            {breaks.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{
                        width: 18,
                        height: 18,
                        bgcolor: colors[colors.length - 1],
                        border: "1px solid #ccc",
                        mr: 1
                    }} />
                    <Typography variant="body2">
                        Acima de R$ {Number(breaks[breaks.length - 1]).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default MapLegend;