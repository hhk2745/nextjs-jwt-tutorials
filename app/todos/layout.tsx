export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <section>
          <nav>READ TODOS</nav>
          <article>{children}</article>
      </section>
  );
}
