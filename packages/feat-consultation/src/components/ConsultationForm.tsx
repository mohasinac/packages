"use client";
import React from "react";
import type { BookConsultationInput, ConsultationMode } from "../types";

interface ConsultationFormProps {
  onSubmit: (data: BookConsultationInput) => Promise<void>;
  isPending?: boolean;
  concerns?: string[];
}

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

export function ConsultationForm({ onSubmit, isPending, concerns = [] }: ConsultationFormProps) {
  const [form, setForm] = React.useState<BookConsultationInput>({
    name: "",
    email: "",
    phone: "",
    concern: [],
    preferredDate: "",
    preferredTime: TIME_SLOTS[0],
    mode: "remote",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggleConcern(c: string) {
    setForm((prev) => ({
      ...prev,
      concern: prev.concern.includes(c)
        ? prev.concern.filter((x) => x !== c)
        : [...prev.concern, c],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        type="text"
        placeholder="Full name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      <input
        name="email"
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone number"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      {concerns.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {concerns.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggleConcern(c)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                form.concern.includes(c)
                  ? "border-primary bg-primary text-white"
                  : "border-neutral-300 text-neutral-700 hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <input
          name="preferredDate"
          type="date"
          value={form.preferredDate}
          onChange={handleChange}
          required
          className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
        <select
          name="preferredTime"
          value={form.preferredTime}
          onChange={handleChange}
          className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
        >
          {TIME_SLOTS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <select
        name="mode"
        value={form.mode}
        onChange={handleChange}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      >
        <option value="remote">Remote (Video Call)</option>
        <option value="in-person">In-Person</option>
      </select>
      <textarea
        name="message"
        placeholder="Any additional notes (optional)"
        value={form.message}
        onChange={handleChange}
        rows={3}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90 disabled:opacity-60"
      >
        {isPending ? "Booking..." : "Book Consultation"}
      </button>
    </form>
  );
}
