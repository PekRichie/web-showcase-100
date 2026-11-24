export type ItemStatus = 'active' | 'pending' | 'done';

export interface RecordItem {
  id: number;
  title: string;
  category: string;
  status: ItemStatus;
  value: number;
}

export class RBACMatrixStore {
  private items: RecordItem[] = [
    { id: 1, title: 'RBAC Matrix – Alap konfiguráció', category: 'Core', status: 'active', value: 120 },
    { id: 2, title: 'RBAC Matrix – API integráció', category: 'API', status: 'pending', value: 250 },
    { id: 3, title: 'RBAC Matrix – Produkciós ellenőrzés', category: 'Ops', status: 'done', value: 95 },
  ];

  list(filter = ''): RecordItem[] {
    const q = filter.trim().toLowerCase();
    return q ? this.items.filter(i => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)) : [...this.items];
  }

  add(title: string, category = 'General', value = 100): RecordItem {
    const item: RecordItem = { id: Date.now(), title, category, status: 'active', value };
    this.items = [item, ...this.items];
    return item;
  }

  cycleStatus(id: number): void {
    const order: ItemStatus[] = ['active', 'pending', 'done'];
    this.items = this.items.map(i => i.id === id ? { ...i, status: order[(order.indexOf(i.status) + 1) % order.length] } : i);
  }

  totalValue(): number {
    return this.items.reduce((acc, i) => acc + i.value, 0);
  }
}
