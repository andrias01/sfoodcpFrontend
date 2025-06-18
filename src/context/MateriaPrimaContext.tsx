import { createContext, useContext, useEffect, useState } from "react";

// Definir tipos
export interface MateriaPrima {
  id: string;
  nombre: string;
  proveedor: 'Avinal' | 'Favio Verdura' | 'Iglu' | 'Centro de produccion';
  cantidad: number;
  unidadCompra: 'kilo' | 'unidad' | 'libra' | 'canasta' | 'paquete' | 'caja' | 'bolsa' | 'botella' | 'litro' | 'onza';
  costo: number;
  costoPorUnidad: number;
  fechaCompra: string;
}

interface MateriaPrimaContextType {
  materias: MateriaPrima[];
  filteredMaterias: MateriaPrima[];
  setMaterias: (materias: MateriaPrima[]) => void;
  getMaterias: () => void;
  filterByNombre: (nombre: string) => void;
  createMateria: (nueva: Omit<MateriaPrima, 'id' | 'costoPorUnidad'>) => Promise<{ success: boolean; data?: MateriaPrima }>;
  updateMateria: (id: string, data: Partial<MateriaPrima>) => Promise<{ success: boolean }>;
  deleteMateria: (id: string) => Promise<{ success: boolean }>;
  error: string | null;
  loading: boolean;
}

// Datos mock iniciales
const mockMaterias: MateriaPrima[] = [
    {
    id: "7f05b9c7-e709-4ec1-8c17-c0885812bd08",
    nombre: "Cilantro Fresco",
    proveedor: "Favio Verdura",
    cantidad: 10,
    unidadCompra: "kilo",
    costo: 150000,
    costoPorUnidad: 15000,
    fechaCompra: "2023-10-01",
  },
  {
    id: "8f05b9c7-e709-4ec1-8c17-c0885812bd09",
    nombre: "Tomate Madurado",
    proveedor: "Favio Verdura",
    cantidad: 20,
    unidadCompra: "unidad",
    costo: 80000,
    costoPorUnidad: 4000,
    fechaCompra: "2023-10-02",
  },
  {
    id: "9f05b9c7-e709-4ec1-8c17-c0885812bd10",
    nombre: "Uva de Mesa",
    proveedor: "Favio Verdura",
    cantidad: 15,
    unidadCompra: "libra",
    costo: 375000,
    costoPorUnidad: 25000,
    fechaCompra: "2023-10-03",
  },
  {
    id: "af05b9c7-e709-4ec1-8c17-c0885812bd11",
    nombre: "Zanahoria Orgánica",
    proveedor: "Favio Verdura",
    cantidad: 12,
    unidadCompra: "canasta",
    costo: 240000,
    costoPorUnidad: 20000,
    fechaCompra: "2023-10-04",
  },
];

const MateriaPrimaContext = createContext<MateriaPrimaContextType | null>(null);

export function MateriaPrimaProviderWrapper({ children }: { children: React.ReactNode }) {
  const [materias, setMaterias] = useState<MateriaPrima[]>([]);
  const [filteredMaterias, setFilteredMaterias] = useState<MateriaPrima[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getMaterias = () => {
    try {
      setTimeout(() => {
        setMaterias(mockMaterias);
        setFilteredMaterias(mockMaterias);
        setError(null);
        setLoading(false);
      }, 300);
    } catch (err) {
      console.error("Error al cargar materias primas:", err);
      setError("No se pudo cargar la información.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getMaterias();
  }, []);

  const filterByNombre = (nombre: string) => {
    const filtered = materias.filter(m =>
      m.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    setFilteredMaterias(filtered);
  };

  const createMateria = (
    nueva: Omit<MateriaPrima, 'id' | 'costoPorUnidad'>
  ): Promise<{ success: boolean; data?: MateriaPrima }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const id = crypto.randomUUID();
        const costoPorUnidad = nueva.costo / nueva.cantidad;
        const nuevaMateria: MateriaPrima = { ...nueva, id, costoPorUnidad };

        setMaterias(prev => [...prev, nuevaMateria]);
        setFilteredMaterias(prev => [...prev, nuevaMateria]);
        mockMaterias.push(nuevaMateria);

        resolve({ success: true, data: nuevaMateria });
      }, 300);
    });
  };

  const updateMateria = (
    id: string,
    data: Partial<MateriaPrima>
  ): Promise<{ success: boolean }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const updated = materias.map(m => {
          if (m.id === id) {
            const updatedItem = {
              ...m,
              ...data,
              costoPorUnidad: (data.costo ?? m.costo) / (data.cantidad ?? m.cantidad)
            };
            return updatedItem;
          }
          return m;
        });

        setMaterias(updated);
        setFilteredMaterias(updated);

        const index = mockMaterias.findIndex(m => m.id === id);
        if (index !== -1) {
          mockMaterias[index] = updated[index];
        }

        resolve({ success: true });
      }, 300);
    });
  };

  const deleteMateria = (id: string): Promise<{ success: boolean }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const filtrado = materias.filter(m => m.id !== id);
        setMaterias(filtrado);
        setFilteredMaterias(filtrado);

        const index = mockMaterias.findIndex(m => m.id === id);
        if (index !== -1) {
          mockMaterias.splice(index, 1);
        }

        resolve({ success: true });
      }, 300);
    });
  };

  const contextValue: MateriaPrimaContextType = {
    materias,
    filteredMaterias,
    setMaterias,
    getMaterias,
    filterByNombre,
    createMateria,
    updateMateria,
    deleteMateria,
    error,
    loading,
  };

  return (
    <MateriaPrimaContext.Provider value={contextValue}>
      {children}
    </MateriaPrimaContext.Provider>
  );
}

export const useMateriaPrimaContext = () => {
  const context = useContext(MateriaPrimaContext);
  if (!context) {
    throw new Error("useMateriaPrimaContext debe usarse dentro de MateriaPrimaProviderWrapper");
  }
  return context;
};
