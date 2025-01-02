import Image from 'next/image';

export default function Author({
  name = 'Νοῦς Τεχνητός',
  avatar = '/avatar.png',
}) {
  return (
    <div className="flex items-center justify-end text-end">
      {/* <Image
        src={avatar}
        alt={`Avatar of ${name}`}
        width={50}
        height={50}
        className="rounded-full"
      /> */}
      <p className="font-semibold mr-3">Автор: Νοῦς Τεχνητός</p>
    </div>
  );
}
