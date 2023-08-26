export default async function Todos(props: any) {
  const res = await fetch(`http://127.0.0.1:9999/users/${props.params.id}`).then(resp=>resp.json())

  return (
    <>
      <p>id:{res.id}</p>
      <p>name:{res.name}</p>
    </>
  );
}
