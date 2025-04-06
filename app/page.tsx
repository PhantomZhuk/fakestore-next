import Header from "@/components/home/Header";
import Main from "@/components/home/Main";

export default function Home() {
  return (
    <div className="w-full min-h-[100dvh] flex flex-col justify-between bg-gray-100">
      <Header />
      <Main />
    </div>
  );
}
