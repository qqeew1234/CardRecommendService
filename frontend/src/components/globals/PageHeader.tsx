interface myTypes{
  number : string;
  title : string;
  description : string;
  children: React.ReactNode;
}
export default function PageHeader({ number, title, description, children }: myTypes) {
  return (
    <div className="pageHeader">
      <header>
        <div className="hdrLeft">
          <h3>{number}</h3>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {children}
      </header>
    </div>
  );
}
