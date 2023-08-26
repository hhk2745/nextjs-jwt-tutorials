export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <section>
          <nav>READ USERS</nav>
          <article>{children}</article>
      </section>
  );
}
