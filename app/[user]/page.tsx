export default async function User({ params }: { params: { user: string } }) {
  const { user } = await params
  return (
    <div className="flex flex-col items-center mt-6 w-full">
      <h1>{`Welcome ${user}`}</h1>
    </div>
  );
}
