import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 flex flex-col items-stretch px-96">
      <div className='flex flex-rowtext-base-content justify-center gap-20'>
      <aside className='flex flex-col items-center'>
        <Image src="/faaapu-icon-64x64.webp" alt='Icône Faaapu' height={64} width={64} />
        <p>Fa'a'apu</p>
      </aside>
      <nav>
        <header className="footer-title">Legal</header>
        <Link href={'/terms-of-usage'} className="link link-hover">Conditions d'utilisation</Link>
        <Link href={'/privacy-policy'} className="link link-hover">Politique de confidentialité</Link>
      </nav>
      <nav>
        <header className="footer-title">Contact</header>
        <p>faaapu@gmail.com</p>
      </nav>
      </div>
      
      <nav>
        <p className='text-xs'>Les images contenues dans les pages publiques ont été générés avec une intelligence artificielle. Les personnes qui y apparaissent sont fictives et n'existent pas dans la réalité. Aucune information personnelle ou identifiable concernant des individus réels n'a été utilisée dans la création de ces images. Elles ne doivent pas être interprétées comme représentant des personnes ou des événements réels. En cas de préoccupations concernant la vie privée ou d'autres questions, veuillez nous contacter à faaapu@gmail.com.</p>
      </nav>
    </footer>
  );
}