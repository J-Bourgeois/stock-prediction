export default function User({ params }: { params: { user: string } }) {
  return (
    <div className="flex flex-col items-center mt-6 w-full">
      <h1>{`Welcome ${params.user}`}</h1>
    </div>
  );
}
