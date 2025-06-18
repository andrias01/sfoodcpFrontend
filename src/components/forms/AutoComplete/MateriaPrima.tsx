import React, { useEffect, useState } from "react";
import {
    useMateriaPrimaContext,
} from "../../../context/MateriaPrimaContext";
import "../Styles/CartaManagement.css";

// Tipo para proveedores permitidos
type Proveedor = "Avinal" | "Favio Verdura" | "Iglu" | "Centro de produccion";

// Interfaz de Materia Prima
interface MateriaPrima {
    id: string;
    nombre: string;
    proveedor: Proveedor;
    cantidad: number;
    unidadCompra:
    | "kilo"
    | "unidad"
    | "libra"
    | "canasta"
    | "paquete"
    | "caja"
    | "bolsa"
    | "botella"
    | "litro"
    | "onza";
    costo: number;
    costoPorUnidad: number;
    fechaCompra: string;
}

function MateriaPrimaManagement() {
    const {
        filteredMaterias,
        getMaterias,
        filterByNombre,
        createMateria,
        updateMateria,
        deleteMateria,
        error,
        loading,
    } = useMateriaPrimaContext();

    const proveedores: Proveedor[] = ["Avinal", "Favio Verdura", "Iglu", "Centro de produccion"];

    const [searchTerm, setSearchTerm] = useState("");
    const [form, setForm] = useState<Omit<MateriaPrima, "id" | "costoPorUnidad">>({
        nombre: "",
        proveedor: "" as Proveedor, // sin valor inicial
        cantidad: NaN,              // NaN para detectar si es inválido
        unidadCompra: "" as MateriaPrima["unidadCompra"],
        costo: NaN,                 // NaN para detectar si es inválido
        fechaCompra: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [filtered, setFiltered] = useState<MateriaPrima[]>(filteredMaterias);

    useEffect(() => {
        getMaterias();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFiltered(filteredMaterias);
        } else {
            filterByNombre(searchTerm);
        }
    }, [searchTerm]);

    useEffect(() => {
        setFiltered(filteredMaterias);
    }, [filteredMaterias]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "cantidad" || name === "costo" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { nombre, proveedor, cantidad, unidadCompra, costo, fechaCompra } = form;
        if (
            !nombre ||
            !proveedor ||
            !unidadCompra ||
            !fechaCompra ||
            isNaN(cantidad) || cantidad <= 0 ||
            isNaN(costo) || costo <= 0
        ) return;


        const materiaData = {
            ...form,
            proveedor: proveedor as Proveedor,
        };

        if (isEditing && editingId) {
            await updateMateria(editingId, materiaData);
        } else {
            await createMateria(materiaData);
        }
        getMaterias();
        resetForm();
    };

    const handleEdit = (materia: MateriaPrima) => {
        setForm({
            nombre: materia.nombre,
            proveedor: materia.proveedor,
            cantidad: materia.cantidad,
            unidadCompra: materia.unidadCompra,
            costo: materia.costo,
            fechaCompra: materia.fechaCompra,
        });
        setEditingId(materia.id);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("¿Deseas eliminar esta materia prima?")) {
            await deleteMateria(id);
            getMaterias();
        }
    };

    const resetForm = () => {
        setForm({
            nombre: "",
            proveedor: "Avinal",
            cantidad: 0,
            unidadCompra: "kilo",
            costo: 0,
            fechaCompra: "",
        });
        setIsEditing(false);
        setEditingId(null);
    };

    return (
        <div className="carta-management-container">
            <h2>Gestión de Materias Primas</h2>

            <form className="producto-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleInputChange}
                    required
                />

                <select
                    name="proveedor"
                    value={form.proveedor}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled hidden>Escoge un proveedor</option>
                    {proveedores.map((prov) => (
                        <option key={prov} value={prov}>
                            {prov}
                        </option>
                    ))}
                </select>


                <input
                    type="number"
                    name="cantidad"
                    placeholder="Cantidad"
                    value={isNaN(form.cantidad) ? "" : form.cantidad}
                    onChange={handleInputChange}
                    min="0"
                    required
                />


                <select
                    name="unidadCompra"
                    value={form.unidadCompra}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled hidden>Unidad compra</option>
                    {[
                        "kilo",
                        "unidad",
                        "libra",
                        "canasta",
                        "paquete",
                        "caja",
                        "bolsa",
                        "botella",
                        "litro",
                        "onza",
                    ].map((unidad) => (
                        <option key={unidad} value={unidad}>
                            {unidad}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    name="costo"
                    placeholder="Costo"
                    value={isNaN(form.costo) ? "" : form.costo}
                    onChange={handleInputChange}
                    min="0"
                    required
                />


                <input
                    type="date"
                    name="fechaCompra"
                    placeholder="Fecha de compra"
                    value={form.fechaCompra}
                    onChange={handleInputChange}
                    required
                />
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

            {loading && <p>Cargando materias primas...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <table className="producto-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Proveedor</th>
                        <th>Cantidad</th>
                        <th>Unidad</th>
                        <th>Costo</th>
                        <th>Unidad ($)</th>
                        <th>Fecha Compra</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((materia) => (
                        <tr key={materia.id}>
                            <td>{materia.nombre}</td>
                            <td>{materia.proveedor}</td>
                            <td>{materia.cantidad}</td>
                            <td>{materia.unidadCompra}</td>
                            <td>${materia.costo.toFixed(2)}</td>
                            <td>${materia.costoPorUnidad.toFixed(2)}</td>
                            <td>{materia.fechaCompra}</td>
                            <td>
                                <button onClick={() => handleEdit(materia)}>Editar</button>
                                <button onClick={() => handleDelete(materia.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MateriaPrimaManagement;
