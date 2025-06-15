import Text from "@/components/Text/Text";
import pageCss from "./page.module.css";

export default function Home() {
  
  return (
    <div className={pageCss['page']}>
      <main className={pageCss['main']}>
        <Text tag={"h1"}>Dev Playground</Text>
        <p>Welcome to Dev Playground, a place where you can curate your upskilling goals all in one central playground.</p>
      </main>
    </div>
  );
}
