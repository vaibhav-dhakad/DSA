import { MessageCircle, ShieldCheck, Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export const ChatShell = () => {
  const chats = useSelector((state: RootState) => state.chat.chats);

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl gap-4 p-6 text-slate-100">
      <aside className="w-96 rounded-xl border border-slate-700 bg-slate-900 p-4">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Realtime WhatsApp Clone</h1>
          <Star className="text-amber-400" size={20} />
        </header>
        <ul className="space-y-3">
          {chats.map((chat) => (
            <li key={chat.id} className="rounded-lg bg-slate-800 p-3">
              <p className="font-semibold">{chat.title}</p>
              <p className="text-sm text-slate-400">{chat.lastMessage}</p>
              {chat.unread > 0 && <span className="text-xs text-emerald-400">{chat.unread} unread</span>}
            </li>
          ))}
        </ul>
      </aside>
      <section className="flex-1 rounded-xl border border-slate-700 bg-slate-900 p-6">
        <div className="mb-3 flex items-center gap-2 text-emerald-300"><ShieldCheck size={16} /> JWT Auth + PremiumStatus enabled</div>
        <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-600 p-6 text-slate-400">
          <MessageCircle />
          Event-driven microservices ready with Kafka + Redis tick updates.
        </div>
      </section>
    </main>
  );
};
