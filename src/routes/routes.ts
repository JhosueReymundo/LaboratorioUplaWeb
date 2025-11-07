// src/routes/routes.ts
export interface RouteItem {
  path: string;
  label: string;
  icon: string;
}

export const routes: RouteItem[] = [
  { path: '/home', label: 'Home', icon: 'Bell' },
  { path: '/documentos', label: 'Documentos de Gestión', icon: 'FileText' },
  { path: '/nosotros', label: 'Sobre Nosotros', icon: 'Users' },
  { path: '/servicios', label: 'Servicios', icon: 'Wrench' },
  { path: '/horarios', label: 'Horarios', icon: 'Clock' },
  { path: '/productos', label: 'Productos', icon: 'Package' },
  { path: '/comunicados', label: 'Comunicados', icon: 'Bell' },
];