import Link from "next/link";

type HomeMenuItemProps = {
  title: string,
  imageSrc: string,
  href: string
}

export default async function HomeMenuItem(props: HomeMenuItemProps) {
  return (
    <Link href={props.href}>
      <div className="card w-96 bg-base-100 image-full cursor-pointer hover:ring-2 hover:ring-green-500 active:ring-2 active:ring-green-500">
        <figure><img src={props.imageSrc} alt={props.title} /></figure>
        <div className="card-body flex flex-col items-center justify-center">
          <h2 className="card-title">{props.title}</h2>
        </div>
      </div>
    </Link>
  );
}