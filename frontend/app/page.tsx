import Upload from "./components/Upload";
import List from "./components/List";

export default function Home () {
  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-black font-sans flex flex-col">

      {/* Header */}
      <header className="w-full border-b border-gray-200 bg-white dark:bg-black px-6 py-4">
        <h1 className="text-2xl font-bold">Enrichment Workflow</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 w-full overflow-hidden">

        {/* LEFT — Sidebar Upload */}
        <aside className="w-80 border-r border-gray-200 bg-white dark:bg-zinc-900 overflow-y-auto">
          <Upload />
        </aside>

        {/* RIGHT — List Area */}
        <section className="flex-1 bg-white dark:bg-zinc-900 overflow-y-auto">
          <List />
        </section>

      </main>
    </div>
  );
}
  