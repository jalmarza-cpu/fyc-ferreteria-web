import React from 'react';
import { motion } from 'framer-motion';
// Agregué 'Zap' (Rayo) para electricidad y 'Wrench' (Llave) para Maquinaria
import { Hammer, Droplets, PaintRoller, Zap, ArrowRight, Wrench } from 'lucide-react';

interface CategoryBentoProps {
  onSelectCategory: (category: string) => void;
}

const CategoryBento: React.FC<CategoryBentoProps> = ({ onSelectCategory }) => {
  
  // AQUÍ ESTÁ EL CAMBIO: Categorías Reales del Proveedor
  const categories = [
    {
      id: 'maquinaria',
      name: 'Maquinaria', // Nombre Real
      icon: Wrench,
      color: 'bg-yellow-600',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800', // Foto Taladro
      className: 'md:col-span-2 md:row-span-2',
      filterKey: 'Maquinaria' // Enlace a categoría real
    },
    {
      id: 'griferia',
      name: 'Grifería', // Nombre Real
      icon: Droplets,
      color: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=600', // Foto Gasfitería
      className: 'md:col-span-1 md:row-span-1',
      filterKey: 'Grifería' // Enlace a categoría real
    },
    {
      id: 'herramientas',
      name: 'Herramientas', // Nombre Real (Aquí están tus brochas)
      icon: PaintRoller, // Icono Rodillo (Coincide con tu stock)
      color: 'bg-purple-600',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=600', // Foto Pintura
      className: 'md:col-span-1 md:row-span-1',
      filterKey: 'Herramientas' // Enlace a donde están tus productos hoy
    },
    {
      id: 'electricidad',
      name: 'Electricidad', // Nombre Real (Categoría fuerte)
      icon: Zap, // Icono Rayo
      color: 'bg-orange-600',
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800', // Foto Cables/Obra
      className: 'md:col-span-2 md:row-span-1',
      filterKey: 'Electricidad' // Enlace a categoría real
    }
  ];

  return (
    <section className="py-16 px-6 md:px-12 bg-[#0A0A0A]">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-10 flex items-end justify-between border-b border-[#222] pb-6">
          <div>
            <span className="text-[#FF
