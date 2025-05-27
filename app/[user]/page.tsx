export default function User({ params }: { params: { user: string } }) {
    
  return (
  <div className="">
    <h1>{`Welcome ${params}`}</h1>
  </div>
  );
};
