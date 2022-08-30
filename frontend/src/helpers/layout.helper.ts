export function closePanel(): void {
  document.querySelector('.page')?.classList.remove('side-panel-open');
}

export function openPanel(): void {
  document.querySelector('.page')?.classList.add('side-panel-open');
}

export function togglePanel(): void {
  const isOpen = document
    .querySelector('.page')
    ?.classList.contains('side-panel-open');
  isOpen ? closePanel() : openPanel();
}
