import Image from 'next/image';

export default function Author({ name = 'Νοῦς', avatar = '/nous.png' }) {
  return (
    <div className="flex items-center justify-end text-end">
      <p className="font-semibold mr-1.5">Автор:</p>
      <Image
        src={avatar}
        alt={`Avatar of ${name}`}
        width={37}
        height={37}
        className="rounded-lg mr-1"
      />
    </div>
  );
}
