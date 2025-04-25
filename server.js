import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el nombre del archivo actual para resolver rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Servir los archivos estáticos de Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta para obtener los datos astrológicos (como ejemplo)
app.get('/api/astro', (req, res) => {
  try {
    const currentDate = new Date();
    const chart = astrochart.chart({ date: currentDate });
    res.json(chart);  // Devuelve el gráfico como JSON
  } catch (error) {
    console.error('Error al generar el gráfico astrológico:', error);
    res.status(500).send('Error al generar el gráfico astrológico');
  }
});

// Servir el archivo index.html para todas las rutas restantes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
