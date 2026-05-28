import { MenuItem } from './types';

export const menuData: MenuItem[] = [
  // Coffee
  { id: 'c1', name: 'Kopi Susu Klopp', desc: 'Signature kopi susu gula aren', price: 25000, img: 'https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?q=80&w=400&h=400&fit=crop', category: 'coffee' },
  { id: 'c2', name: 'Americano', desc: 'Hot / Iced, bold and smooth', price: 22000, img: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=400&h=400&fit=crop', category: 'coffee' },
  { id: 'c3', name: 'Cafe Latte', desc: 'Perfectly textured milk', price: 28000, img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400&h=400&fit=crop', category: 'coffee' },
  { id: 'c4', name: 'Cappuccino', desc: 'Espresso dengan foam tebal', price: 28000, img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=400&h=400&fit=crop', category: 'coffee' },
  // Non-Coffee
  { id: 'n1', name: 'Matcha Latte', desc: 'Matcha premium dengan susu', price: 30000, img: 'https://images.unsplash.com/photo-1515823662972-da6a2b4d3002?q=80&w=400&h=400&fit=crop', category: 'non-coffee' },
  { id: 'n2', name: 'Artisan Tea', desc: 'Pilihan Earl grey / Chamomile', price: 25000, img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=400&h=400&fit=crop', category: 'non-coffee' },
  { id: 'n3', name: 'Mix Platter', desc: 'Snack ringan pendamping', price: 20000, img: 'https://images.unsplash.com/photo-1625938146369-adc83368b421?q=80&w=400&h=400&fit=crop', category: 'non-coffee' },
  { id: 'n4', name: 'Choco Signature', desc: 'Coklat tebal dan creamy', price: 28000, img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=400&h=400&fit=crop', category: 'non-coffee' }
];

export const formatRp = (number: number) => new Intl.NumberFormat('id-ID').format(number);
