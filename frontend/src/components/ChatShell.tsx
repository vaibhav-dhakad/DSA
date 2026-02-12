import { FormEvent, useMemo, useState } from 'react';
import {
  Check,
  CheckCheck,
  Crown,
  Mic,
  MonitorPlay,
  Search,
  SendHorizontal,
  ShieldCheck,
  Users,
  UserRound
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
  MessageType,
  selectActiveChat,
  selectFilteredChats,
  sendMessage,
  setActiveChat,
  setCurrentUser,
  setSearchTerm,
  TickStatus
} from '../features/chat/chatSlice';

const Tick = ({ status }: { status: TickStatus }) => {
  if (status === 'SENT') return <Check size={14} className="text-slate-400" />;
  if (status === 'DELIVERED') return <CheckCheck size={14} className="text-slate-400" />;
  return <CheckCheck size={14} className="text-sky-400" />;
};

const MediaPreview = ({ type, content, mediaUrl }: { type: MessageType; content: string; mediaUrl?: string }) => {
  if (type === 'AUDIO') {
    return (
      <div className="flex items-center gap-2">
        <Mic size={14} />
        <a href={mediaUrl} className="underline" target="_blank" rel="noreferrer">
          {content}
        </a>
      </div>
    );
  }
  if (type === 'VIDEO') {
    return (
      <div className="flex items-center gap-2">
        <MonitorPlay size={14} />
        <a href={mediaUrl} className="underline" target="_blank" rel="noreferrer">
          {content}
        </a>
      </div>
    );
  }
  return <p>{content}</p>;
};

export const ChatShell = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chats = useSelector(selectFilteredChats);
  const activeChat = useSelector(selectActiveChat);
  const activeChatId = useSelector((state: RootState) => state.chat.activeChatId);
  const currentUserId = useSelector((state: RootState) => state.chat.currentUserId);
  const [draft, setDraft] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('TEXT');

  const chatTitle = useMemo(() => activeChat?.title ?? 'Select a chat', [activeChat?.title]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!activeChat) return;
    dispatch(
      sendMessage({
        chatId: activeChat.id,
        content: draft,
        messageType,
        mediaUrl: messageType === 'TEXT' ? undefined : 'https://cdn.example.com/mock-upload'
      })
    );
    setDraft('');
    setMessageType('TEXT');
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl gap-4 p-4 text-slate-100 md:p-6">
      <aside className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-2xl shadow-slate-950">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Chats</h1>
            <p className="text-xs text-slate-400">Realtime • Kafka • Redis</p>
          </div>
          <div className="rounded-lg border border-amber-500/40 bg-amber-400/10 px-2 py-1 text-xs text-amber-300">Premium</div>
        </header>

        <div className="mb-3 flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 p-1">
          <button
            className={`flex-1 rounded-md px-2 py-1 text-xs ${currentUserId === 'me' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'}`}
            onClick={() => dispatch(setCurrentUser('me'))}
          >
            User A
          </button>
          <button
            className={`flex-1 rounded-md px-2 py-1 text-xs ${currentUserId === 'u2' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'}`}
            onClick={() => dispatch(setCurrentUser('u2'))}
          >
            User B
          </button>
        </div>

        <label className="mb-4 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2">
          <Search size={16} className="text-slate-400" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            placeholder="Search chats"
            onChange={(event) => dispatch(setSearchTerm(event.target.value))}
          />
        </label>

        <ul className="space-y-2">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`cursor-pointer rounded-xl border p-3 transition ${
                activeChatId === chat.id
                  ? 'border-emerald-500/50 bg-emerald-500/10'
                  : 'border-slate-800 bg-slate-800/60 hover:border-slate-700'
              }`}
              onClick={() => dispatch(setActiveChat(chat.id))}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {chat.isGroup ? <Users size={14} className="text-slate-400" /> : <UserRound size={14} className="text-slate-400" />}
                  <p className="truncate text-sm font-semibold">{chat.title}</p>
                  {chat.isPremium && <Crown size={13} className="text-amber-400" />}
                </div>
                {chat.unread > 0 && <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold">{chat.unread}</span>}
              </div>
              <p className="text-xs text-slate-400">{chat.typing ? 'typing…' : chat.lastSeen}</p>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex flex-1 flex-col rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl shadow-slate-950">
        <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3 md:px-6">
          <div>
            <h2 className="text-base font-semibold md:text-lg">{chatTitle}</h2>
            <p className="text-xs text-slate-400">{activeChat?.typing ? 'typing…' : activeChat?.lastSeen}</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-emerald-300">
            <ShieldCheck size={14} />
            E2E-ready architecture
          </div>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 md:px-6">
          {activeChat?.messages.map((message) => {
            const mine = message.senderId === currentUserId;
            return (
              <article key={message.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${mine ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-100'}`}>
                  <MediaPreview type={message.messageType} content={message.content} mediaUrl={message.mediaUrl} />
                  <div className="mt-1 flex items-center justify-end gap-1 text-[11px] opacity-90">
                    <span>{message.sentAt}</span>
                    {mine && <Tick status={message.tick} />}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <form onSubmit={onSubmit} className="border-t border-slate-800 p-3 md:p-4">
          <div className="mb-2 flex gap-2">
            {(['TEXT', 'AUDIO', 'VIDEO'] as MessageType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setMessageType(type)}
                className={`rounded-md px-2 py-1 text-xs ${messageType === type ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-2 py-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={messageType === 'TEXT' ? 'Type a message' : `Add ${messageType.toLowerCase()} label/url`}
              className="w-full bg-transparent px-2 text-sm outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 p-2 text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!activeChat || draft.trim().length === 0}
            >
              <SendHorizontal size={16} />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};
