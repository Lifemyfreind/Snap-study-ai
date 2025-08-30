import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="card p-8">
        <h1 className="text-2xl font-semibold mb-3">AI Vision App</h1>
        <p className="text-white/70 mb-6">Choose a feature:</p>
        <div className="flex gap-4">
          <Link className="btn" href="/chat">Chat (text + images)</Link>
          <Link className="btn" href="/docs">Document Q&A (book pages)</Link>
        </div>
      </div>
    </main>
  )
}

