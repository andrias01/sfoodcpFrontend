import { createContext, useContext, useEffect, useState } from "react";

// Definir tipos para TypeScript
interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
}

interface CartaActualContextType {
  productos: Producto[];
  filteredProductos: Producto[];
  setProductos: (productos: Producto[]) => void;
  getProductos: () => void;
  filterProductos: (nombre: string) => void;
  filterByCategoria: (categoria: string) => void;
  createProducto: (newProducto: Omit<Producto, 'id'>) => Promise<{ success: boolean; data?: Producto }>;
  deleteProducto: (id: string) => Promise<{ success: boolean }>;
  updateProducto: (id: string, updatedData: Partial<Producto>) => Promise<{ success: boolean }>;
  findProductosByName: (nombre: string) => Promise<Producto[]>;
  error: string | null;
  loading: boolean;
}

// Datos locales para testing
const mockProductos: Producto[] = [
  {
    id: "7f05b9c7-e709-4ec1-8c17-c0885812bd08",
    nombre: "Calentado Especial",
    precio: 15000,
    categoria: "Desayunos",
  },
  {
    id: "8f05b9c7-e709-4ec1-8c17-c0885812bd09",
    nombre: "Arepa con Queso",
    precio: 8000,
    categoria: "Desayunos",
  },
  {
    id: "9f05b9c7-e709-4ec1-8c17-c0885812bd10",
    nombre: "Bandeja Paisa",
    precio: 25000,
    categoria: "Almuerzos",
  },
  {
    id: "af05b9c7-e709-4ec1-8c17-c0885812bd11",
    nombre: "Sancocho de Gallina",
    precio: 20000,
    categoria: "Almuerzos",
  },
  {
    id: "bf05b9c7-e709-4ec1-8c17-c0885812bd12",
    nombre: "Empanada de Pollo",
    precio: 3500,
    categoria: "Mecatos",
  },
  {
    id: "cf05b9c7-e709-4ec1-8c17-c0885812bd13",
    nombre: "Jugo Natural",
    precio: 5000,
    categoria: "Bebidas",
  },
  {
    id: "df05b9c7-e709-4ec1-8c17-c0885812bd14",
    nombre: "Café con Leche",
    precio: 4000,
    categoria: "Bebidas",
  },
  {
    id: "ef05b9c7-e709-4ec1-8c17-c0885812bd15",
    nombre: "Arroz con Pollo",
    precio: 18000,
    categoria: "Almuerzos",
  }
];

// ✅ Crear contexto con valor por defecto
const CartaActualContexto = createContext<CartaActualContextType | null>(null);

function CartaActualProviderWrapper({ children }: { children: React.ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Simula la obtención de datos pero usa los datos locales
  const getProductos = () => {
    try {
      // Simulamos un pequeño retraso para imitar una petición a API
      setTimeout(() => {
        setProductos(mockProductos);
        setFilteredProductos(mockProductos);
        setError(null);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("No se pudo cargar la carta. Intenta más tarde.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  // Buscar por nombre
  const filterProductos = (nombre: string) => {
    const filtered = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    setFilteredProductos(filtered);
  };

  // Filtrar por categoría
  const filterByCategoria = (categoria: string) => {
    if (categoria === "Todos" || categoria === "") {
      setFilteredProductos(productos);
    } else {
      const filtered = productos.filter(producto =>
        producto.categoria.toLowerCase() === categoria.toLowerCase()
      );
      setFilteredProductos(filtered);
    }
  };

  const findProductosByName = (nombre: string): Promise<Producto[]> => {
    // Simula una búsqueda pero usando datos locales
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockProductos.filter((producto) =>
          producto.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  };

  // Crear nuevo producto
  const createProducto = (newProducto: Omit<Producto, 'id'>): Promise<{ success: boolean; data?: Producto }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generamos un ID único
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const productoWithId: Producto = { ...newProducto, id };
        
        // Actualizamos el estado con el nuevo producto
        setProductos(prevProductos => [...prevProductos, productoWithId]);
        setFilteredProductos(prevFiltered => [...prevFiltered, productoWithId]);
        
        // También actualizamos nuestros datos mock para mantener consistencia
        mockProductos.push(productoWithId);
        
        resolve({ success: true, data: productoWithId });
      }, 300);
    });
  };

  // Eliminar un producto por ID
  const deleteProducto = (id: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filtramos el producto del estado
        const updatedProductos = productos.filter(producto => producto.id !== id);
        setProductos(updatedProductos);
        setFilteredProductos(updatedProductos);
        
        // También actualizamos nuestros datos mock
        const indexToRemove = mockProductos.findIndex(producto => producto.id === id);
        if (indexToRemove !== -1) {
          mockProductos.splice(indexToRemove, 1);
        }
        
        resolve({ success: true });
      }, 300);
    });
  };

  // Modificar un producto por ID
  const updateProducto = (id: string, updatedData: Partial<Producto>): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Actualizamos en el estado
        const updatedProductos = productos.map(producto => 
          producto.id === id ? { ...producto, ...updatedData } : producto
        );
        setProductos(updatedProductos);
        setFilteredProductos(updatedProductos);
        
        // También actualizamos nuestros datos mock
        const productoIndex = mockProductos.findIndex(producto => producto.id === id);
        if (productoIndex !== -1) {
          mockProductos[productoIndex] = { ...mockProductos[productoIndex], ...updatedData };
        }
        
        resolve({ success: true });
      }, 300);
    });
  };

  const contextValue: CartaActualContextType = {
    productos,
    filteredProductos,
    setProductos,
    getProductos,
    filterProductos,
    filterByCategoria,
    createProducto,
    deleteProducto,
    updateProducto,
    findProductosByName,
    error,
    loading,
  };

  return (
    <CartaActualContexto.Provider value={contextValue}>
      {children}
    </CartaActualContexto.Provider>
  );
}

// Hook personalizado para usar el contexto
export const useCartaActualContext = () => {
  const context = useContext(CartaActualContexto);
  if (!context) {
    throw new Error('useCartaActualContext must be used within CartaActualProviderWrapper');
  }
  return context;
};

// Función auxiliar para obtener categorías únicas
export const getCategorias = (productos: Producto[]): string[] => {
  const categorias = productos.map(producto => producto.categoria);
  return [...new Set(categorias)];
};

export { CartaActualContexto, CartaActualProviderWrapper };