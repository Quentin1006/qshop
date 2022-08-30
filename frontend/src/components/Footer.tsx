import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex min-h-[120px] w-full items-center bg-slate-700 p-2 text-background">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full justify-center"
      >
        <div className="px-1">Powered by Qshop</div>
        <Image src="/logo-qshop-short.png" alt="Qshop Logo" width={32} height={32} />
      </a>
    </footer>
  );
}
