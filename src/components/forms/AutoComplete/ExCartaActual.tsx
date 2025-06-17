import React, { useEffect, useState } from "react";
import { useCartaActualContext, getCategorias } from "../../../context/CartaActualContext";
import "../Styles/CartaManagement.css";

// Interfaz para producto
interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
}

function CartaManagement() {
  const {
    productos,
    filteredProductos,
    getProductos,
    filterByCategoria,
    createProducto,
    updateProducto,
    deleteProducto,
    findProductosByName,
    error,
    loading,
  } = useCartaActualContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const [form, setForm] = useState({ id: "", nombre: "", precio: "", categoria: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [filtered, setFiltered] = useState<Producto[]>(filteredProductos);

  useEffect(() => {
    getProductos();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      filterByCategoria(categoriaFiltro);
    } else {
      findProductosByName(searchTerm).then((results: Producto[]) => {
        filterByCategoria(""); // Reset para usar solo resultados del filtro por nombre
        setFiltered(results);
      });
    }
  }, [searchTerm, categoriaFiltro]);

  useEffect(() => {
    setFiltered(filteredProductos);
  }, [filteredProductos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nombre: form.nombre,
      precio: parseFloat(form.precio),
      categoria: form.categoria,
    };
    if (!payload.nombre || isNaN(payload.precio) || !payload.categoria) return;

    if (isEditing && form.id) {
      await updateProducto(form.id, payload);
    } else {
      await createProducto(payload);
    }

    getProductos();
    resetForm();
  };

  const handleEdit = (producto: Producto) => {
    setForm({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio.toString(),
      categoria: producto.categoria,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Deseas eliminar este producto?")) {
      await deleteProducto(id);
      getProductos();
    }
  };

  const resetForm = () => {
    setForm({ id: "", nombre: "", precio: "", categoria: "" });
    setIsEditing(false);
  };

  const categorias = ["Todos", ...getCategorias(productos)];

  return (
    <div className="carta-management-container">
      <h2>Carta Actual</h2>

      <form className="producto-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleInputChange}
          required
        />
        <select name="categoria" value={form.categoria} onChange={handleInputChange} required>
          <option value="">Selecciona categoría</option>
          {categorias
            .filter((cat) => cat !== "Todos")
            .map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
        </select>
        <button type="submit">{isEditing ? "Actualizar" : "Crear"}</button>
        {isEditing && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <select
        value={categoriaFiltro}
        onChange={(e) => setCategoriaFiltro(e.target.value)}
        className="category-filter"
      >
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="producto-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((producto: Producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>${producto.precio.toLocaleString()}</td>
              <td>{producto.categoria}</td>
              <td>
                <button onClick={() => handleEdit(producto)}>Editar</button>
                <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartaManagement;
