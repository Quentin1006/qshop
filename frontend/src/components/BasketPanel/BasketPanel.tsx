'use client';

import { closePanel } from '@/helpers/layout.helper';
import styles from './basket-panel.module.css';

export default function BasketPanel() {
  return (
    <>
      <div className={styles.side_panel_wrapper}>
        <div className={styles.header}>
          <div className={styles.title}>Mon Panier</div>
          <div>
            <button onClick={closePanel}>X</button>
          </div>
        </div>
      </div>
    </>
  );
}
