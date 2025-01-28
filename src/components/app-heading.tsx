interface AppHeadingProps {
  heading: string;
  description: string;
}

export default function AppHeading({ heading, description }: AppHeadingProps) {
  return (
    <div className="w-full space-y-4">
      <h1 className="font-bold text-5xl">{heading}</h1>
      <p>{description}</p>
    </div>
  );
}
