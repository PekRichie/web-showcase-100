import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface EnterpriseItem {
  id: number;
  title: string;
  department: string;
  status: 'Jóváhagyva' | 'Folyamatban' | 'Függőben';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="panel">
      <h1>Céges Flottakezelő</h1>
      <input [(ngModel)]="query" placeholder="Szűrés..." />
      <p>Találatok: {{ filtered().length }}</p>
      <ul>
        @for (item of filtered(); track item.id) {
          <li>
            <strong>{{ item.title }}</strong> ({{ item.department }}) —
            <button (click)="approve(item.id)">{{ item.status }}</button>
          </li>
        }
      </ul>
    </section>
  `,
})
export class AppComponent {
  query = signal('');
  items = signal<EnterpriseItem[]>([
    { id: 1, title: 'Fleet Manager – Q4 nyilvántartás', department: 'IT', status: 'Jóváhagyva' },
    { id: 2, title: 'Fleet Manager – Új kérelem', department: 'Operáció', status: 'Függőben' },
    { id: 3, title: 'Fleet Manager – Audit ellenőrzés', department: 'Pénzügy', status: 'Folyamatban' },
  ]);

  filtered = computed(() => {
    const q = this.query().toLowerCase();
    return this.items().filter((i) => i.title.toLowerCase().includes(q) || i.department.toLowerCase().includes(q));
  });

  approve(id: number): void {
    this.items.update((list) =>
      list.map((i) => (i.id === id ? { ...i, status: i.status === 'Jóváhagyva' ? 'Függőben' : 'Jóváhagyva' } : i))
    );
  }
}
