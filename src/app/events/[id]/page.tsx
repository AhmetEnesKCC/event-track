"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Event } from "@/types";
import ParticipantList from "@/app/components/ParticipantList";
import CommentList from "@/app/components/CommentList";
import Link from "next/link";



const loadEvents = (): Event[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("events") || "[]") as Event[];
  } catch {
    return [];
  }
};

const saveEvents = (events: Event[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("events", JSON.stringify(events));
  }
};

const loadUser = () =>
  typeof window !== "undefined" ? localStorage.getItem("username") || "" : "";

export default function EventPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);

  const user = loadUser();

  useEffect(() => {
    const events = loadEvents();
    const ev = events.find((e) => e.id === params.id);
    if (!ev) {
      router.push("/");
      return;
    }
    setEvent(ev);
  }, [params.id, router]);

  const updateEvent = (ev: Event) => {
    const events = loadEvents().map((e) => (e.id === ev.id ? ev : e));

    saveEvents(events);
    setEvent(ev);
  };



  if (!event) return null;

  return (
    <div className="p-4 neu flex flex-col gap-4 max-w-xl mx-auto animate-fade-in">
      <Link href="/" className="text-blue-300 hover:text-white transition">
        ← Back
      </Link>
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <ParticipantList event={event} onUpdate={updateEvent} />
      <CommentList event={event} onUpdate={updateEvent} />
    </div>
  );
}
