export interface PortfolioItem {
  id: number;
  url: string;
  title: string;
  projectName: string;
  type: 'portrait' | 'interior';
  x0: number; // initial coordinate on unit sphere
  y0: number;
  z0: number;
  bobOffset: number; // phase offset for vertical bobbing
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}
