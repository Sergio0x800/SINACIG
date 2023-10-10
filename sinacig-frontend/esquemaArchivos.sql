-- Tabla de archivos
CREATE TABLE archivos (
  id_archivo INT PRIMARY KEY,
  id_matriz_riesgo INT,
  nombre_archivo VARCHAR(255),
  ruta_archivo VARCHAR(255),
  tipo_archivo VARCHAR(255),
  -- Tipo MIME del archivo
  tamano_archivo INT,
  -- Tamaño en bytes del archivo
  descripcion TEXT,
  -- Descripción del archivo
  FOREIGN KEY (id_matriz_riesgo) REFERENCES matriz_riesgo(id_matriz_riesgo)
);