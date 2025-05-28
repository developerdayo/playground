import pageCss from "./page.module.css";

export default function Home() {
  
  return (
    <div className={pageCss['page']}>
      <main className={pageCss['main']}>
        <h1>Dev Playground</h1>
        <p>Welcome to Dev Playground, a place where you can curate your upskilling goals all in one central playground.</p>
      </main>
    </div>
  );
}
