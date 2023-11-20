import Image from 'next/image';
type HomeSectionProps = {
  imgSrc: string,
  imgAlt: string,
  leftToRight: boolean,
  children: React.ReactNode
}
export default function HomeSection(props: HomeSectionProps) {
  return (
    <section className={`flex gap-5 ${props.leftToRight ? 'flex-row' : 'flex-row-reverse' }`}>
      <Image className="rounded-md" src={props.imgSrc} width={500} height={500} alt={props.imgAlt} />
      <div className={`flex flex-col justify-center ${props.leftToRight ? 'items-start' : 'items-end'}`}>
        {props.children}
      </div>
    </section>
  );
}