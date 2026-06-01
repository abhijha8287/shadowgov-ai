"use client";

import { useState } from "react";
import { Bot, SendHorizontal } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { complaints, projects } from "@/lib/demo-data";

const starterAnswers: Record<string, string> = {
  "Which department performs worst?":
    "Public Works has the highest overdue count this week, mainly road resurfacing and drainage complaints in Wards 7, 9, and 12. Escalation risk is high because three projects share the same contractor.",
  "What projects are delayed?":
    "Six projects are delayed. The largest risk is the East Canal Drainage Upgrade at 42% progress against a planned 68%, with budget burn already above the completion curve.",
  "Show unresolved road issues near me.":
    "There are 18 unresolved road issues within the selected civic radius. Four are critical, and two have duplicate citizen evidence that should be merged by moderators.",
  "Generate weekly civic summary.":
    "This week: complaints rose 12%, garbage reports improved after contractor redeployment, drainage risk remains elevated, and Ward 9 needs officer review within 48 hours."
};

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Ask about unresolved issues, delayed projects, budget movement, department responsibility, or weekly civic summaries."
    }
  ]);
  const [input, setInput] = useState("");

  function send(question = input) {
    if (!question.trim()) return;
    const answer =
      starterAnswers[question] ||
      `I found ${complaints.length} complaints and ${projects.length} active projects related to this query. The strongest civic signal is repeated unresolved work across roads, drainage, and street lighting.`;
    setMessages((current) => [...current, { role: "user", content: question }, { role: "assistant", content: answer }]);
    setInput("");
  }

  return (
    <DashboardShell>
      <div className="grid min-h-[calc(100vh-8rem)] gap-6 lg:grid-cols-[1fr_20rem]">
        <section className="glass flex flex-col rounded-lg">
          <div className="border-b border-border p-5">
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <Bot className="h-6 w-6 text-primary" /> AI Civic Assistant
            </h1>
          </div>
          <div className="flex-1 space-y-4 overflow-auto p-5">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-3xl rounded-lg px-4 py-3 leading-7 ${
                  message.role === "user" ? "ml-auto bg-primary text-white" : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <form
            className="flex gap-3 border-t border-border p-4"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <input
              className="min-w-0 flex-1 rounded-md border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Why is the drainage project delayed?"
            />
            <button className="rounded-md bg-primary px-4 text-white" aria-label="Send question">
              <SendHorizontal className="h-5 w-5" />
            </button>
          </form>
        </section>
        <aside className="space-y-3">
          {Object.keys(starterAnswers).map((question) => (
            <button
              className="w-full rounded-md border border-border bg-card p-4 text-left font-semibold hover:border-primary"
              key={question}
              onClick={() => send(question)}
            >
              {question}
            </button>
          ))}
        </aside>
      </div>
    </DashboardShell>
  );
}

