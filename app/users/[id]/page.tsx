export default async function Todos(props: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${props.params.id}`).then(resp=>resp.json())

  return (
    <>
      <p>id:{res.id}</p>
      <p>name:{res.name}</p>
    </>
  );
}
