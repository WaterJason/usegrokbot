/** Keep a Bot's name readable without making its descriptor compete for space. */
export function TemplateName({ title }: { title: string }) {
  const match = title.match(/^(.+?)\s*[（(]([^（）()]+)[）)]$/u);

  if (!match) return <span className="block">{title}</span>;

  return (
    <>
      <span className="block">{match[1].trim()}</span>
      <span className="mt-1 block text-[15px] leading-6 font-normal tracking-normal text-mute">
        {match[2].trim()}
      </span>
    </>
  );
}
