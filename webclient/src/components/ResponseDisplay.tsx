interface ResponseDisplayProps {
  code: number;
  body: string;
}

export default function ResponseDisplay({ code, body }: ResponseDisplayProps) {
  return (
    <div className="mb-4 flex items-center space-x-4">
      <div className="font-bold">{code}</div>
      <div>{body}</div>
    </div>
  );
}