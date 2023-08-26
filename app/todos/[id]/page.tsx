export default async function Todos(props: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${props.params.id}`).then(resp=>resp.json())

  return (
    <>
      <p>id:{res.id}</p>
      <p>content:{res.content}</p>
      <p>completed:{res.completed ? 'done!' : 'yet!'}</p>
    </>
  );
}
