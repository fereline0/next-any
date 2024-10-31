interface MainProps {
  children: React.ReactNode;
}

export default function Main(props: MainProps) {
  return <div className="w-full">{props.children}</div>;
}
